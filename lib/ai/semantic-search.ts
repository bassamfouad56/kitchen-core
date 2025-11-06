import { PrismaClient } from '@prisma/client';
import { generateEmbedding } from './ollama';

const prisma = new PrismaClient();

// Similarity threshold for search results
const SIMILARITY_THRESHOLD = 0.7;

// Calculate cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Vectors must have same length');

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Index content with embeddings
export async function indexContent(
  contentType: string,
  contentId: string,
  title: string,
  content: string,
  metadata?: any
) {
  try {
    // Generate embedding for the content
    const embedding = await generateEmbedding(`${title} ${content}`);

    // Check if embedding already exists
    const existing = await prisma.embedding.findFirst({
      where: {
        contentType,
        contentId
      }
    });

    if (existing) {
      // Update existing embedding
      await prisma.embedding.update({
        where: { id: existing.id },
        data: {
          title,
          content,
          embedding: embedding,
          metadata,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new embedding
      await prisma.embedding.create({
        data: {
          contentType,
          contentId,
          title,
          content,
          embedding: embedding,
          metadata
        }
      });
    }

    return { success: true, contentId };
  } catch (error) {
    console.error('Error indexing content:', error);
    throw error;
  }
}

// Search content using semantic similarity
export async function semanticSearch(
  query: string,
  contentType?: string,
  limit: number = 10
) {
  try {
    // Generate embedding for the search query
    const queryEmbedding = await generateEmbedding(query);

    // Get all embeddings from database (filtered by type if specified)
    const embeddings = await prisma.embedding.findMany({
      where: contentType ? { contentType } : {},
    });

    // Calculate similarities and sort
    const results = embeddings
      .map(item => {
        const storedEmbedding = item.embedding as number[];
        const similarity = cosineSimilarity(queryEmbedding, storedEmbedding);

        return {
          id: item.id,
          contentType: item.contentType,
          contentId: item.contentId,
          title: item.title,
          content: item.content.substring(0, 200) + '...', // Truncate content for preview
          metadata: item.metadata,
          similarity
        };
      })
      .filter(item => item.similarity >= SIMILARITY_THRESHOLD)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    return results;
  } catch (error) {
    console.error('Error performing semantic search:', error);
    throw error;
  }
}

// Index all existing projects
export async function indexAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true }
    });

    for (const project of projects) {
      const content = `
        ${project.description}
        Location: ${project.location}
        Category: ${project.category}
        Year: ${project.year}
        Area: ${project.area}
        Budget: ${project.budget}
        Materials: ${project.materials.join(', ')}
        Appliances: ${project.appliances.join(', ')}
        Features: ${project.features.join(', ')}
        Challenges: ${project.challenges}
        Innovations: ${project.innovations.join(', ')}
      `;

      await indexContent(
        'project',
        project.id,
        project.title,
        content,
        {
          slug: project.slug,
          category: project.category,
          location: project.location,
          year: project.year,
          budget: project.budget
        }
      );
    }

    return { success: true, count: projects.length };
  } catch (error) {
    console.error('Error indexing projects:', error);
    throw error;
  }
}

// Index all services
export async function indexAllServices() {
  try {
    const services = await prisma.service.findMany({
      where: { published: true }
    });

    for (const service of services) {
      const content = `
        ${service.description}
        Features: ${service.features.join(', ')}
      `;

      await indexContent(
        'service',
        service.id,
        service.title,
        content,
        {
          title: service.title
        }
      );
    }

    return { success: true, count: services.length };
  } catch (error) {
    console.error('Error indexing services:', error);
    throw error;
  }
}

// Index gallery images
export async function indexAllGalleryImages() {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { published: true }
    });

    for (const image of images) {
      const content = `
        ${image.description}
        Location: ${image.location}
        Category: ${image.category}
      `;

      await indexContent(
        'gallery',
        image.id,
        image.title,
        content,
        {
          category: image.category,
          location: image.location
        }
      );
    }

    return { success: true, count: images.length };
  } catch (error) {
    console.error('Error indexing gallery images:', error);
    throw error;
  }
}

// Index blog posts
export async function indexBlogPost(postId: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: postId }
    });

    if (!post) throw new Error('Blog post not found');

    const content = `
      ${post.excerptEn}
      ${post.contentEn}
      ${post.excerptAr || ''}
      ${post.contentAr || ''}
      Tags: ${post.tags.join(', ')}
      Category: ${post.category}
    `;

    await indexContent(
      'blog',
      post.id,
      post.titleEn,
      content,
      {
        slug: post.slug,
        category: post.category,
        tags: post.tags,
        author: post.author
      }
    );

    return { success: true, postId };
  } catch (error) {
    console.error('Error indexing blog post:', error);
    throw error;
  }
}

// Initialize all indexes
export async function initializeSearchIndexes() {
  try {
    console.log('Starting search index initialization...');

    const projectsResult = await indexAllProjects();
    console.log(`Indexed ${projectsResult.count} projects`);

    const servicesResult = await indexAllServices();
    console.log(`Indexed ${servicesResult.count} services`);

    const galleryResult = await indexAllGalleryImages();
    console.log(`Indexed ${galleryResult.count} gallery images`);

    console.log('Search index initialization complete!');

    return {
      success: true,
      indexed: {
        projects: projectsResult.count,
        services: servicesResult.count,
        gallery: galleryResult.count
      }
    };
  } catch (error) {
    console.error('Error initializing search indexes:', error);
    throw error;
  }
}