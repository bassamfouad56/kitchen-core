import { prisma } from "./lib/prisma";

async function check() {
  const founder = await prisma.founder.count();
  const team = await prisma.teamMember.count();
  const company = await prisma.company.count();
  const projects = await prisma.project.count();
  const gallery = await prisma.galleryImage.count();
  const services = await prisma.service.count();
  const blog = await prisma.blogPost.count();
  const testimonials = await prisma.testimonial.count();
  const stats = await prisma.statistic.count();

  console.log("\n📊 Database Content Summary:\n");
  console.log("✅ Founder:", founder);
  console.log("✅ Team Members:", team);
  console.log("✅ Company:", company);
  console.log("✅ Projects:", projects);
  console.log("✅ Gallery Images:", gallery);
  console.log("✅ Services:", services);
  console.log("✅ Blog Posts:", blog);
  console.log("✅ Testimonials:", testimonials);
  console.log("✅ Statistics:", stats);

  await prisma.$disconnect();
}

check();
