import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Project updates - English adjusted to match Arabic meaning
const projectUpdates: Record<string, { titleEn: string; descriptionEn: string }> = {
  // تسريحة خشب سافيولا ايطالي = Italian Saviola Wood Dressing Table
  'cmjqsmjy00000u6i4ehfp86r5': {
    titleEn: 'Italian Saviola Wood Dressing Table',
    descriptionEn: 'Elegant dressing table made from premium Italian Saviola wood with sophisticated design and superior craftsmanship.',
  },
  // تي في خشب سافيولا ايطالي = Italian Saviola Wood TV Unit (AR says just "TV" not "TV Unit")
  'cmjqsmm620003u6i4jfe58s8e': {
    titleEn: 'Italian Saviola Wood TV Stand',
    descriptionEn: 'Modern TV stand made from Italian Saviola wood with contemporary design and practical storage.',
  },
  // خزانة خشب الفا وود يوناني = Greek Alpha Wood Wardrobe
  'cmjqsmryf000bu6i4k91ijqzu': {
    titleEn: 'Greek Alpha Wood Wardrobe',
    descriptionEn: 'Luxurious wardrobe crafted from Greek Alpha Wood, combining durability with elegant aesthetics.',
  },
  // خزانة خشب سالكو اوروبي + بي في سي = European Salco Wood + PVC Wardrobe
  'cmjqsmu9c000eu6i4mib25ca1': {
    titleEn: 'European Salco Wood + PVC Wardrobe',
    descriptionEn: 'Premium wardrobe combining European Salco wood with PVC finishes for enhanced durability and modern look.',
  },
  // خزانة ملابس خشب الفا وود = Alpha Wood Clothes Wardrobe
  'cmjqsmy46000ju6i4hdrryotu': {
    titleEn: 'Alpha Wood Clothes Wardrobe',
    descriptionEn: 'Spacious clothes wardrobe made from Alpha Wood with smart organization features and elegant finish.',
  },
  // خزائن بي في سي = PVC Cabinets
  'cmjqsn13k000nu6i4aj0wf97n': {
    titleEn: 'PVC Cabinets',
    descriptionEn: 'Modern PVC cabinets with water-resistant properties and contemporary design, perfect for humid environments.',
  },
  // سرير تنجيد قماش = Upholstered Fabric Bed
  'cmjqsn9e1000yu6i46vynpkfj': {
    titleEn: 'Upholstered Fabric Bed',
    descriptionEn: 'Luxurious upholstered bed with premium fabric covering, designed for comfort and elegance.',
  },
  // غرفة غسيل خشب سافيولا ايطالي = Italian Saviola Wood Laundry Room
  'cmjqsnaz80010u6i47hgzg3qk': {
    titleEn: 'Italian Saviola Wood Laundry Room',
    descriptionEn: 'Functional laundry room designed with Italian Saviola wood, combining practicality with premium aesthetics.',
  },
  // كونسول + تي في الفا وود يوناني = Greek Alpha Wood Console + TV
  'cmjqsncgg0012u6i4fhduxnco': {
    titleEn: 'Greek Alpha Wood Console + TV Unit',
    descriptionEn: 'Elegant console and TV unit combination crafted from Greek Alpha Wood with seamless design integration.',
  },
  // مطبخ بي في سي = PVC Kitchen
  'cmjqsngvu0018u6i4qlh2crz1': {
    titleEn: 'PVC Kitchen',
    descriptionEn: 'Modern PVC kitchen with water-resistant cabinets, easy maintenance, and contemporary styling.',
  },
  // مطبخ خشب AGT تركي = Turkish AGT Wood Kitchen
  'cmjqsnkqz001du6i4im2s98kt': {
    titleEn: 'Turkish AGT Wood Kitchen',
    descriptionEn: 'Premium kitchen featuring Turkish AGT wood panels, known for durability and elegant wood grain patterns.',
  },
  // مطبخ خشب الفا وود يوناني = Greek Alpha Wood Kitchen
  'cmjqsnovj001iu6i4sxp49s5u': {
    titleEn: 'Greek Alpha Wood Kitchen',
    descriptionEn: 'Classic kitchen design using Greek Alpha Wood, featuring timeless elegance and superior build quality.',
  },
  // مطبخ خشب ايجر الماني = German Egger Wood Kitchen
  'cmjqsnx39001tu6i46rsyf0kp': {
    titleEn: 'German Egger Wood Kitchen',
    descriptionEn: 'High-end kitchen constructed with German Egger wood panels, known for precision engineering and durability.',
  },
  // مطبخ خشب سافيولا ايطالي = Italian Saviola Wood Kitchen
  'cmjqso2bo0020u6i4do4i48in': {
    titleEn: 'Italian Saviola Wood Kitchen',
    descriptionEn: 'Luxurious kitchen featuring Italian Saviola wood panels with premium finishes and modern functionality.',
  },
  // مطبخ فل المنيوم = Full Aluminum Kitchen
  'cmjqso7vk0027u6i4f1a0whvn': {
    titleEn: 'Full Aluminum Kitchen',
    descriptionEn: 'Complete aluminum kitchen system with modern design, excellent durability, and easy maintenance.',
  },
  // مغسلة حمام كوارتز مع خشب الفا وود يوناني = Quartz Bathroom Vanity with Greek Alpha Wood
  'cmjqsod4p002eu6i4h6w51t3x': {
    titleEn: 'Quartz Bathroom Vanity with Greek Alpha Wood',
    descriptionEn: 'Elegant bathroom vanity combining quartz countertop with Greek Alpha Wood cabinetry.',
  },
};

