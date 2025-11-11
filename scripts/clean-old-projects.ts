import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanOldProjects() {
  console.log("🗑️  Cleaning old projects with deprecated categories...");

  try {
    // Delete all projects (they have old enum values)
    const deleted = await prisma.project.deleteMany({});
    console.log(`✅ Deleted ${deleted.count} projects`);

    // Also clean gallery images that might have old categories
    const deletedGallery = await prisma.galleryImage.deleteMany({});
    console.log(`✅ Deleted ${deletedGallery.count} gallery images`);

    console.log("✅ Database cleaned successfully!");
  } catch (error) {
    console.error("❌ Error cleaning database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanOldProjects();
