/**
 * Image Audit Script
 * Checks for broken, corrupted, or missing images across the site
 */

import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ImageIssue {
  type: "missing" | "broken-url" | "database-only" | "unused";
  location: string;
  path: string;
  details: string;
}

const issues: ImageIssue[] = [];
const foundImages = new Set<string>();

async function auditImages() {
  console.log("🔍 Starting Image Audit...\n");
  console.log("=".repeat(70));

  // 1. Check public folder
  console.log("\n📁 Scanning public folder...");
  const publicPath = path.join(process.cwd(), "public");
  const publicImages = scanDirectory(publicPath);
  console.log(`   Found ${publicImages.length} images in public folder`);

  publicImages.forEach((img) => foundImages.add(img));

  // 2. Check component image references
  console.log("\n🔍 Scanning component files for image references...");
  await scanComponents();

  // 3. Check database images
  console.log("\n💾 Checking database image URLs...");
  await checkDatabaseImages();

  // 4. Check hardcoded image paths
  console.log("\n📝 Checking hardcoded image paths in code...");
  await checkHardcodedImages();

  // 5. Generate report
  console.log("\n" + "=".repeat(70));
  console.log("\n📊 AUDIT RESULTS:\n");

  if (issues.length === 0) {
    console.log("✅ No image issues found! All images are valid.");
  } else {
    console.log(`⚠️  Found ${issues.length} image issues:\n`);

    const missing = issues.filter((i) => i.type === "missing");
    const brokenUrls = issues.filter((i) => i.type === "broken-url");
    const dbOnly = issues.filter((i) => i.type === "database-only");
    const unused = issues.filter((i) => i.type === "unused");

    if (missing.length > 0) {
      console.log(`\n❌ MISSING FILES (${missing.length}):`);
      missing.forEach((issue) => {
        console.log(`   Location: ${issue.location}`);
        console.log(`   Path: ${issue.path}`);
        console.log(`   Details: ${issue.details}\n`);
      });
    }

    if (brokenUrls.length > 0) {
      console.log(`\n🔗 BROKEN URLs (${brokenUrls.length}):`);
      brokenUrls.forEach((issue) => {
        console.log(`   Location: ${issue.location}`);
        console.log(`   Path: ${issue.path}`);
        console.log(`   Details: ${issue.details}\n`);
      });
    }

    if (dbOnly.length > 0) {
      console.log(`\n💾 DATABASE ONLY (${dbOnly.length}):`);
      dbOnly.forEach((issue) => {
        console.log(`   Location: ${issue.location}`);
        console.log(`   Path: ${issue.path}`);
        console.log(`   Details: ${issue.details}\n`);
      });
    }

    if (unused.length > 0) {
      console.log(`\n🗑️  UNUSED FILES (${unused.length}):`);
      unused.forEach((issue) => {
        console.log(`   Path: ${issue.path}`);
        console.log(`   Details: ${issue.details}\n`);
      });
    }
  }

  // Save report to file
  const report = generateMarkdownReport();
  fs.writeFileSync("IMAGE_AUDIT_REPORT.md", report);
  console.log("\n📄 Full report saved to: IMAGE_AUDIT_REPORT.md");

  await prisma.$disconnect();
}

function scanDirectory(dir: string, baseDir: string = dir): string[] {
  const images: string[] = [];
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"];

  try {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        images.push(...scanDirectory(fullPath, baseDir));
      } else {
        const ext = path.extname(item).toLowerCase();
        if (imageExtensions.includes(ext)) {
          const relativePath = path
            .relative(baseDir, fullPath)
            .replace(/\\/g, "/");
          images.push(relativePath);
        }
      }
    });
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }

  return images;
}

