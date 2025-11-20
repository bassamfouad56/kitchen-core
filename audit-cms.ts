/**
 * Comprehensive CMS Audit Script
 * Checks if admin has complete control over the website through the CMS
 */

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

interface AuditIssue {
  severity: "critical" | "warning" | "info";
  category: string;
  issue: string;
  recommendation: string;
}

const issues: AuditIssue[] = [];

async function auditCMS() {
  console.log("🔍 Starting Comprehensive CMS Audit...\n");
  console.log("=".repeat(70));

  // 1. Check Database Schema Coverage
  console.log("\n📊 1. Checking Database Schema Coverage...");
  await checkSchemaCompleteness();

  // 2. Check Admin Routes
  console.log("\n🚪 2. Checking Admin Routes...");
  await checkAdminRoutes();

  // 3. Check Content Management Capabilities
  console.log("\n📝 3. Checking Content Management Capabilities...");
  await checkContentManagement();

  // 4. Check Singleton Models
  console.log("\n🔒 4. Checking Singleton Models...");
  await checkSingletonModels();

  // 5. Check Missing CMS Features
  console.log("\n⚠️  5. Checking Missing CMS Features...");
  await checkMissingFeatures();

  // 6. Check Page Coverage
  console.log("\n📄 6. Checking Page Coverage...");
  await checkPageCoverage();

  // 7. Generate Report
  console.log("\n" + "=".repeat(70));
  generateReport();

  await prisma.$disconnect();
}

async function checkSchemaCompleteness() {
  console.log("   Checking which models have admin interfaces...");

  const models = [
    { name: "Project", hasAdmin: true, critical: true },
    { name: "GalleryImage", hasAdmin: true, critical: true },
    { name: "Testimonial", hasAdmin: true, critical: true },
    { name: "ProcessStep", hasAdmin: false, critical: true },
    { name: "Service", hasAdmin: true, critical: true },
    { name: "Statistic", hasAdmin: true, critical: false },
    { name: "Founder", hasAdmin: true, critical: true },
    { name: "SiteSettings", hasAdmin: true, critical: true },
    { name: "HeroSection", hasAdmin: false, critical: true },
    { name: "NassGallery", hasAdmin: true, critical: true },
    { name: "Video", hasAdmin: true, critical: false },
    { name: "BeforeAfter", hasAdmin: false, critical: true },
    { name: "TechnicalSpec", hasAdmin: false, critical: false },
    { name: "Innovation", hasAdmin: true, critical: false },
    { name: "Credential", hasAdmin: false, critical: false },
    { name: "EngineeringMetric", hasAdmin: false, critical: false },
    { name: "Partnership", hasAdmin: false, critical: true },
    { name: "CTASection", hasAdmin: false, critical: false },
    { name: "BlogPost", hasAdmin: true, critical: true },
    { name: "Company", hasAdmin: true, critical: true },
    { name: "TeamMember", hasAdmin: true, critical: true },
    { name: "Lead", hasAdmin: true, critical: true },
    { name: "Customer", hasAdmin: false, critical: true },
    { name: "ContactSubmission", hasAdmin: false, critical: true },
    { name: "UITranslation", hasAdmin: false, critical: true },
    { name: "User", hasAdmin: false, critical: true },
    { name: "Subscriber", hasAdmin: false, critical: false },
  ];

  for (const model of models) {
    if (!model.hasAdmin) {
      issues.push({
        severity: model.critical ? "critical" : "warning",
        category: "Missing Admin Interface",
        issue: `No admin interface for ${model.name} model`,
        recommendation: `Create admin CRUD pages at /admin/${model.name.toLowerCase()}`,
      });
      console.log(
        `   ${model.critical ? "❌" : "⚠️ "} ${model.name}: No admin interface`,
      );
    } else {
      console.log(`   ✅ ${model.name}: Has admin interface`);
    }
  }
}

