import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get sample gallery images
  const images = await prisma.galleryImage.findMany({
    take: 5,
    select: { id: true, image: true, titleEn: true }
  });

  console.log('=== Sample Gallery Image URLs ===');
  images.forEach(img => {
    console.log(`Title: ${img.titleEn}`);
    console.log(`URL: ${img.image}`);
    console.log('---');
  });

  // Get sample projects
  const projects = await prisma.project.findMany({
    take: 3,
    select: { id: true, titleEn: true, image: true, gallery: true }
  });

  console.log('\n=== Sample Project URLs ===');
  projects.forEach(proj => {
    console.log(`Title: ${proj.titleEn}`);
    console.log(`Image: ${proj.image}`);
    console.log(`Gallery: ${proj.gallery.slice(0, 2).join(', ')}`);
    console.log('---');
  });

  await prisma.$disconnect();
}

main();
