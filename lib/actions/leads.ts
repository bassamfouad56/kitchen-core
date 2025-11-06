'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '../api/auth';
import { createLeadSchema, updateLeadSchema } from '../validations/lead';
import { createLead, updateLead, deleteLead } from '../db/leads';

export async function createLeadAction(formData: FormData) {
  try {
    await requireAuth();

    const data = Object.fromEntries(formData.entries());
    const validatedData = createLeadSchema.parse({
      ...data,
      tags: data.tags ? JSON.parse(data.tags as string) : [],
      metadata: data.metadata ? JSON.parse(data.metadata as string) : undefined,
    });

    const lead = await createLead(validatedData as any);

    revalidatePath('/admin/leads');

    return { success: true, data: lead };
  } catch (error) {
    console.error('Create lead error:', error);
    return { success: false, error: 'Failed to create lead' };
  }
}

export async function updateLeadAction(id: string, formData: FormData) {
  try {
    await requireAuth();

    const data = Object.fromEntries(formData.entries());
    const validatedData = updateLeadSchema.parse({
      ...data,
      tags: data.tags ? JSON.parse(data.tags as string) : undefined,
      metadata: data.metadata ? JSON.parse(data.metadata as string) : undefined,
    });

    const lead = await updateLead(id, validatedData as any);

    revalidatePath('/admin/leads');
    revalidatePath(`/admin/leads/${id}`);

    return { success: true, data: lead };
  } catch (error) {
    console.error('Update lead error:', error);
    return { success: false, error: 'Failed to update lead' };
  }
}

export async function deleteLeadAction(id: string) {
  try {
    await requireAuth();

    await deleteLead(id);

    revalidatePath('/admin/leads');

    return { success: true };
  } catch (error) {
    console.error('Delete lead error:', error);
    return { success: false, error: 'Failed to delete lead' };
  }
}