// Statistic updates - Fix singular/plural alignment
const statisticUpdates: Record<string, { labelEn: string }> = {
  'cmhxjem5b0002u6jwn7g6hw4j': { labelEn: 'Luxury Kitchens' }, // مطبخ فاخر
  'cmhxjem5b0003u6jw59y149g8': { labelEn: 'Countries' }, // دولة
  'cmhxjem5b0004u6jw975lxqf5': { labelEn: 'Years of Excellence' }, // سنة من التميز
  'cmhxjem5b0005u6jw379dqdm8': { labelEn: 'Client Satisfaction' }, // رضا العملاء
};

async function main() {
  console.log('Updating English content to align with Arabic...\n');

  // Update Projects
  console.log('📁 Updating Projects...');
  for (const [id, data] of Object.entries(projectUpdates)) {
    try {
      await prisma.project.update({
        where: { id },
        data: {
          titleEn: data.titleEn,
          descriptionEn: data.descriptionEn,
        },
      });
      console.log(`✅ Updated: ${data.titleEn}`);
    } catch (e) {
      console.log(`⚠️ Skipped: ${id} (not found)`);
    }
  }

  // Update gallery images with matching project titles
  console.log('\n🖼️ Updating Gallery Images...');
  const galleryImages = await prisma.galleryImage.findMany();

  for (const img of galleryImages) {
    // Find matching project update by checking if title contains project name
    for (const [, data] of Object.entries(projectUpdates)) {
      if (img.titleEn?.includes(data.titleEn.replace(' - Image', '')) ||
          img.titleAr?.includes(data.titleEn.split(' ')[0])) {
        // Extract image number from current title
        const imageMatch = img.titleEn?.match(/Image (\d+)/);
        const imageNum = imageMatch ? imageMatch[1] : '1';

        await prisma.galleryImage.update({
          where: { id: img.id },
          data: {
            titleEn: `${data.titleEn} - Image ${imageNum}`,
            descriptionEn: data.descriptionEn,
          },
        });
      }
    }
  }
  console.log(`✅ Updated ${galleryImages.length} gallery images`);

  // Update Statistics
  console.log('\n📊 Updating Statistics...');
  for (const [id, data] of Object.entries(statisticUpdates)) {
    try {
      await prisma.statistic.update({
        where: { id },
        data: { labelEn: data.labelEn },
      });
      console.log(`✅ Updated: ${data.labelEn}`);
    } catch (e) {
      console.log(`⚠️ Skipped: ${id} (not found)`);
    }
  }

  console.log('\n✅ All updates completed!');
  await prisma.$disconnect();
}

main();