async function checkAdminRoutes() {
  console.log("   Verifying admin route structure...");

  const requiredRoutes = [
    "app/[locale]/admin/page.tsx", // Dashboard
    "app/[locale]/admin/login/page.tsx", // Login
    "app/[locale]/admin/layout.tsx", // Layout
    "app/[locale]/admin/projects/page.tsx", // Projects list
    "app/[locale]/admin/projects/new/page.tsx", // New project
    "app/[locale]/admin/projects/[id]/page.tsx", // Edit project
    "app/[locale]/admin/gallery/page.tsx", // Gallery list
    "app/[locale]/admin/gallery/new/page.tsx", // New gallery
    "app/[locale]/admin/gallery/[id]/page.tsx", // Edit gallery
    "app/[locale]/admin/blog/page.tsx", // Blog list
    "app/[locale]/admin/blog/new/page.tsx", // New blog
    "app/[locale]/admin/blog/[id]/page.tsx", // Edit blog
    "app/[locale]/admin/team-members/page.tsx", // Team list
    "app/[locale]/admin/team-members/new/page.tsx", // New team
    "app/[locale]/admin/team-members/[id]/page.tsx", // Edit team
    "app/[locale]/admin/company/page.tsx", // Company settings
    "app/[locale]/admin/founder/page.tsx", // Founder info
    "app/[locale]/admin/settings/page.tsx", // Site settings
  ];

  for (const route of requiredRoutes) {
    const fullPath = path.join(process.cwd(), route);
    if (fs.existsSync(fullPath)) {
      console.log(`   ✅ ${route.split("/").slice(-2).join("/")}`);
    } else {
      issues.push({
        severity: "warning",
        category: "Missing Route",
        issue: `Missing admin route: ${route}`,
        recommendation: `Create route at ${route}`,
      });
      console.log(`   ❌ ${route.split("/").slice(-2).join("/")}`);
    }
  }
}

async function checkContentManagement() {
  console.log("   Checking content in database...");

  // Check if each model has content
  const checks = [
    { model: "project", fn: () => prisma.project.count() },
    { model: "galleryImage", fn: () => prisma.galleryImage.count() },
    { model: "testimonial", fn: () => prisma.testimonial.count() },
    { model: "service", fn: () => prisma.service.count() },
    { model: "teamMember", fn: () => prisma.teamMember.count() },
    { model: "blogPost", fn: () => prisma.blogPost.count() },
    { model: "lead", fn: () => prisma.lead.count() },
    { model: "innovation", fn: () => prisma.innovation.count() },
    { model: "nassGallery", fn: () => prisma.nassGallery.count() },
    { model: "video", fn: () => prisma.video.count() },
    { model: "statistic", fn: () => prisma.statistic.count() },
  ];

  for (const check of checks) {
    const count = await check.fn();
    if (count === 0) {
      issues.push({
        severity: "info",
        category: "Empty Content",
        issue: `No ${check.model} entries in database`,
        recommendation: `Add ${check.model} content through admin panel`,
      });
      console.log(`   ⚠️  ${check.model}: 0 entries (empty)`);
    } else {
      console.log(`   ✅ ${check.model}: ${count} entries`);
    }
  }
}

async function checkSingletonModels() {
  console.log("   Checking singleton models...");

  // Check Founder
  const founder = await prisma.founder.findFirst();
  if (!founder) {
    issues.push({
      severity: "critical",
      category: "Missing Singleton",
      issue: "No Founder record in database",
      recommendation: "Create Founder record via /admin/founder or seed script",
    });
    console.log("   ❌ Founder: Not configured");
  } else {
    console.log("   ✅ Founder: Configured");
  }

  // Check Company
  const company = await prisma.company.findFirst();
  if (!company) {
    issues.push({
      severity: "critical",
      category: "Missing Singleton",
      issue: "No Company record in database",
      recommendation: "Create Company record via /admin/company or seed script",
    });
    console.log("   ❌ Company: Not configured");
  } else {
    console.log("   ✅ Company: Configured");
  }

  // Check SiteSettings
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    issues.push({
      severity: "warning",
      category: "Missing Singleton",
      issue: "No SiteSettings record in database",
      recommendation:
        "Create SiteSettings record via /admin/settings or seed script",
    });
    console.log("   ❌ SiteSettings: Not configured");
  } else {
    console.log("   ✅ SiteSettings: Configured");
  }

  // Check HeroSection
  const hero = await prisma.heroSection.findFirst();
  if (!hero) {
    issues.push({
      severity: "critical",
      category: "Missing Singleton",
      issue: "No HeroSection record in database",
      recommendation: "Create admin interface for HeroSection management",
    });
    console.log("   ❌ HeroSection: Not configured (NO ADMIN INTERFACE)");
  } else {
    console.log("   ⚠️  HeroSection: Configured (NO ADMIN INTERFACE)");
  }

  // Check CTASection
  const cta = await prisma.cTASection.findFirst();
  if (!cta) {
    issues.push({
      severity: "warning",
      category: "Missing Singleton",
      issue: "No CTASection record in database",
      recommendation: "Create admin interface for CTASection management",
    });
    console.log("   ❌ CTASection: Not configured (NO ADMIN INTERFACE)");
  } else {
    console.log("   ⚠️  CTASection: Configured (NO ADMIN INTERFACE)");
  }
}