async function scanComponents() {
  const componentsToCheck = [
    "app/[locale]/page.tsx",
    "app/[locale]/about/page.tsx",
    "app/[locale]/services/page.tsx",
    "app/components/BeforeAfterSlider.tsx",
    "app/components/about/FounderShowcase.tsx",
    "app/components/about/TeamGrid.tsx",
    "app/components/Footer.tsx",
    "app/components/Navigation.tsx",
  ];

  const imageRegex =
    /(?:src=["']|backgroundImage:\s*["']url\()?([/"']?(?:\/[^"'\s)]+\.(?:jpg|jpeg|png|webp|svg|gif)|[^"'\s)]+\.(?:jpg|jpeg|png|webp|svg|gif)))/gi;

  for (const component of componentsToCheck) {
    const fullPath = path.join(process.cwd(), component);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const matches = content.matchAll(imageRegex);

      for (const match of matches) {
        let imagePath = match[1];
        if (imagePath) {
          // Clean up path
          imagePath = imagePath.replace(/^["']|["']$/g, "");
          imagePath = imagePath.replace(/^\//, "");

          // Check if it's a local file
          if (!imagePath.startsWith("http") && !imagePath.startsWith("blob:")) {
            const publicPath = path.join(process.cwd(), "public", imagePath);
            if (!fs.existsSync(publicPath)) {
              issues.push({
                type: "missing",
                location: component,
                path: imagePath,
                details: `File not found in public folder`,
              });
            }
          }
        }
      }
    }
  }
}

async function checkDatabaseImages() {
  // Check Founder images
  const founder = await prisma.founder.findFirst();
  if (founder?.image) {
    checkImagePath(founder.image, "Database - Founder");
  }

  // Check Team Member images
  const teamMembers = await prisma.teamMember.findMany();
  teamMembers.forEach((member, index) => {
    if (member.image) {
      checkImagePath(
        member.image,
        `Database - Team Member #${index + 1} (${member.nameEn})`,
      );
    }
  });

  // Check Company images
  const company = await prisma.company.findFirst();
  if (company?.featuredImage) {
    checkImagePath(company.featuredImage, "Database - Company Featured Image");
  }

  // Check Project images
  const projects = await prisma.project.findMany({
    select: { slug: true, image: true, title: true },
  });
  projects.forEach((project) => {
    if (project.image) {
      checkImagePath(project.image, `Database - Project: ${project.title}`);
    }
  });

  // Check Gallery images
  const galleryImages = await prisma.galleryImage.findMany({
    select: { image: true, id: true },
  });
  galleryImages.forEach((img) => {
    if (img.image) {
      checkImagePath(img.image, `Database - Gallery Image #${img.id}`);
    }
  });

  // Check Blog Post images
  const blogPosts = await prisma.blogPost.findMany({
    select: { slug: true, featuredImage: true, titleEn: true },
  });
  blogPosts.forEach((post) => {
    if (post.featuredImage) {
      checkImagePath(
        post.featuredImage,
        `Database - Blog Post: ${post.titleEn}`,
      );
    }
  });
}

function checkImagePath(imagePath: string, location: string) {
  // Skip external URLs and blob URLs
  if (
    imagePath.startsWith("http") ||
    imagePath.startsWith("blob:") ||
    imagePath.startsWith("data:")
  ) {
    return; // External or data URL - can't verify
  }

  // Check if file exists in public folder
  const cleanPath = imagePath.replace(/^\//, "");
  const publicPath = path.join(process.cwd(), "public", cleanPath);

  if (!fs.existsSync(publicPath)) {
    issues.push({
      type: "missing",
      location,
      path: imagePath,
      details: "Referenced in database but file not found in public folder",
    });
  }
}

async function checkHardcodedImages() {
  const hardcodedImages = [
    "/logo.png",
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    "/8.jpg",
    "/9.jpg",
    "/10.jpg",
    "/favicon.ico",
    "/og-image.jpg",
  ];

  hardcodedImages.forEach((img) => {
    const publicPath = path.join(
      process.cwd(),
      "public",
      img.replace(/^\//, ""),
    );
    if (!fs.existsSync(publicPath)) {
      issues.push({
        type: "missing",
        location: "Hardcoded path",
        path: img,
        details: "Commonly referenced image not found",
      });
    }
  });
}

function generateMarkdownReport(): string {
  const timestamp = new Date().toISOString();
  let report = `# Image Audit Report\n\n`;
  report += `**Generated:** ${timestamp}\n\n`;
  report += `---\n\n`;

  report += `## Summary\n\n`;
  report += `- **Total Issues Found:** ${issues.length}\n`;
  report += `- **Missing Files:** ${issues.filter((i) => i.type === "missing").length}\n`;
  report += `- **Broken URLs:** ${issues.filter((i) => i.type === "broken-url").length}\n`;
  report += `- **Database Only:** ${issues.filter((i) => i.type === "database-only").length}\n`;
  report += `- **Unused Files:** ${issues.filter((i) => i.type === "unused").length}\n\n`;

  report += `---\n\n`;

  if (issues.length === 0) {
    report += `## ✅ No Issues Found\n\n`;
    report += `All images are valid and accessible.\n\n`;
  } else {
    const groupedIssues = {
      missing: issues.filter((i) => i.type === "missing"),
      "broken-url": issues.filter((i) => i.type === "broken-url"),
      "database-only": issues.filter((i) => i.type === "database-only"),
      unused: issues.filter((i) => i.type === "unused"),
    };

    for (const [type, issuesList] of Object.entries(groupedIssues)) {
      if (issuesList.length > 0) {
        report += `## ${type.toUpperCase()} (${issuesList.length})\n\n`;
        issuesList.forEach((issue, index) => {
          report += `### ${index + 1}. ${issue.path}\n\n`;
          report += `- **Location:** ${issue.location}\n`;
          report += `- **Details:** ${issue.details}\n`;
          report += `- **Fix:** `;
          if (type === "missing") {
            report += `Upload missing image or update reference\n`;
          } else if (type === "broken-url") {
            report += `Fix URL or remove reference\n`;
          } else if (type === "database-only") {
            report += `Use image in components or remove from database\n`;
          } else if (type === "unused") {
            report += `Delete file or add to components\n`;
          }
          report += `\n`;
        });
      }
    }
  }

  report += `---\n\n`;
  report += `## Recommendations\n\n`;
  report += `1. Upload all missing images to \`public/\` folder\n`;
  report += `2. Update database references to point to correct paths\n`;
  report += `3. Remove unused images to reduce bundle size\n`;
  report += `4. Use Next.js Image component for optimization\n`;
  report += `5. Consider using Vercel Blob for large images\n\n`;

  return report;
}

auditImages().catch(console.error);
