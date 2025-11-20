import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkProjects() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      titleEn: true,
      image: true,
      published: true,
      featured: true,
    },
  });

  console.log("Total projects in database:", projects.length);
  console.log("\nProjects:");
  projects.forEach((project) => {
    console.log(`- ${project.titleEn}`);
    console.log(`  Image: ${project.image}`);
    console.log(`  Published: ${project.published}`);
    console.log(`  Featured: ${project.featured}`);
    console.log("");
  });

  await prisma.$disconnect();
}

checkProjects().catch(console.error);