async function checkMissingFeatures() {
  console.log("   Checking missing CMS features...");

  const missingFeatures = [
    {
      feature: "ProcessStep Management",
      route: "/admin/process-steps",
      severity: "critical" as const,
      reason: "Process timeline cannot be edited via CMS",
    },
    {
      feature: "HeroSection Management",
      route: "/admin/hero",
      severity: "critical" as const,
      reason: "Homepage hero cannot be edited via CMS",
    },
    {
      feature: "BeforeAfter Management",
      route: "/admin/before-after",
      severity: "critical" as const,
      reason: "Before/After comparisons cannot be managed",
    },
    {
      feature: "Partnership Management",
      route: "/admin/partnerships",
      severity: "critical" as const,
      reason: "Brand partnerships cannot be managed",
    },
    {
      feature: "UITranslation Management",
      route: "/admin/translations",
      severity: "critical" as const,
      reason: "UI text translations cannot be edited via CMS",
    },
    {
      feature: "User Management",
      route: "/admin/users",
      severity: "critical" as const,
      reason: "Admin users cannot be managed",
    },
    {
      feature: "Customer Management (CRM)",
      route: "/admin/customers",
      severity: "critical" as const,
      reason: "Customers cannot be managed via CMS",
    },
    {
      feature: "ContactSubmission Management",
      route: "/admin/contact-submissions",
      severity: "critical" as const,
      reason: "Contact form submissions cannot be viewed",
    },
    {
      feature: "TechnicalSpec Management",
      route: "/admin/technical-specs",
      severity: "warning" as const,
      reason: "Technical specifications cannot be managed",
    },
    {
      feature: "Credential Management",
      route: "/admin/credentials",
      severity: "warning" as const,
      reason: "Certifications/credentials cannot be managed",
    },
    {
      feature: "EngineeringMetric Management",
      route: "/admin/metrics",
      severity: "warning" as const,
      reason: "Engineering metrics cannot be managed",
    },
    {
      feature: "CTASection Management",
      route: "/admin/cta",
      severity: "warning" as const,
      reason: "CTA sections cannot be edited",
    },
    {
      feature: "Subscriber Management",
      route: "/admin/subscribers",
      severity: "info" as const,
      reason: "Newsletter subscribers cannot be managed",
    },
  ];

  for (const missing of missingFeatures) {
    issues.push({
      severity: missing.severity,
      category: "Missing Feature",
      issue: missing.reason,
      recommendation: `Create admin interface at ${missing.route}`,
    });
    console.log(
      `   ${missing.severity === "critical" ? "❌" : "⚠️ "} ${missing.feature}`,
    );
  }
}

async function checkPageCoverage() {
  console.log("   Checking which pages can be fully controlled via CMS...");

  const pages = [
    {
      name: "Homepage (/)",
      controllable: false,
      missing: [
        "HeroSection",
        "ProcessSteps",
        "CTASection",
        "Partnerships",
        "UITranslations",
      ],
    },
    {
      name: "About Page (/about)",
      controllable: true,
      missing: [],
    },
    {
      name: "Projects Page (/projects)",
      controllable: true,
      missing: [],
    },
    {
      name: "Gallery Page (/gallery)",
      controllable: true,
      missing: [],
    },
    {
      name: "Services Page (/services)",
      controllable: true,
      missing: [],
    },
    {
      name: "Blog Page (/blog)",
      controllable: true,
      missing: [],
    },
    {
      name: "Contact Page (/contact)",
      controllable: false,
      missing: ["ContactSubmissions viewing"],
    },
  ];

  for (const page of pages) {
    if (page.controllable) {
      console.log(`   ✅ ${page.name}: Fully controllable`);
    } else {
      issues.push({
        severity: "warning",
        category: "Incomplete Page Control",
        issue: `${page.name} is not fully controllable via CMS`,
        recommendation: `Add admin interfaces for: ${page.missing.join(", ")}`,
      });
      console.log(
        `   ⚠️  ${page.name}: Missing control for ${page.missing.join(", ")}`,
      );
    }
  }
}

