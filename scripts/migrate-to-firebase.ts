/**
 * Migration Script: PostgreSQL/Prisma to Firebase/Firestore
 *
 * This script migrates all data from the existing Prisma/PostgreSQL database
 * to Firebase Firestore.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-firebase.ts
 *
 * Prerequisites:
 *   1. Set up Firebase project and enable Firestore
 *   2. Add Firebase Admin credentials to .env.local:
 *      - FIREBASE_PROJECT_ID
 *      - FIREBASE_CLIENT_EMAIL
 *      - FIREBASE_PRIVATE_KEY
 *   3. Ensure PostgreSQL database is accessible
 */

import { PrismaClient } from "@prisma/client";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize Firebase Admin
function initFirebaseAdmin() {
  if (getApps().length === 0) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!privateKey || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PROJECT_ID) {
      console.error("❌ Firebase Admin credentials not found in environment variables");
      console.error("   Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY");
      process.exit(1);
    }

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
  }

  return getFirestore();
}

const db = initFirebaseAdmin();

// Helper to convert dates to Firestore Timestamps
function toTimestamp(date: Date | null | undefined): Timestamp | null {
  return date ? Timestamp.fromDate(date) : null;
}

// Helper for batch operations
async function batchWrite(
  collectionName: string,
  items: Array<{ id: string; data: Record<string, unknown> }>,
) {
  const batch = db.batch();
  const collectionRef = db.collection(collectionName);

  for (const item of items) {
    const docRef = collectionRef.doc(item.id);
    batch.set(docRef, item.data);
  }

  await batch.commit();
  console.log(`  ✓ Migrated ${items.length} documents to ${collectionName}`);
}

// Migration functions for each collection

