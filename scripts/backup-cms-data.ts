#!/usr/bin/env ts-node
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function backupAllData() {
  console.log("🔄 Starting CMS data backup...\n");

  try {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .split("T")[0];
    const backupDir = path.join(process.cwd(), "backups");

    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupFile = path.join(
      backupDir,
      `cms-backup-${timestamp}-${Date.now()}.json`,
    );

    // Fetch all data
    const [
      users,
      projects,
      galleryImages,
      testimonials,
      processSteps,
      services,
      statistics,
      videos,
      innovations,
      leads,
      customers,
      blogPosts,
      company,
      teamMembers,
      siteSettings,
    ] = await Promise.all([
      prisma.user.findMany(),
      prisma.project.findMany(),
      prisma.galleryImage.findMany(),
      prisma.testimonial.findMany(),
      prisma.processStep.findMany(),
      prisma.service.findMany(),
      prisma.statistic.findMany(),
      prisma.video.findMany(),
      prisma.innovation.findMany(),
      prisma.lead.findMany(),
      prisma.customer.findMany(),
      prisma.blogPost.findMany(),
      prisma.company.findMany(),
      prisma.teamMember.findMany(),
      prisma.siteSettings.findMany(),
    ]);

    const backup = {
      timestamp: new Date().toISOString(),
      version: "1.0",
      data: {
        users: users.length,
        projects: projects.length,
        galleryImages: galleryImages.length,
        testimonials: testimonials.length,
        processSteps: processSteps.length,
        services: services.length,
        statistics: statistics.length,
        videos: videos.length,
        innovations: innovations.length,
        leads: leads.length,
        customers: customers.length,
        blogPosts: blogPosts.length,
        company: company.length,
        teamMembers: teamMembers.length,
        siteSettings: siteSettings.length,
      },
      content: {
        users,
        projects,
        galleryImages,
        testimonials,
        processSteps,
        services,
        statistics,
        videos,
        innovations,
        leads,
        customers,
        blogPosts,
        company,
        teamMembers,
        siteSettings,
      },
    };

    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));

    console.log("✅ Backup completed successfully!\n");
    console.log("📊 Data Summary:");
    console.log(`   Users: ${users.length}`);
    console.log(`   Projects: ${projects.length}`);
    console.log(`   Gallery Images: ${galleryImages.length}`);
    console.log(`   Testimonials: ${testimonials.length}`);
    console.log(`   Process Steps: ${processSteps.length}`);
    console.log(`   Services: ${services.length}`);
    console.log(`   Statistics: ${statistics.length}`);
    console.log(`   Videos: ${videos.length}`);
    console.log(`   Innovations: ${innovations.length}`);
    console.log(`   Leads: ${leads.length}`);
    console.log(`   Customers: ${customers.length}`);
    console.log(`   Blog Posts: ${blogPosts.length}`);
    console.log(`   Company: ${company.length}`);
    console.log(`   Team Members: ${teamMembers.length}`);
    console.log(`   Site Settings: ${siteSettings.length}\n`);
    console.log(`💾 Backup saved to: ${backupFile}\n`);

    return backup.data;
  } catch (error) {
    console.error("❌ Backup failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

backupAllData()
  .then((data) => {
    const totalRecords = Object.values(data).reduce(
      (sum, count) => sum + count,
      0,
    );
    console.log(`📦 Total records backed up: ${totalRecords}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
