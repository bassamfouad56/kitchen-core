import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';
import type { LeadQueryInput } from '../validations/lead';

/**
 * Database query helpers for Leads (CRM)
 */

export async function getLeads(query: LeadQueryInput) {
  const { status, source, priority, assignedTo, page, pageSize } = query;

  const where: Prisma.LeadWhereInput = {};

  if (status) where.status = status;
  if (source) where.source = source;
  if (priority) where.priority = priority;
  if (assignedTo) where.assignedTo = assignedTo;

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        interactions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        projects: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return { leads, total };
}

export async function getLeadById(id: string) {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      interactions: {
        orderBy: { createdAt: 'desc' },
      },
      projects: true,
    },
  });
}

export async function createLead(data: Prisma.LeadCreateInput) {
  // Cast metadata to Prisma JSON type if present
  const leadData = {
    ...data,
    metadata: data.metadata as Prisma.InputJsonValue | undefined,
  };

  return prisma.lead.create({
    data: leadData,
    include: {
      interactions: true,
      projects: true,
    },
  });
}

export async function updateLead(id: string, data: Prisma.LeadUpdateInput) {
  // Cast metadata to Prisma JSON type if present
  const leadData = {
    ...data,
    metadata: data.metadata as Prisma.InputJsonValue | undefined,
  };

  return prisma.lead.update({
    where: { id },
    data: leadData,
    include: {
      interactions: true,
      projects: true,
    },
  });
}

export async function deleteLead(id: string) {
  return prisma.lead.delete({
    where: { id },
  });
}

export async function addLeadInteraction(
  leadId: string,
  data: Omit<Prisma.LeadInteractionCreateInput, 'lead'>
) {
  return prisma.leadInteraction.create({
    data: {
      ...data,
      lead: {
        connect: { id: leadId },
      },
    },
  });
}

export async function getLeadStats() {
  const [total, newLeads, contacted, qualified, won, lost] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { status: 'CONTACTED' } }),
    prisma.lead.count({ where: { status: 'QUALIFIED' } }),
    prisma.lead.count({ where: { status: 'WON' } }),
    prisma.lead.count({ where: { status: 'LOST' } }),
  ]);

  return {
    total,
    byStatus: {
      new: newLeads,
      contacted,
      qualified,
      won,
      lost,
    },
    conversionRate: total > 0 ? ((won / total) * 100).toFixed(2) : '0',
  };
}
