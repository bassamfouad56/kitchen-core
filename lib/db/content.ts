import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

/**
 * Database query helpers for Content (Gallery, Testimonials, Services, Videos, etc.)
 */

// Gallery Images
export async function getGalleryImages(filters?: {
  category?: string;
  size?: string;
  published?: boolean;
  page?: number;
  pageSize?: number;
}) {
  const { category, size, published, page = 1, pageSize = 20 } = filters || {};

  const where: Prisma.GalleryImageWhereInput = {};
  if (category) where.category = category as any;
  if (size) where.size = size as any;
  if (published !== undefined) where.published = published;

  const [images, total] = await Promise.all([
    prisma.galleryImage.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.galleryImage.count({ where }),
  ]);

  return { images, total };
}

// Testimonials
export async function getTestimonials(filters?: {
  featured?: boolean;
  published?: boolean;
  rating?: number;
  page?: number;
  pageSize?: number;
}) {
  const { featured, published, rating, page = 1, pageSize = 10 } = filters || {};

  const where: Prisma.TestimonialWhereInput = {};
  if (featured !== undefined) where.featured = featured;
  if (published !== undefined) where.published = published;
  if (rating) where.rating = { gte: rating };

  const [testimonials, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.testimonial.count({ where }),
  ]);

  return { testimonials, total };
}

// Services
export async function getServices(filters?: {
  published?: boolean;
}) {
  const { published } = filters || {};

  const where: Prisma.ServiceWhereInput = {};
  if (published !== undefined) where.published = published;

  return prisma.service.findMany({
    where,
    orderBy: { order: 'asc' },
  });
}

// Videos
export async function getVideos(filters?: {
  published?: boolean;
  page?: number;
  pageSize?: number;
}) {
  const { published, page = 1, pageSize = 10 } = filters || {};

  const where: Prisma.VideoWhereInput = {};
  if (published !== undefined) where.published = published;

  const [videos, total] = await Promise.all([
    prisma.video.findMany({
      where,
      orderBy: { order: 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.video.count({ where }),
  ]);

  return { videos, total };
}

// Innovations
export async function getInnovations(filters?: {
  published?: boolean;
}) {
  const { published } = filters || {};

  const where: Prisma.InnovationWhereInput = {};
  if (published !== undefined) where.published = published;

  return prisma.innovation.findMany({
    where,
    orderBy: { order: 'asc' },
  });
}

// Process Steps
export async function getProcessSteps(filters?: {
  published?: boolean;
}) {
  const { published } = filters || {};

  const where: Prisma.ProcessStepWhereInput = {};
  if (published !== undefined) where.published = published;

  return prisma.processStep.findMany({
    where,
    orderBy: { order: 'asc' },
  });
}

// Statistics
export async function getStatistics(section?: string) {
  const where: Prisma.StatisticWhereInput = {
    published: true,
  };

  if (section) {
    where.section = section as any;
  }

  return prisma.statistic.findMany({
    where,
    orderBy: { order: 'asc' },
  });
}

// Partnerships
export async function getPartnerships(filters?: {
  published?: boolean;
}) {
  const { published } = filters || {};

  const where: Prisma.PartnershipWhereInput = {};
  if (published !== undefined) where.published = published;

  return prisma.partnership.findMany({
    where,
    orderBy: { order: 'asc' },
  });
}

// Blog Posts
export async function getBlogPosts(filters?: {
  published?: boolean;
  category?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
}) {
  const { published, category, tag, page = 1, pageSize = 10 } = filters || {};

  const where: Prisma.BlogPostWhereInput = {};
  if (published !== undefined) where.published = published;
  if (category) where.category = category;
  if (tag) where.tags = { has: tag };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts, total };
}

export async function getBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (post) {
    // Increment views
    await prisma.blogPost.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });
  }

  return post;
}
