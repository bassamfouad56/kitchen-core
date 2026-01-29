import 'dotenv/config';
import { PrismaClient, ProjectCategory, GallerySize } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Project data mapping from Arabic folder names
const projectsData = [
  {
    folderName: 'تسريحة خشب سافيولا ايطالي -خورفكان',
    titleEn: 'Italian Saviola Wood Dressing Table',
    titleAr: 'تسريحة خشب سافيولا ايطالي',
    descriptionEn: 'Elegant dressing table crafted from premium Italian Saviola wood, featuring sophisticated design and superior craftsmanship.',
    descriptionAr: 'تسريحة أنيقة مصنوعة من خشب سافيولا الإيطالي الفاخر، تتميز بتصميم راقي وحرفية فائقة.',
    category: 'BEDROOMS' as ProjectCategory,
    location: 'Khorfakkan',
    year: '2024',
  },
  {
    folderName: 'تي في خشب سافيولا ايطالي',
    titleEn: 'Italian Saviola Wood TV Unit',
    titleAr: 'وحدة تلفزيون خشب سافيولا ايطالي',
    descriptionEn: 'Modern TV unit made from Italian Saviola wood with contemporary design and practical storage solutions.',
    descriptionAr: 'وحدة تلفزيون عصرية مصنوعة من خشب سافيولا الإيطالي بتصميم معاصر وحلول تخزين عملية.',
    category: 'MODERN_WOODEN' as ProjectCategory,
    location: 'UAE',
    year: '2024',
  },
  {
    folderName: 'خزانة خشب الفا وود يوناني -الفجيرة مدينة محمد بن زايد',
    titleEn: 'Greek Alpha Wood Wardrobe',
    titleAr: 'خزانة خشب الفا وود يوناني',
    descriptionEn: 'Luxurious wardrobe crafted from Greek Alpha Wood, combining durability with elegant aesthetics.',
    descriptionAr: 'خزانة فاخرة مصنوعة من خشب ألفا وود اليوناني، تجمع بين المتانة والجمال الأنيق.',
    category: 'BEDROOMS' as ProjectCategory,
    location: 'Fujairah - Mohammed Bin Zayed City',
    year: '2025',
  },
  {
    folderName: 'خزانة خشب سالكو اوروبي + بي في سي - خورفكان الحراي',
    titleEn: 'European Salco Wood & PVC Wardrobe',
    titleAr: 'خزانة خشب سالكو اوروبي + بي في سي',
    descriptionEn: 'Premium wardrobe combining European Salco wood with PVC finishes for enhanced durability and modern appearance.',
    descriptionAr: 'خزانة فاخرة تجمع بين خشب سالكو الأوروبي وتشطيبات بي في سي للمتانة المعززة والمظهر العصري.',
    category: 'MODERN_WOODEN' as ProjectCategory,
    location: 'Khorfakkan - Al Harai',
    year: '2023',
  },
  {
    folderName: 'خزانة ملابس خشب الفا وود -خورفكان الحراي',
    titleEn: 'Alpha Wood Clothes Wardrobe',
    titleAr: 'خزانة ملابس خشب الفا وود',
    descriptionEn: 'Spacious clothes wardrobe made from Alpha Wood with smart organization features and elegant finish.',
    descriptionAr: 'خزانة ملابس واسعة مصنوعة من خشب ألفا وود مع ميزات تنظيم ذكية وتشطيب أنيق.',
    category: 'BEDROOMS' as ProjectCategory,
    location: 'Khorfakkan - Al Harai',
    year: '2024',
  },
  {
    folderName: 'خزائن بي في سي -الحراي',
    titleEn: 'PVC Cabinets Collection',
    titleAr: 'خزائن بي في سي',
    descriptionEn: 'Modern PVC cabinets with water-resistant properties and contemporary design, perfect for humid environments.',
    descriptionAr: 'خزائن بي في سي عصرية مقاومة للماء بتصميم معاصر، مثالية للبيئات الرطبة.',
    category: 'MODERN_WOODEN' as ProjectCategory,
    location: 'Al Harai',
    year: '2024',
  },
  {
    folderName: 'سرير تنجيد قماش',
    titleEn: 'Upholstered Fabric Bed',
    titleAr: 'سرير تنجيد قماش',
    descriptionEn: 'Luxurious upholstered bed with premium fabric covering, designed for comfort and elegance.',
    descriptionAr: 'سرير منجد فاخر بتغطية قماش فاخرة، مصمم للراحة والأناقة.',
    category: 'BEDROOMS' as ProjectCategory,
    location: 'UAE',
    year: '2024',
  },
  {
    folderName: 'غرفة غسيل خشب سافيولا ايطالي',
    titleEn: 'Italian Saviola Wood Laundry Room',
    titleAr: 'غرفة غسيل خشب سافيولا ايطالي',
    descriptionEn: 'Functional laundry room designed with Italian Saviola wood, combining practicality with premium aesthetics.',
    descriptionAr: 'غرفة غسيل عملية مصممة بخشب سافيولا الإيطالي، تجمع بين العملية والجمال الفاخر.',
    category: 'MODERN_WOODEN' as ProjectCategory,
    location: 'UAE',
    year: '2025',
  },
  {
    folderName: 'كونسول + تي في الفا وود يوناني -الفجيرة مدينة محمد بن زايد',
    titleEn: 'Greek Alpha Wood Console & TV Unit',
    titleAr: 'كونسول + وحدة تلفزيون الفا وود يوناني',
    descriptionEn: 'Elegant console and TV unit combination crafted from Greek Alpha Wood with seamless design integration.',
    descriptionAr: 'كونسول ووحدة تلفزيون أنيقة مصنوعة من خشب ألفا وود اليوناني بتصميم متكامل.',
    category: 'CLASSIC_WOODEN' as ProjectCategory,
    location: 'Fujairah - Mohammed Bin Zayed City',
    year: '2025',
  },
  {
    folderName: 'مطبخ بي في سي',
    titleEn: 'PVC Kitchen',
    titleAr: 'مطبخ بي في سي',
    descriptionEn: 'Modern PVC kitchen with water-resistant cabinets, easy maintenance, and contemporary styling.',
    descriptionAr: 'مطبخ بي في سي عصري بخزائن مقاومة للماء وصيانة سهلة وتصميم معاصر.',
    category: 'MODERN_WOODEN' as ProjectCategory,
    location: 'UAE',
    year: '2023',
  },
  {
    folderName: 'مطبخ خشب AGT تركي - خورفكان الحراي',
    titleEn: 'Turkish AGT Wood Kitchen',
    titleAr: 'مطبخ خشب AGT تركي',
    descriptionEn: 'Premium kitchen featuring Turkish AGT wood panels, known for durability and elegant wood grain patterns.',
    descriptionAr: 'مطبخ فاخر يتميز بألواح خشب AGT التركي، المعروف بالمتانة وأنماط حبيبات الخشب الأنيقة.',
    category: 'MODERN_WOODEN' as ProjectCategory,
    location: 'Khorfakkan - Al Harai',
    year: '2025',
  },
  {
    folderName: 'مطبخ خشب الفا وود يوناني',
    titleEn: 'Greek Alpha Wood Kitchen',
    titleAr: 'مطبخ خشب الفا وود يوناني',
    descriptionEn: 'Classic kitchen design using Greek Alpha Wood, featuring timeless elegance and superior build quality.',
    descriptionAr: 'تصميم مطبخ كلاسيكي باستخدام خشب ألفا وود اليوناني، يتميز بالأناقة الخالدة وجودة البناء الفائقة.',
    category: 'CLASSIC_WOODEN' as ProjectCategory,
    location: 'UAE',
    year: '2024',
  },
  {
    folderName: 'مطبخ خشب ايجر الماني -الفجيرة مدينة محمد بن زايد',
    titleEn: 'German Egger Wood Kitchen',
    titleAr: 'مطبخ خشب ايجر الماني',
    descriptionEn: 'High-end kitchen constructed with German Egger wood panels, known for precision engineering and durability.',
    descriptionAr: 'مطبخ راقي مصنوع من ألواح خشب ايجر الألماني، المعروف بالهندسة الدقيقة والمتانة.',
    category: 'MODERN_WOODEN' as ProjectCategory,
    location: 'Fujairah - Mohammed Bin Zayed City',
    year: '2025',
  },
  {
    folderName: 'مطبخ خشب سافيولا ايطالي',
    titleEn: 'Italian Saviola Wood Kitchen',
    titleAr: 'مطبخ خشب سافيولا ايطالي',
    descriptionEn: 'Luxurious kitchen featuring Italian Saviola wood panels with premium finishes and modern functionality.',
    descriptionAr: 'مطبخ فاخر يتميز بألواح خشب سافيولا الإيطالي بتشطيبات فاخرة ووظائف عصرية.',
    category: 'MODERN_WOODEN' as ProjectCategory,
    location: 'UAE',
    year: '2024',
  },
  {
    folderName: 'مطبخ فل المنيوم',
    titleEn: 'Full Aluminum Kitchen',
    titleAr: 'مطبخ فل المنيوم',
    descriptionEn: 'Complete aluminum kitchen system with modern design, excellent durability, and easy maintenance.',
    descriptionAr: 'نظام مطبخ المنيوم كامل بتصميم عصري ومتانة ممتازة وصيانة سهلة.',
    category: 'ALUMINUM' as ProjectCategory,
    location: 'UAE',
    year: '2024',
  },
  {
    folderName: 'مغسلة حمام كوارتز مع خشب الفا وود يوناني',
    titleEn: 'Quartz Bathroom Vanity with Greek Alpha Wood',
    titleAr: 'مغسلة حمام كوارتز مع خشب الفا وود يوناني',
    descriptionEn: 'Elegant bathroom vanity combining quartz countertop with Greek Alpha Wood cabinetry.',
    descriptionAr: 'مغسلة حمام أنيقة تجمع بين سطح كوارتز وخزائن خشب ألفا وود اليوناني.',
    category: 'MODERN_WOODEN' as ProjectCategory,
    location: 'UAE',
    year: '2025',
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

function getGallerySize(index: number, total: number): GallerySize {
  if (index === 0) return 'LARGE';
  if (total > 5 && index < 3) return 'MEDIUM';
  if (index % 4 === 0) return 'WIDE';
  return 'MEDIUM';
}

async function main() {
  console.log('Starting seed of new projects...\n');

  const basePath = 'd:/wbsite/kitchen-core/public/صور أعمال كيتشن كور';

  // Get existing project count for order
  const existingCount = await prisma.project.count();
  const existingGalleryCount = await prisma.galleryImage.count();

  let projectOrder = existingCount;
  let galleryOrder = existingGalleryCount;

  for (const projectData of projectsData) {
    const folderPath = path.join(basePath, projectData.folderName);

    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
      console.log(`Folder not found: ${projectData.folderName}`);
      continue;
    }

    // Get all images in folder
    const files = fs.readdirSync(folderPath).filter(f =>
      /\.(jpg|jpeg|png|webp)$/i.test(f)
    );

    if (files.length === 0) {
      console.log(`No images found in: ${projectData.folderName}`);
      continue;
    }

    // Create URL-safe folder path
    const encodedFolderName = encodeURIComponent(projectData.folderName);
    const imageUrls = files.map(f => `/صور أعمال كيتشن كور/${encodedFolderName}/${encodeURIComponent(f)}`);

    const slug = slugify(projectData.titleEn) + '-' + Date.now().toString().slice(-6);

    // Create project
    try {
      const project = await prisma.project.create({
        data: {
          titleEn: projectData.titleEn,
          titleAr: projectData.titleAr,
          slug: slug,
          location: projectData.location,
          category: projectData.category,
          image: imageUrls[0],
          gallery: imageUrls,
          descriptionEn: projectData.descriptionEn,
          descriptionAr: projectData.descriptionAr,
          year: projectData.year,
          area: 'Custom',
          budget: 'Premium',
          materials: [projectData.titleAr.split(' ')[1] || 'Wood'], // Extract material type
          appliances: [],
          features: ['Custom Design', 'Premium Materials', 'Professional Installation'],
          duration: '2-4 weeks',
          challengesEn: '',
          challengesAr: '',
          innovations: ['Premium Craftsmanship'],
          featured: projectOrder < existingCount + 3, // Feature first 3 new projects
          order: projectOrder++,
          published: true,
        },
      });

      console.log(`Created project: ${projectData.titleEn} (${files.length} images)`);

      // Also add images to Gallery
      for (let i = 0; i < imageUrls.length; i++) {
        await prisma.galleryImage.create({
          data: {
            titleEn: `${projectData.titleEn} - Image ${i + 1}`,
            titleAr: `${projectData.titleAr} - صورة ${i + 1}`,
            image: imageUrls[i],
            category: projectData.category,
            location: projectData.location,
            size: getGallerySize(i, imageUrls.length),
            descriptionEn: projectData.descriptionEn,
            descriptionAr: projectData.descriptionAr,
            order: galleryOrder++,
            published: true,
          },
        });
      }

      console.log(`  Added ${imageUrls.length} images to gallery`);

    } catch (error) {
      console.error(`Error creating project ${projectData.titleEn}:`, error);
    }
  }

  console.log('\nSeed completed!');

  // Show summary
  const totalProjects = await prisma.project.count();
  const totalGallery = await prisma.galleryImage.count();
  console.log(`Total projects: ${totalProjects}`);
  console.log(`Total gallery images: ${totalGallery}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