async function migrateUsers() {
  console.log("📦 Migrating Users...");
  const users = await prisma.user.findMany();

  const items = users.map((user) => ({
    id: user.id,
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      createdAt: toTimestamp(user.createdAt),
      updatedAt: toTimestamp(user.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("users", items);
  } else {
    console.log("  ⚠ No users to migrate");
  }
}

async function migrateProjects() {
  console.log("📦 Migrating Projects...");
  const projects = await prisma.project.findMany();

  const items = projects.map((project) => ({
    id: project.id,
    data: {
      title: project.title,
      titleEn: project.titleEn,
      titleAr: project.titleAr,
      slug: project.slug,
      location: project.location,
      category: project.category,
      image: project.image,
      gallery: project.gallery,
      description: project.description,
      descriptionEn: project.descriptionEn,
      descriptionAr: project.descriptionAr,
      year: project.year,
      area: project.area,
      budget: project.budget,
      materials: project.materials,
      appliances: project.appliances,
      features: project.features,
      duration: project.duration,
      challenges: project.challenges,
      challengesEn: project.challengesEn,
      challengesAr: project.challengesAr,
      innovations: project.innovations,
      featured: project.featured,
      order: project.order,
      published: project.published,
      leadId: project.leadId,
      customerId: project.customerId,
      createdAt: toTimestamp(project.createdAt),
      updatedAt: toTimestamp(project.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("projects", items);
  } else {
    console.log("  ⚠ No projects to migrate");
  }
}

async function migrateGalleryImages() {
  console.log("📦 Migrating Gallery Images...");
  const images = await prisma.galleryImage.findMany();

  const items = images.map((image) => ({
    id: image.id,
    data: {
      title: image.title,
      titleEn: image.titleEn,
      titleAr: image.titleAr,
      image: image.image,
      category: image.category,
      location: image.location,
      size: image.size,
      description: image.description,
      descriptionEn: image.descriptionEn,
      descriptionAr: image.descriptionAr,
      order: image.order,
      published: image.published,
      createdAt: toTimestamp(image.createdAt),
      updatedAt: toTimestamp(image.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("galleryImages", items);
  } else {
    console.log("  ⚠ No gallery images to migrate");
  }
}

async function migrateTestimonials() {
  console.log("📦 Migrating Testimonials...");
  const testimonials = await prisma.testimonial.findMany();

  const items = testimonials.map((t) => ({
    id: t.id,
    data: {
      name: t.name,
      nameEn: t.nameEn,
      nameAr: t.nameAr,
      title: t.title,
      titleEn: t.titleEn,
      titleAr: t.titleAr,
      location: t.location,
      image: t.image,
      quote: t.quote,
      quoteEn: t.quoteEn,
      quoteAr: t.quoteAr,
      rating: t.rating,
      project: t.project,
      featured: t.featured,
      order: t.order,
      published: t.published,
      createdAt: toTimestamp(t.createdAt),
      updatedAt: toTimestamp(t.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("testimonials", items);
  } else {
    console.log("  ⚠ No testimonials to migrate");
  }
}

async function migrateProcessSteps() {
  console.log("📦 Migrating Process Steps...");
  const steps = await prisma.processStep.findMany();

  const items = steps.map((step) => ({
    id: step.id,
    data: {
      number: step.number,
      title: step.title,
      titleEn: step.titleEn,
      titleAr: step.titleAr,
      description: step.description,
      descriptionEn: step.descriptionEn,
      descriptionAr: step.descriptionAr,
      duration: step.duration,
      iconName: step.iconName,
      order: step.order,
      published: step.published,
      createdAt: toTimestamp(step.createdAt),
      updatedAt: toTimestamp(step.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("processSteps", items);
  } else {
    console.log("  ⚠ No process steps to migrate");
  }
}

async function migrateServices() {
  console.log("📦 Migrating Services...");
  const services = await prisma.service.findMany();

  const items = services.map((s) => ({
    id: s.id,
    data: {
      title: s.title,
      titleEn: s.titleEn,
      titleAr: s.titleAr,
      description: s.description,
      descriptionEn: s.descriptionEn,
      descriptionAr: s.descriptionAr,
      features: s.features,
      order: s.order,
      published: s.published,
      createdAt: toTimestamp(s.createdAt),
      updatedAt: toTimestamp(s.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("services", items);
  } else {
    console.log("  ⚠ No services to migrate");
  }
}

async function migrateStatistics() {
  console.log("📦 Migrating Statistics...");
  const stats = await prisma.statistic.findMany();

  const items = stats.map((stat) => ({
    id: stat.id,
    data: {
      number: stat.number,
      label: stat.label,
      labelEn: stat.labelEn,
      labelAr: stat.labelAr,
      section: stat.section,
      order: stat.order,
      published: stat.published,
      createdAt: toTimestamp(stat.createdAt),
      updatedAt: toTimestamp(stat.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("statistics", items);
  } else {
    console.log("  ⚠ No statistics to migrate");
  }
}

async function migrateFounder() {
  console.log("📦 Migrating Founder...");
  const founder = await prisma.founder.findFirst();

  if (founder) {
    await db.collection("founder").doc("main").set({
      name: founder.name,
      title: founder.title,
      image: founder.image,
      bio: founder.bio,
      education: founder.education,
      recognition: founder.recognition,
      quote: founder.quote,
      published: founder.published,
      createdAt: toTimestamp(founder.createdAt),
      updatedAt: toTimestamp(founder.updatedAt),
    });
    console.log("  ✓ Migrated founder data");
  } else {
    console.log("  ⚠ No founder data to migrate");
  }
}

async function migrateCompany() {
  console.log("📦 Migrating Company...");
  const company = await prisma.company.findFirst();

  if (company) {
    await db.collection("company").doc("main").set({
      nameEn: company.nameEn,
      nameAr: company.nameAr,
      taglineEn: company.taglineEn,
      taglineAr: company.taglineAr,
      descriptionEn: company.descriptionEn,
      descriptionAr: company.descriptionAr,
      missionEn: company.missionEn,
      missionAr: company.missionAr,
      visionEn: company.visionEn,
      visionAr: company.visionAr,
      valuesEn: company.valuesEn,
      valuesAr: company.valuesAr,
      foundedYear: company.foundedYear,
      employeeCount: company.employeeCount,
      projectsCompleted: company.projectsCompleted,
      countriesServed: company.countriesServed,
      yearsOfExperience: company.yearsOfExperience,
      featuredImage: company.featuredImage,
      backgroundVideo: company.backgroundVideo,
      phone: company.phone,
      email: company.email,
      whatsappNumber: company.whatsappNumber,
      instagramUrl: company.instagramUrl,
      facebookUrl: company.facebookUrl,
      linkedinUrl: company.linkedinUrl,
      twitterUrl: company.twitterUrl,
      youtubeUrl: company.youtubeUrl,
      tiktokUrl: company.tiktokUrl,
      published: company.published,
      createdAt: toTimestamp(company.createdAt),
      updatedAt: toTimestamp(company.updatedAt),
    });
    console.log("  ✓ Migrated company data");
  } else {
    console.log("  ⚠ No company data to migrate");
  }
}

async function migrateTeamMembers() {
  console.log("📦 Migrating Team Members...");
  const members = await prisma.teamMember.findMany();

  const items = members.map((m) => ({
    id: m.id,
    data: {
      nameEn: m.nameEn,
      nameAr: m.nameAr,
      roleEn: m.roleEn,
      roleAr: m.roleAr,
      bioEn: m.bioEn,
      bioAr: m.bioAr,
      image: m.image,
      specialtiesEn: m.specialtiesEn,
      specialtiesAr: m.specialtiesAr,
      email: m.email,
      linkedin: m.linkedin,
      yearsOfExperience: m.yearsOfExperience,
      order: m.order,
      published: m.published,
      createdAt: toTimestamp(m.createdAt),
      updatedAt: toTimestamp(m.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("teamMembers", items);
  } else {
    console.log("  ⚠ No team members to migrate");
  }
}

async function migrateLeads() {
  console.log("📦 Migrating Leads...");
  const leads = await prisma.lead.findMany();

  const items = leads.map((lead) => ({
    id: lead.id,
    data: {
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      jobTitle: lead.jobTitle,
      projectType: lead.projectType,
      budget: lead.budget,
      timeline: lead.timeline,
      location: lead.location,
      message: lead.message,
      source: lead.source,
      status: lead.status,
      priority: lead.priority,
      assignedTo: lead.assignedTo,
      notes: lead.notes,
      lastContacted: toTimestamp(lead.lastContacted),
      nextFollowUp: toTimestamp(lead.nextFollowUp),
      tags: lead.tags,
      metadata: lead.metadata,
      createdAt: toTimestamp(lead.createdAt),
      updatedAt: toTimestamp(lead.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("leads", items);
  } else {
    console.log("  ⚠ No leads to migrate");
  }
}

async function migrateLeadInteractions() {
  console.log("📦 Migrating Lead Interactions...");
  const interactions = await prisma.leadInteraction.findMany();

  const items = interactions.map((i) => ({
    id: i.id,
    data: {
      leadId: i.leadId,
      type: i.type,
      subject: i.subject,
      content: i.content,
      direction: i.direction,
      outcome: i.outcome,
      scheduledFor: toTimestamp(i.scheduledFor),
      completedAt: toTimestamp(i.completedAt),
      createdBy: i.createdBy,
      metadata: i.metadata,
      createdAt: toTimestamp(i.createdAt),
      updatedAt: toTimestamp(i.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("leadInteractions", items);
  } else {
    console.log("  ⚠ No lead interactions to migrate");
  }
}

async function migrateCustomers() {
  console.log("📦 Migrating Customers...");
  const customers = await prisma.customer.findMany();

  const items = customers.map((c) => ({
    id: c.id,
    data: {
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      phone: c.phone,
      company: c.company,
      jobTitle: c.jobTitle,
      address: c.address,
      city: c.city,
      country: c.country,
      customerType: c.customerType,
      status: c.status,
      source: c.source,
      leadId: c.leadId,
      assignedTo: c.assignedTo,
      notes: c.notes,
      tags: c.tags,
      metadata: c.metadata,
      createdAt: toTimestamp(c.createdAt),
      updatedAt: toTimestamp(c.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("customers", items);
  } else {
    console.log("  ⚠ No customers to migrate");
  }
}

async function migrateCustomerInteractions() {
  console.log("📦 Migrating Customer Interactions...");
  const interactions = await prisma.customerInteraction.findMany();

  const items = interactions.map((i) => ({
    id: i.id,
    data: {
      customerId: i.customerId,
      type: i.type,
      subject: i.subject,
      content: i.content,
      direction: i.direction,
      outcome: i.outcome,
      scheduledFor: toTimestamp(i.scheduledFor),
      completedAt: toTimestamp(i.completedAt),
      createdBy: i.createdBy,
      metadata: i.metadata,
      createdAt: toTimestamp(i.createdAt),
      updatedAt: toTimestamp(i.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("customerInteractions", items);
  } else {
    console.log("  ⚠ No customer interactions to migrate");
  }
}

async function migrateBlogPosts() {
  console.log("📦 Migrating Blog Posts...");
  const posts = await prisma.blogPost.findMany();

  const items = posts.map((post) => ({
    id: post.id,
    data: {
      slug: post.slug,
      titleEn: post.titleEn,
      titleAr: post.titleAr,
      excerptEn: post.excerptEn,
      excerptAr: post.excerptAr,
      contentEn: post.contentEn,
      contentAr: post.contentAr,
      featuredImage: post.featuredImage,
      category: post.category,
      tags: post.tags,
      author: post.author,
      readingTime: post.readingTime,
      views: post.views,
      published: post.published,
      publishedAt: toTimestamp(post.publishedAt),
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      seoKeywords: post.seoKeywords,
      createdAt: toTimestamp(post.createdAt),
      updatedAt: toTimestamp(post.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("blogPosts", items);
  } else {
    console.log("  ⚠ No blog posts to migrate");
  }
}

async function migrateUITranslations() {
  console.log("📦 Migrating UI Translations...");
  const translations = await prisma.uITranslation.findMany();

  const items = translations.map((t) => ({
    id: t.id,
    data: {
      key: t.key,
      category: t.category,
      textEn: t.textEn,
      textAr: t.textAr,
      description: t.description,
      order: t.order,
      published: t.published,
      createdAt: toTimestamp(t.createdAt),
      updatedAt: toTimestamp(t.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("uiTranslations", items);
  } else {
    console.log("  ⚠ No UI translations to migrate");
  }
}

async function migrateContactSubmissions() {
  console.log("📦 Migrating Contact Submissions...");
  const submissions = await prisma.contactSubmission.findMany();

  const items = submissions.map((s) => ({
    id: s.id,
    data: {
      name: s.name,
      email: s.email,
      phone: s.phone,
      company: s.company,
      subject: s.subject,
      message: s.message,
      source: s.source,
      metadata: s.metadata,
      processed: s.processed,
      processedBy: s.processedBy,
      processedAt: toTimestamp(s.processedAt),
      notes: s.notes,
      createdAt: toTimestamp(s.createdAt),
      updatedAt: toTimestamp(s.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("contactSubmissions", items);
  } else {
    console.log("  ⚠ No contact submissions to migrate");
  }
}

async function migrateSubscribers() {
  console.log("📦 Migrating Subscribers...");
  const subscribers = await prisma.subscriber.findMany();

  const items = subscribers.map((s) => ({
    id: s.id,
    data: {
      email: s.email,
      name: s.name,
      preferences: s.preferences,
      verified: s.verified,
      verifyToken: s.verifyToken,
      unsubscribeToken: s.unsubscribeToken,
      createdAt: toTimestamp(s.createdAt),
      updatedAt: toTimestamp(s.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("subscribers", items);
  } else {
    console.log("  ⚠ No subscribers to migrate");
  }
}

async function migrateTasks() {
  console.log("📦 Migrating Tasks...");
  const tasks = await prisma.task.findMany();

  const items = tasks.map((task) => ({
    id: task.id,
    data: {
      title: task.title,
      description: task.description,
      type: task.type,
      priority: task.priority,
      status: task.status,
      dueDate: toTimestamp(task.dueDate),
      completedAt: toTimestamp(task.completedAt),
      assignedTo: task.assignedTo,
      relatedTo: task.relatedTo,
      relatedType: task.relatedType,
      metadata: task.metadata,
      createdAt: toTimestamp(task.createdAt),
      updatedAt: toTimestamp(task.updatedAt),
    },
  }));

  if (items.length > 0) {
    await batchWrite("tasks", items);
  } else {
    console.log("  ⚠ No tasks to migrate");
  }
}

// Main migration function
async function migrate() {
  console.log("🚀 Starting migration from PostgreSQL to Firebase Firestore...\n");

  try {
    // Core content
    await migrateUsers();
    await migrateProjects();
    await migrateGalleryImages();
    await migrateTestimonials();
    await migrateProcessSteps();
    await migrateServices();
    await migrateStatistics();

    // Singletons
    await migrateFounder();
    await migrateCompany();

    // Team
    await migrateTeamMembers();

    // CRM
    await migrateLeads();
    await migrateLeadInteractions();
    await migrateCustomers();
    await migrateCustomerInteractions();
    await migrateTasks();

    // Content
    await migrateBlogPosts();
    await migrateUITranslations();

    // Other
    await migrateContactSubmissions();
    await migrateSubscribers();

    console.log("\n✅ Migration completed successfully!");
    console.log("\n📋 Next steps:");
    console.log("   1. Verify data in Firebase Console: https://console.firebase.google.com");
    console.log("   2. Update API routes to use Firestore services");
    console.log("   3. Test all endpoints");
    console.log("   4. Remove Prisma dependencies when ready");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrate();
