import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // List ALL projects
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Found ${projects.length} matching projects:\n`);

  for (const project of projects) {
    console.log(`ID: ${project.id}`);
    console.log(`Title: "${project.titleEn}"`);
    console.log(`Category: ${project.category}`);
    console.log(`Location: ${project.location}`);
    console.log(`Year: ${project.year}`);
    console.log(`Image: ${project.image}`);
    console.log('---');

    // Delete projects that match test data criteria
    const isTestProject =
      project.image?.includes('blob.vercel-storage.com') ||
      (project.location?.toLowerCase() === 'dubai' && project.titleEn === '') ||
      project.titleEn === 'Aluminum Kitchens';

    if (isTestProject) {
      await prisma.project.delete({ where: { id: project.id } });
      console.log('✅ DELETED\n');
    }
  }

  await prisma.$disconnect();
}

main();
