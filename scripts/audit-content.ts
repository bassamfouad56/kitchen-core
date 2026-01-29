import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('='.repeat(80));
  console.log('CONTENT AUDIT - Arabic/English Alignment');
  console.log('='.repeat(80));

  // 1. Audit Projects
  console.log('\n📁 PROJECTS\n');
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  for (const p of projects) {
    console.log(`ID: ${p.id}`);
    console.log(`Title EN: "${p.titleEn}"`);
    console.log(`Title AR: "${p.titleAr}"`);
    console.log(`Desc EN: "${p.descriptionEn?.slice(0, 100)}..."`);
    console.log(`Desc AR: "${p.descriptionAr?.slice(0, 100)}..."`);
    console.log(`Location: ${p.location}`);
    console.log('---\n');
  }

  // 2. Audit Gallery Images
  console.log('\n🖼️ GALLERY IMAGES\n');
  const gallery = await prisma.galleryImage.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' }
  });

  for (const g of gallery) {
    console.log(`ID: ${g.id}`);
    console.log(`Title EN: "${g.titleEn}"`);
    console.log(`Title AR: "${g.titleAr}"`);
    console.log(`Desc EN: "${g.descriptionEn?.slice(0, 80)}..."`);
    console.log(`Desc AR: "${g.descriptionAr?.slice(0, 80)}..."`);
    console.log('---\n');
  }

  // 3. Audit Services
  console.log('\n🛠️ SERVICES\n');
  const services = await prisma.service.findMany();

  for (const s of services) {
    console.log(`ID: ${s.id}`);
    console.log(`Title EN: "${s.titleEn}"`);
    console.log(`Title AR: "${s.titleAr}"`);
    console.log(`Desc EN: "${s.descriptionEn?.slice(0, 100)}..."`);
    console.log(`Desc AR: "${s.descriptionAr?.slice(0, 100)}..."`);
    console.log('---\n');
  }

  // 4. Audit Testimonials
  console.log('\n💬 TESTIMONIALS\n');
  const testimonials = await prisma.testimonial.findMany();

  for (const t of testimonials) {
    console.log(`ID: ${t.id}`);
    console.log(`Name EN: "${t.nameEn}"`);
    console.log(`Name AR: "${t.nameAr}"`);
    console.log(`Content EN: "${t.contentEn?.slice(0, 100)}..."`);
    console.log(`Content AR: "${t.contentAr?.slice(0, 100)}..."`);
    console.log('---\n');
  }

  // 5. Audit Statistics
  console.log('\n📊 STATISTICS\n');
  const stats = await prisma.statistic.findMany();

  for (const s of stats) {
    console.log(`ID: ${s.id}`);
    console.log(`Label EN: "${s.labelEn}"`);
    console.log(`Label AR: "${s.labelAr}"`);
    console.log('---\n');
  }

  await prisma.$disconnect();
}

main();
