'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '../api/auth';
import { createProjectSchema, updateProjectSchema } from '../validations/project';
import { createProject, updateProject, deleteProject } from '../db/projects';

export async function createProjectAction(formData: FormData) {
  try {
    await requireAuth();

    const data = Object.fromEntries(formData.entries());
    const validatedData = createProjectSchema.parse({
      ...data,
      materials: JSON.parse((data.materials as string) || '[]'),
      appliances: JSON.parse((data.appliances as string) || '[]'),
      features: JSON.parse((data.features as string) || '[]'),
      innovations: JSON.parse((data.innovations as string) || '[]'),
      gallery: JSON.parse((data.gallery as string) || '[]'),
      featured: data.featured === 'true',
      published: data.published === 'true',
      order: Number(data.order || 0),
    });

    const project = await createProject(validatedData);

    revalidatePath('/admin/projects');
    revalidatePath('/projects');

    return { success: true, data: project };
  } catch (error) {
    console.error('Create project error:', error);
    return { success: false, error: 'Failed to create project' };
  }
}

export async function updateProjectAction(id: string, formData: FormData) {
  try {
    await requireAuth();

    const data = Object.fromEntries(formData.entries());
    const validatedData = updateProjectSchema.parse({
      ...data,
      materials: data.materials ? JSON.parse(data.materials as string) : undefined,
      appliances: data.appliances ? JSON.parse(data.appliances as string) : undefined,
      features: data.features ? JSON.parse(data.features as string) : undefined,
      innovations: data.innovations ? JSON.parse(data.innovations as string) : undefined,
      gallery: data.gallery ? JSON.parse(data.gallery as string) : undefined,
      featured: data.featured ? data.featured === 'true' : undefined,
      published: data.published ? data.published === 'true' : undefined,
      order: data.order ? Number(data.order) : undefined,
    });

    const project = await updateProject(id, validatedData);

    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);

    return { success: true, data: project };
  } catch (error) {
    console.error('Update project error:', error);
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await requireAuth();

    await deleteProject(id);

    revalidatePath('/admin/projects');
    revalidatePath('/projects');

    return { success: true };
  } catch (error) {
    console.error('Delete project error:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}