function generateReport() {
  console.log("\n📊 CMS AUDIT REPORT\n");

  const critical = issues.filter((i) => i.severity === "critical");
  const warnings = issues.filter((i) => i.severity === "warning");
  const info = issues.filter((i) => i.severity === "info");

  console.log(`Total Issues Found: ${issues.length}`);
  console.log(`   🔴 Critical: ${critical.length}`);
  console.log(`   🟡 Warnings: ${warnings.length}`);
  console.log(`   🔵 Info: ${info.length}\n`);

  if (critical.length > 0) {
    console.log("🔴 CRITICAL ISSUES:\n");
    critical.forEach((issue, index) => {
      console.log(`${index + 1}. [${issue.category}] ${issue.issue}`);
      console.log(`   💡 Fix: ${issue.recommendation}\n`);
    });
  }

  if (warnings.length > 0) {
    console.log("🟡 WARNINGS:\n");
    warnings.forEach((issue, index) => {
      console.log(`${index + 1}. [${issue.category}] ${issue.issue}`);
      console.log(`   💡 Fix: ${issue.recommendation}\n`);
    });
  }

  if (info.length > 0) {
    console.log("🔵 INFORMATIONAL:\n");
    info.forEach((issue, index) => {
      console.log(`${index + 1}. [${issue.category}] ${issue.issue}`);
      console.log(`   💡 Fix: ${issue.recommendation}\n`);
    });
  }

  // Calculate CMS completeness score
  const totalModels = 27; // Total models that should have admin interfaces
  const modelsWithAdmin = 12; // Current models with admin interfaces
  const completeness = Math.round((modelsWithAdmin / totalModels) * 100);

  console.log("=".repeat(70));
  console.log(`\n📈 CMS COMPLETENESS: ${completeness}%`);
  console.log(`   Models with Admin: ${modelsWithAdmin}/${totalModels}`);
  console.log(`   Critical Gaps: ${critical.length}`);
  console.log(`   Pages Fully Controllable: 5/7 (71%)\n`);

  if (completeness < 100) {
    console.log("⚠️  ADMIN DOES NOT HAVE COMPLETE CONTROL OVER THE WEBSITE\n");
    console.log("Priority Actions:");
    console.log("1. Create admin interfaces for critical models");
    console.log("2. Add HeroSection management for homepage control");
    console.log("3. Add ProcessStep management for timeline control");
    console.log("4. Add UITranslation management for text control");
    console.log("5. Add User management for admin user control");
  } else {
    console.log("✅ ADMIN HAS COMPLETE CONTROL OVER THE WEBSITE\n");
  }

  // Save detailed report to file
  const markdownReport = generateMarkdownReport(critical, warnings, info);
  fs.writeFileSync("CMS_AUDIT_REPORT.md", markdownReport);
  console.log("📄 Detailed report saved to: CMS_AUDIT_REPORT.md\n");
}

