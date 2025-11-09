import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateToBilingual() {
  try {
    console.log('🔄 Starting bilingual migration...\n');

    // Migrate Projects
    console.log('📁 Migrating Projects...');
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { titleEn: '' },
          { titleAr: '' },
        ],
      },
    });

    for (const project of projects) {
      await prisma.project.update({
        where: { id: project.id },
        data: {
          titleEn: project.title || project.titleEn || 'Untitled Project',
          titleAr: project.title || project.titleAr || 'مشروع بدون عنوان',
          descriptionEn: project.description || project.descriptionEn || 'No description available',
          descriptionAr: project.description || project.descriptionAr || 'لا يوجد وصف متاح',
          challengesEn: project.challenges || project.challengesEn || 'No challenges documented',
          challengesAr: project.challenges || project.challengesAr || 'لا توجد تحديات موثقة',
        },
      });
    }
    console.log(`✅ Migrated ${projects.length} projects\n`);

    // Migrate Gallery Images
    console.log('🖼️  Migrating Gallery Images...');
    const galleryImages = await prisma.galleryImage.findMany({
      where: {
        OR: [
          { titleEn: '' },
          { titleAr: '' },
        ],
      },
    });

    for (const image of galleryImages) {
      await prisma.galleryImage.update({
        where: { id: image.id },
        data: {
          titleEn: image.title || image.titleEn || 'Gallery Image',
          titleAr: image.title || image.titleAr || 'صورة المعرض',
          descriptionEn: image.description || image.descriptionEn || 'No description available',
          descriptionAr: image.description || image.descriptionAr || 'لا يوجد وصف متاح',
        },
      });
    }
    console.log(`✅ Migrated ${galleryImages.length} gallery images\n`);

    // Migrate Testimonials
    console.log('💬 Migrating Testimonials...');
    const testimonials = await prisma.testimonial.findMany({
      where: {
        OR: [
          { nameEn: '' },
          { nameAr: '' },
        ],
      },
    });

    for (const testimonial of testimonials) {
      await prisma.testimonial.update({
        where: { id: testimonial.id },
        data: {
          nameEn: testimonial.name || testimonial.nameEn || 'Anonymous',
          nameAr: testimonial.name || testimonial.nameAr || 'مجهول',
          titleEn: testimonial.title || testimonial.titleEn || 'Client',
          titleAr: testimonial.title || testimonial.titleAr || 'عميل',
          quoteEn: testimonial.quote || testimonial.quoteEn || 'No testimonial provided',
          quoteAr: testimonial.quote || testimonial.quoteAr || 'لا توجد شهادة متاحة',
        },
      });
    }
    console.log(`✅ Migrated ${testimonials.length} testimonials\n`);

    // Migrate Process Steps
    console.log('⚙️  Migrating Process Steps...');
    const processSteps = await prisma.processStep.findMany({
      where: {
        OR: [
          { titleEn: '' },
          { titleAr: '' },
        ],
      },
    });

    for (const step of processSteps) {
      await prisma.processStep.update({
        where: { id: step.id },
        data: {
          titleEn: step.title || step.titleEn || 'Process Step',
          titleAr: step.title || step.titleAr || 'خطوة العملية',
          descriptionEn: step.description || step.descriptionEn || 'No description available',
          descriptionAr: step.description || step.descriptionAr || 'لا يوجد وصف متاح',
        },
      });
    }
    console.log(`✅ Migrated ${processSteps.length} process steps\n`);

    // Migrate Services
    console.log('🛠️  Migrating Services...');
    const services = await prisma.service.findMany({
      where: {
        OR: [
          { titleEn: '' },
          { titleAr: '' },
        ],
      },
    });

    for (const service of services) {
      await prisma.service.update({
        where: { id: service.id },
        data: {
          titleEn: service.title || service.titleEn || 'Service',
          titleAr: service.title || service.titleAr || 'خدمة',
          descriptionEn: service.description || service.descriptionEn || 'No description available',
          descriptionAr: service.description || service.descriptionAr || 'لا يوجد وصف متاح',
        },
      });
    }
    console.log(`✅ Migrated ${services.length} services\n`);

    // Migrate Statistics
    console.log('📊 Migrating Statistics...');
    const statistics = await prisma.statistic.findMany({
      where: {
        OR: [
          { labelEn: '' },
          { labelAr: '' },
        ],
      },
    });

    for (const stat of statistics) {
      await prisma.statistic.update({
        where: { id: stat.id },
        data: {
          labelEn: stat.label || stat.labelEn || 'Statistic',
          labelAr: stat.label || stat.labelAr || 'إحصائية',
        },
      });
    }
    console.log(`✅ Migrated ${statistics.length} statistics\n`);

    console.log('🎉 Bilingual migration completed successfully!');
    console.log('\nSummary:');
    console.log(`- Projects: ${projects.length}`);
    console.log(`- Gallery Images: ${galleryImages.length}`);
    console.log(`- Testimonials: ${testimonials.length}`);
    console.log(`- Process Steps: ${processSteps.length}`);
    console.log(`- Services: ${services.length}`);
    console.log(`- Statistics: ${statistics.length}`);
    console.log(`\nTotal records migrated: ${
      projects.length +
      galleryImages.length +
      testimonials.length +
      processSteps.length +
      services.length +
      statistics.length
    }`);

  } catch (error) {
    console.error('❌ Error during bilingual migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

migrateToBilingual();
