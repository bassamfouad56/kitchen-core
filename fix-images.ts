/**
 * Automated Image Fix Script
 * Fixes all missing image references by updating database paths to use existing images
 */

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function fixImages() {
  console.log("🔧 Starting Automated Image Fix...\n");
  console.log("=".repeat(70));

  let fixCount = 0;

  // 1. Fix Team Member Images
  console.log("\n👥 Fixing Team Member Images...");

  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  const whatsappImages = [
    "/team/WhatsApp_Image_2025-10-18_at_17.42.09_446c0a80-removebg-preview.png",
    "/team/WhatsApp_Image_2025-10-18_at_17.42.10_a00ed2b4-removebg-preview.png",
    "/team/WhatsApp_Image_2025-10-18_at_17.42.11_23cae256-removebg-preview.png",
    "/team/WhatsApp_Image_2025-10-18_at_17.42.11_c3be06da-removebg-preview.png",
    "/team/WhatsApp_Image_2025-10-18_at_17.42.12_09558bae-removebg-preview.png",
    "/ceo.png", // Use CEO image for 6th team member
  ];

  for (let i = 0; i < teamMembers.length && i < whatsappImages.length; i++) {
    const member = teamMembers[i];
    const newImage = whatsappImages[i];

    // Check if current image is broken
    const currentImagePath = path.join(
      process.cwd(),
      "public",
      member.image.replace(/^\//, ""),
    );

    if (!fs.existsSync(currentImagePath)) {
      console.log(
        `   Updating ${member.nameEn}: ${member.image} → ${newImage}`,
      );
      await prisma.teamMember.update({
        where: { id: member.id },
        data: { image: newImage },
      });
      fixCount++;
    } else {
      console.log(`   ✅ ${member.nameEn}: Image already correct`);
    }
  }

  // 2. Fix Project Images
  console.log("\n🏗️  Fixing Project Images...");

  const projects = await prisma.project.findMany();

  const projectImageMap: { [key: string]: string[] } = {
    "modern-wooden-villa-marina": [
      "/nass0/1.png",
      "/nass0/2.png",
      "/nass0/3.png",
      "/nass0/4.png",
      "/nass0/5.png",
      "/nass0/6.png",
      "/nass0/7.png",
    ],
    "classic-wooden-royal-estate": [
      "/nass1/1.png",
      "/nass1/2.png",
      "/nass1/3.png",
    ],
    "aluminum-kitchen-urban-loft": [
      "/nass2/1.png",
      "/nass2/2.png",
      "/nass2/3.png",
      "/nass2/4.png",
    ],
    "bedroom-wardrobe-master-suite": [
      "/nass3/1.png",
      "/nass3/2.png",
      "/nass3/3.png",
      "/nass3/4.png",
      "/nass3/5.png",
    ],
  };

  for (const project of projects) {
    const currentImagePath = path.join(
      process.cwd(),
      "public",
      project.image.replace(/^\//, ""),
    );

    if (!fs.existsSync(currentImagePath)) {
      const newImages = projectImageMap[project.slug];
      if (newImages && newImages.length > 0) {
        console.log(
          `   Updating ${project.slug}: ${project.image} → ${newImages[0]}`,
        );
        await prisma.project.update({
          where: { id: project.id },
          data: { image: newImages[0] },
        });
        fixCount++;
      }
    } else {
      console.log(`   ✅ ${project.slug}: Image already correct`);
    }
  }

  // 3. Fix Blog Post Images
  console.log("\n📝 Fixing Blog Post Images...");

  const blogPosts = await prisma.blogPost.findMany();

  const tempImages = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];
  let tempImageIndex = 0;

  for (const post of blogPosts) {
    if (post.featuredImage) {
      const currentImagePath = path.join(
        process.cwd(),
        "public",
        post.featuredImage.replace(/^\//, ""),
      );

      if (!fs.existsSync(currentImagePath)) {
        const newImage = tempImages[tempImageIndex % tempImages.length];
        console.log(
          `   Updating ${post.slug}: ${post.featuredImage} → ${newImage}`,
        );
        await prisma.blogPost.update({
          where: { id: post.id },
          data: { featuredImage: newImage },
        });
        fixCount++;
        tempImageIndex++;
      } else {
        console.log(`   ✅ ${post.slug}: Image already correct`);
      }
    }
  }

  // 4. Fix Essential Files
  console.log("\n📄 Fixing Essential Files...");

  // Copy favicon.ico
  const faviconSource = path.join(process.cwd(), "public", "logo.png");
  const faviconDest = path.join(process.cwd(), "public", "favicon.ico");

  if (!fs.existsSync(faviconDest) && fs.existsSync(faviconSource)) {
    fs.copyFileSync(faviconSource, faviconDest);
    console.log("   ✅ Created favicon.ico from logo.png");
    fixCount++;
  } else if (fs.existsSync(faviconDest)) {
    console.log("   ✅ favicon.ico already exists");
  }

  // Copy og-image.jpg
  const ogImageSource = path.join(process.cwd(), "public", "1.jpg");
  const ogImageDest = path.join(process.cwd(), "public", "og-image.jpg");

  if (!fs.existsSync(ogImageDest) && fs.existsSync(ogImageSource)) {
    fs.copyFileSync(ogImageSource, ogImageDest);
    console.log("   ✅ Created og-image.jpg from 1.jpg");
    fixCount++;
  } else if (fs.existsSync(ogImageDest)) {
    console.log("   ✅ og-image.jpg already exists");
  }

  // Create simple grid.svg
  const gridSvgPath = path.join(process.cwd(), "public", "grid.svg");
  if (!fs.existsSync(gridSvgPath)) {
    const gridSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="7" height="7"/>
  <rect x="14" y="3" width="7" height="7"/>
  <rect x="14" y="14" width="7" height="7"/>
  <rect x="3" y="14" width="7" height="7"/>
</svg>`;
    fs.writeFileSync(gridSvgPath, gridSvgContent);
    console.log("   ✅ Created grid.svg");
    fixCount++;
  } else {
    console.log("   ✅ grid.svg already exists");
  }

  // Final Report
  console.log("\n" + "=".repeat(70));
  console.log(`\n✅ Image Fix Complete!`);
  console.log(`\n📊 Summary:`);
  console.log(`   - Total fixes applied: ${fixCount}`);
  console.log(`\n📝 Next Steps:`);
  console.log(`   1. Run: pnpm run dev`);
  console.log(`   2. Visit: http://localhost:3000/en/about`);
  console.log(`   3. Verify team photos appear correctly`);
  console.log(`   4. Visit: http://localhost:3000/en/projects`);
  console.log(`   5. Verify project photos appear correctly`);
  console.log(`   6. Run audit again: npx tsx audit-images.ts`);
  console.log(`\n🎉 All done! Your images should now be working.`);

  await prisma.$disconnect();
}

fixImages().catch(console.error);