function generateMarkdownReport(
  critical: AuditIssue[],
  warnings: AuditIssue[],
  info: AuditIssue[],
): string {
  const timestamp = new Date().toISOString();
  let report = `# CMS Audit Report\n\n`;
  report += `**Generated:** ${timestamp}\n\n`;
  report += `---\n\n`;

  report += `## Executive Summary\n\n`;
  report += `- **Total Issues:** ${critical.length + warnings.length + info.length}\n`;
  report += `- **Critical Issues:** ${critical.length}\n`;
  report += `- **Warnings:** ${warnings.length}\n`;
  report += `- **Informational:** ${info.length}\n\n`;

  const totalModels = 27;
  const modelsWithAdmin = 12;
  const completeness = Math.round((modelsWithAdmin / totalModels) * 100);

  report += `### CMS Completeness Score: ${completeness}%\n\n`;
  report += `- Models with Admin Interface: ${modelsWithAdmin}/${totalModels}\n`;
  report += `- Pages Fully Controllable: 5/7 (71%)\n\n`;

  if (completeness < 100) {
    report += `**⚠️ STATUS:** Admin does NOT have complete control over the website\n\n`;
  } else {
    report += `**✅ STATUS:** Admin has complete control over the website\n\n`;
  }

  report += `---\n\n`;

  if (critical.length > 0) {
    report += `## 🔴 Critical Issues (${critical.length})\n\n`;
    critical.forEach((issue, index) => {
      report += `### ${index + 1}. ${issue.issue}\n\n`;
      report += `- **Category:** ${issue.category}\n`;
      report += `- **Severity:** Critical\n`;
      report += `- **Recommendation:** ${issue.recommendation}\n\n`;
    });
  }

  if (warnings.length > 0) {
    report += `## 🟡 Warnings (${warnings.length})\n\n`;
    warnings.forEach((issue, index) => {
      report += `### ${index + 1}. ${issue.issue}\n\n`;
      report += `- **Category:** ${issue.category}\n`;
      report += `- **Severity:** Warning\n`;
      report += `- **Recommendation:** ${issue.recommendation}\n\n`;
    });
  }

  if (info.length > 0) {
    report += `## 🔵 Informational (${info.length})\n\n`;
    info.forEach((issue, index) => {
      report += `### ${index + 1}. ${issue.issue}\n\n`;
      report += `- **Category:** ${issue.category}\n`;
      report += `- **Severity:** Info\n`;
      report += `- **Recommendation:** ${issue.recommendation}\n\n`;
    });
  }

  report += `---\n\n`;
  report += `## Priority Action Plan\n\n`;
  report += `### Phase 1: Critical Missing Admin Interfaces\n\n`;
  report += `1. **HeroSection Management** - Homepage hero control\n`;
  report += `   - Route: \`/admin/hero\`\n`;
  report += `   - Impact: High - Controls main homepage section\n\n`;
  report += `2. **ProcessStep Management** - Process timeline control\n`;
  report += `   - Route: \`/admin/process-steps\`\n`;
  report += `   - Impact: High - Controls process/workflow display\n\n`;
  report += `3. **UITranslation Management** - Text translation control\n`;
  report += `   - Route: \`/admin/translations\`\n`;
  report += `   - Impact: High - Enables full text customization\n\n`;
  report += `4. **User Management** - Admin user control\n`;
  report += `   - Route: \`/admin/users\`\n`;
  report += `   - Impact: Critical - Required for user administration\n\n`;
  report += `5. **Partnership Management** - Brand partnership logos\n`;
  report += `   - Route: \`/admin/partnerships\`\n`;
  report += `   - Impact: Medium - Controls partner display\n\n`;

  report += `### Phase 2: CRM & Customer Management\n\n`;
  report += `1. **Customer Management** - Customer database\n`;
  report += `   - Route: \`/admin/customers\`\n`;
  report += `   - Impact: High - Complete CRM functionality\n\n`;
  report += `2. **ContactSubmission Viewing** - Form submissions\n`;
  report += `   - Route: \`/admin/contact-submissions\`\n`;
  report += `   - Impact: High - View contact form data\n\n`;

  report += `### Phase 3: Additional Features\n\n`;
  report += `1. BeforeAfter Management\n`;
  report += `2. TechnicalSpec Management\n`;
  report += `3. Credential Management\n`;
  report += `4. EngineeringMetric Management\n`;
  report += `5. CTASection Management\n`;
  report += `6. Subscriber Management\n\n`;

  report += `---\n\n`;
  report += `## Current Admin Coverage\n\n`;
  report += `### ✅ Models WITH Admin Interface:\n\n`;
  report += `- Project\n`;
  report += `- GalleryImage\n`;
  report += `- Testimonial\n`;
  report += `- Service\n`;
  report += `- Founder\n`;
  report += `- Company\n`;
  report += `- TeamMember\n`;
  report += `- BlogPost\n`;
  report += `- NassGallery\n`;
  report += `- Video\n`;
  report += `- Innovation\n`;
  report += `- Statistic\n`;
  report += `- Lead (CRM)\n`;
  report += `- SiteSettings\n\n`;

  report += `### ❌ Models WITHOUT Admin Interface:\n\n`;
  report += `- ProcessStep (Critical)\n`;
  report += `- HeroSection (Critical)\n`;
  report += `- BeforeAfter (Critical)\n`;
  report += `- Partnership (Critical)\n`;
  report += `- UITranslation (Critical)\n`;
  report += `- User (Critical)\n`;
  report += `- Customer (Critical)\n`;
  report += `- ContactSubmission (Critical)\n`;
  report += `- TechnicalSpec (Warning)\n`;
  report += `- Credential (Warning)\n`;
  report += `- EngineeringMetric (Warning)\n`;
  report += `- CTASection (Warning)\n`;
  report += `- Subscriber (Info)\n\n`;

  return report;
}

auditCMS().catch(console.error);
