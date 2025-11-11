import { PrismaClient, ProjectCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seed...');

  // Clean existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Cleaning existing data...');
  await prisma.project.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.statistic.deleteMany({});

  // 1. Company Information (Singleton)
  console.log('📝 Creating company information...');
  const company = await prisma.company.create({
    data: {
      nameEn: 'Kitchen Core',
      nameAr: 'كيتشن كور',
      taglineEn: 'Distinctive Elegance',
      taglineAr: 'تفرّد بأناقة',
      descriptionEn:
        'For over fifteen years, we\'ve been transforming ideas into exceptional spaces — we listen, understand, and design beyond expectations.',
      descriptionAr:
        'منذ أكثر من خمسة عشر عاماً، نحوّل الأفكار إلى مساحات استثنائية — نستمع، نفهم، ونصمم بما يتجاوز التوقعات.',
      missionEn:
        'We listen to your vision, understand your challenges, and create design solutions that fit your space and lifestyle — every project is unique, every detail is thoughtful.',
      missionAr:
        'نستمع لرؤيتك، نفهم تحدياتك، ونبتكر حلولاً تصميمية تناسب مساحتك وأسلوب حياتك — كل مشروع فريد، كل تفصيلة مدروسة.',
      visionEn:
        'To be the first choice for those seeking innovative design and professional execution — we build long-term relationships with our clients through quality, commitment, and creativity.',
      visionAr:
        'أن نكون الخيار الأول لمن يبحث عن تصميم مبتكر وتنفيذ احترافي — نبني علاقات طويلة الأمد مع عملائنا من خلال الجودة والالتزام والإبداع.',
      valuesEn: [
        'Excellence in every detail',
        'Timeless design philosophy',
        'Sustainable luxury',
        'Client-centric approach',
        'Continuous innovation',
      ],
      valuesAr: [
        'التميز في كل التفاصيل',
        'فلسفة التصميم الخالدة',
        'الفخامة المستدامة',
        'نهج يركز على العميل',
        'الابتكار المستمر',
      ],
      foundedYear: '2009',
      employeeCount: '25+',
      projectsCompleted: '150+',
      countriesServed: '25+',
      yearsOfExperience: '15+',
      phone: '+971 4 XXX XXXX',
      email: 'design@kitchencore.com',
      instagramUrl: 'https://instagram.com/kitchen_core_uae',
      published: true,
    },
  });

  // 2. Statistics for Trust Markers
  console.log('📊 Creating statistics...');
  await prisma.statistic.createMany({
    data: [
      {
        number: '150+',
        labelEn: 'Luxury Kitchens',
        labelAr: 'مطبخ فاخر',
        section: 'HOMEPAGE_TRUST',
        order: 1,
      },
      {
        number: '25+',
        labelEn: 'Countries',
        labelAr: 'دولة',
        section: 'HOMEPAGE_TRUST',
        order: 2,
      },
      {
        number: '15',
        labelEn: 'Years Excellence',
        labelAr: 'سنة من التميز',
        section: 'HOMEPAGE_TRUST',
        order: 3,
      },
      {
        number: '100%',
        labelEn: 'Client Satisfaction',
        labelAr: 'رضا العملاء',
        section: 'HOMEPAGE_TRUST',
        order: 4,
      },
    ],
  });

  // 3. Projects - Sample projects for each category
  console.log('🏠 Creating sample projects...');

  // Modern Wooden Kitchen Projects
  await prisma.project.create({
    data: {
      titleEn: 'Contemporary Wooden Kitchen - Villa Marina',
      titleAr: 'مطبخ خشبي عصري - فيلا مارينا',
      slug: 'modern-wooden-villa-marina',
      location: 'Dubai, UAE',
      category: ProjectCategory.MODERN_WOODEN,
      image: '/projects/modern-1.jpg',
      gallery: ['/projects/modern-1.jpg', '/projects/modern-1-2.jpg'],
      descriptionEn:
        'A stunning modern wooden kitchen featuring clean lines and smart details. The design emphasizes simplicity with high functionality, perfect for contemporary lifestyle.',
      descriptionAr:
        'مطبخ خشبي عصري مذهل يتميز بخطوط نظيفة وتفاصيل ذكية. التصميم يركز على البساطة مع وظائف عالية، مثالي لأسلوب الحياة العصري.',
      year: '2024',
      area: '45 sqm',
      budget: 'Premium',
      materials: ['Premium Wood', 'Quartz Countertops', 'Smart Storage Systems'],
      appliances: ['Built-in Oven', 'Induction Cooktop', 'Integrated Refrigerator'],
      features: ['Smart Lighting', 'Soft-Close Drawers', 'Hidden Storage'],
      duration: '6 weeks',
      challengesEn: 'Maximizing storage in a compact space while maintaining aesthetic appeal.',
      challengesAr: 'تعظيم التخزين في مساحة مدمجة مع الحفاظ على الجاذبية الجمالية.',
      innovations: ['Custom pull-out pantry', 'Integrated LED lighting', 'Modular shelving'],
      featured: true,
      order: 1,
      published: true,
    },
  });

  // Classic Wooden Kitchen Projects
  await prisma.project.create({
    data: {
      titleEn: 'Timeless Classic Kitchen - Royal Estate',
      titleAr: 'مطبخ كلاسيكي خالد - العقار الملكي',
      slug: 'classic-wooden-royal-estate',
      location: 'Abu Dhabi, UAE',
      category: ProjectCategory.CLASSIC_WOODEN,
      image: '/projects/classic-1.jpg',
      gallery: ['/projects/classic-1.jpg', '/projects/classic-1-2.jpg'],
      descriptionEn:
        'An elegant classic wooden kitchen that captures timeless beauty with luxurious details expressing sophistication and warmth.',
      descriptionAr:
        'مطبخ خشبي كلاسيكي أنيق يلتقط الجمال الخالد مع تفاصيل فاخرة تعبر عن الرقي والدفء.',
      year: '2024',
      area: '65 sqm',
      budget: 'Luxury',
      materials: ['Premium Hardwood', 'Marble Countertops', 'Brass Fixtures'],
      appliances: ['Professional Range', 'Double Oven', 'Wine Cooler'],
      features: ['Crown Molding', 'Glass Cabinets', 'Island Seating'],
      duration: '8 weeks',
      challengesEn: 'Blending traditional aesthetics with modern functionality.',
      challengesAr: 'مزج الجماليات التقليدية مع الوظائف الحديثة.',
      innovations: ['Custom carved details', 'Hidden appliances', 'Smart ventilation'],
      featured: true,
      order: 2,
      published: true,
    },
  });

  // Aluminum Kitchen Projects
  await prisma.project.create({
    data: {
      titleEn: 'Modern Aluminum Kitchen - Urban Loft',
      titleAr: 'مطبخ ألومنيوم عصري - لوفت حضري',
      slug: 'aluminum-kitchen-urban-loft',
      location: 'Dubai Marina, UAE',
      category: ProjectCategory.ALUMINUM,
      image: '/projects/aluminum-1.jpg',
      gallery: ['/projects/aluminum-1.jpg', '/projects/aluminum-1-2.jpg'],
      descriptionEn:
        'A practical lasting solution with weather-resistant design options that deliver beauty without maintenance.',
      descriptionAr:
        'حل عملي يدوم مع خيارات تصميم مقاومة للعوامل تمنحك جمالاً بلا صيانة.',
      year: '2024',
      area: '40 sqm',
      budget: 'Mid-Range',
      materials: ['Aluminum Frames', 'Quartz Countertops', 'PVC Finish'],
      appliances: ['Built-in Cooktop', 'Modern Hood', 'Compact Oven'],
      features: ['Weather Resistant', 'Easy Maintenance', 'Durable Finish'],
      duration: '4 weeks',
      challengesEn: 'Creating a sleek modern look while ensuring durability in humid conditions.',
      challengesAr: 'إنشاء مظهر عصري أنيق مع ضمان المتانة في الظروف الرطبة.',
      innovations: ['Double-sheet aluminum doors', 'Moisture-resistant coating', 'Integrated drainage'],
      featured: true,
      order: 3,
      published: true,
    },
  });

  // Bedroom & Wardrobe Projects
  await prisma.project.create({
    data: {
      titleEn: 'Master Suite - Smart Organization',
      titleAr: 'جناح رئيسي - تنظيم ذكي',
      slug: 'bedroom-wardrobe-master-suite',
      location: 'Sharjah, UAE',
      category: ProjectCategory.BEDROOMS,
      image: '/projects/bedroom-1.jpg',
      gallery: ['/projects/bedroom-1.jpg', '/projects/bedroom-1-2.jpg'],
      descriptionEn:
        'Spaces that reflect your style with smart organization giving every piece its place for an easier start every day.',
      descriptionAr:
        'مساحات تعكس أسلوبك مع تنظيم ذكي يمنح كل قطعة مكانها لبداية أسهل كل يوم.',
      year: '2024',
      area: '35 sqm',
      budget: 'Premium',
      materials: ['Premium Wood', 'Soft-Close Mechanisms', 'LED Lighting'],
      appliances: ['Integrated Mirror', 'Built-in Dresser', 'Smart Lighting'],
      features: ['Walk-in Closet', 'Custom Shelving', 'Jewelry Drawers'],
      duration: '5 weeks',
      challengesEn: 'Maximizing wardrobe space while creating a luxurious ambiance.',
      challengesAr: 'تعظيم مساحة الخزانة مع خلق جو فاخر.',
      innovations: ['Rotating shoe rack', 'Pull-out accessories tray', 'Smart mirror lighting'],
      featured: true,
      order: 4,
      published: true,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`   - Company: ${company.nameEn}`);
  console.log(`   - Statistics: 4 items`);
  console.log(`   - Projects: 4 items (1 per category)`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
