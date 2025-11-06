import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';
import type { ProjectQueryInput } from '../validations/project';

/**
 * Database query helpers for Projects
 */

export async function getProjects(query: ProjectQueryInput) {
  const { category, featured, published, page, pageSize } = query;

  const where: Prisma.ProjectWhereInput = {};

  if (category) where.category = category;
  if (featured !== undefined) where.featured = featured;
  if (published !== undefined) where.published = published;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        lead: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    }),
    prisma.project.count({ where }),
  ]);

  return { projects, total };
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      lead: true,
      customer: true,
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      lead: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
}

export async function createProject(data: Prisma.ProjectCreateInput) {
  return prisma.project.create({
    data,
    include: {
      lead: true,
      customer: true,
    },
  });
}

export async function updateProject(id: string, data: Prisma.ProjectUpdateInput) {
  return prisma.project.update({
    where: { id },
    data,
    include: {
      lead: true,
      customer: true,
    },
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}

export async function getFeaturedProjects(limit: number = 6) {
  return prisma.project.findMany({
    where: {
      featured: true,
      published: true,
    },
    orderBy: { order: 'asc' },
    take: limit,
  });
}

export async function getProjectsByCategory(category: string, limit?: number) {
  return prisma.project.findMany({
    where: {
      category: category as any,
      published: true,
    },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    take: limit,
  });
}
