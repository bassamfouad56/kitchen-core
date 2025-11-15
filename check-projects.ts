import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkProjects() {
  const projects = await prisma.project.findMany({
    select: { slug: true, image: true, title: true },
  });

  console.log("Projects in database:");
  console.log(JSON.stringify(projects, null, 2));

  await prisma.$disconnect();
}

checkProjects().catch(console.error);
