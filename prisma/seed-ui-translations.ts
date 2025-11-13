import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const uiTranslations = [
  // Navigation
  {
    key: "navigation.home",
    category: "navigation",
    textEn: "Home",
    textAr: "الرئيسية",
    description: "Navigation link for home page",
  },
  {
    key: "navigation.portfolio",
    category: "navigation",
    textEn: "Portfolio",
    textAr: "المشاريع",
    description: "Navigation link for portfolio",
  },
  {
    key: "navigation.about",
    category: "navigation",
    textEn: "About",
    textAr: "من نحن",
    description: "Navigation link for about page",
  },
  {
    key: "navigation.contact",
    category: "navigation",
    textEn: "Contact",
    textAr: "اتصل بنا",
    description: "Navigation link for contact",
  },

  // Portfolio Section
  {
    key: "portfolio.badge",
    category: "portfolio",
    textEn: "Featured Projects",
    textAr: "المشاريع المميزة",
    description: "Portfolio section badge",
  },
  {
    key: "portfolio.title",
    category: "portfolio",
    textEn: "Engineering Excellence",
    textAr: "التميز الهندسي",
    description: "Portfolio section main title",
  },
  {
    key: "portfolio.description",
    category: "portfolio",
    textEn:
      "Each project showcases our technical expertise, innovative solutions, and uncompromising commitment to quality. Explore the details.",
    textAr:
      "كل مشروع يعرض خبرتنا الفنية، والحلول المبتكرة، والالتزام الذي لا يتزعزع بالجودة. استكشف التفاصيل.",
    description: "Portfolio section description",
  },
  {
    key: "portfolio.viewDetails",
    category: "portfolio",
    textEn: "View Details",
    textAr: "عرض التفاصيل",
    description: "View details button",
  },
  {
    key: "portfolio.completionTime",
    category: "portfolio",
    textEn: "Completion Time",
    textAr: "وقت الإنجاز",
    description: "Completion time label",
  },
  {
    key: "portfolio.technicalSpecs",
    category: "portfolio",
    textEn: "Technical Specifications",
    textAr: "المواصفات الفنية",
    description: "Technical specifications heading",
  },
  {
    key: "portfolio.materials",
    category: "portfolio",
    textEn: "Materials",
    textAr: "المواد",
    description: "Materials section label",
  },
  {
    key: "portfolio.appliances",
    category: "portfolio",
    textEn: "Appliances",
    textAr: "الأجهزة",
    description: "Appliances section label",
  },
  {
    key: "portfolio.keyFeatures",
    category: "portfolio",
    textEn: "Key Features",
    textAr: "المميزات الرئيسية",
    description: "Key features section label",
  },
  {
    key: "portfolio.innovations",
    category: "portfolio",
    textEn: "Innovations",
    textAr: "الابتكارات",
    description: "Innovations section label",
  },
  {
    key: "portfolio.engineeringChallenge",
    category: "portfolio",
    textEn: "Engineering Challenge",
    textAr: "التحدي الهندسي",
    description: "Engineering challenge section label",
  },

  // Project Categories
  {
    key: "categories.all.title",
    category: "categories",
    textEn: "All",
    textAr: "الكل",
    description: "All categories filter",
  },
  {
    key: "categories.modernWooden.title",
    category: "categories",
    textEn: "Modern Wooden Kitchens",
    textAr: "مطابخ عصرية - خشب",
    description: "Modern wooden kitchens category",
  },
  {
    key: "categories.modernWooden.slogan",
    category: "categories",
    textEn:
      "Precise design and smart details — elegant simplicity with functionality that fits modern living.",
    textAr:
      "تصميم دقيق، تفاصيل ذكية — فخامة الخطوط البسيطة، وظائف تلائم أسلوب الحياة الحديث.",
    description: "Modern wooden kitchens slogan",
  },
  {
    key: "categories.classicWooden.title",
    category: "categories",
    textEn: "Classic Wooden Kitchens",
    textAr: "مطابخ كلاسيك - خشب",
    description: "Classic wooden kitchens category",
  },
  {
    key: "categories.classicWooden.slogan",
    category: "categories",
    textEn:
      "Timeless elegance — luxurious details that express warmth and sophistication.",
    textAr: "أناقة تُحاكي الزمن — تفاصيل فاخرة وحضور يعبّر عن الرقيّ والدفء.",
    description: "Classic wooden kitchens slogan",
  },
  {
    key: "categories.aluminum.title",
    category: "categories",
    textEn: "Aluminum Kitchens",
    textAr: "مطابخ ألومنيوم",
    description: "Aluminum kitchens category",
  },
  {
    key: "categories.aluminum.slogan",
    category: "categories",
    textEn:
      "A lasting practical solution — durable designs that deliver beauty without maintenance.",
    textAr:
      "حلّ عملي يدوم — مقاومة للعوامل، بخيارات تصميم تمنحك جمالًا بلا صيانة.",
    description: "Aluminum kitchens slogan",
  },
  {
    key: "categories.bedrooms.title",
    category: "categories",
    textEn: "Bedrooms & Wardrobes",
    textAr: "غرف النوم والملابس",
    description: "Bedrooms category",
  },
  {
    key: "categories.bedrooms.slogan",
    category: "categories",
    textEn:
      "Spaces that reflect your style — smart organization giving every piece its place for an easier start every day.",
    textAr:
      "مساحات تعكس أسلوبك — تنظيم ذكي يمنح كل قطعة مكانها.. كل يوم بداية أسهل.",
    description: "Bedrooms slogan",
  },

  // Footer
  {
    key: "footer.copyright",
    category: "footer",
    textEn: "© 2025 Kitchen Core. All rights reserved.",
    textAr: "© 2025 Kitchen Core. جميع الحقوق محفوظة.",
    description: "Footer copyright text",
  },
  {
    key: "footer.privacy",
    category: "footer",
    textEn: "Privacy",
    textAr: "الخصوصية",
    description: "Footer privacy link",
  },
  {
    key: "footer.terms",
    category: "footer",
    textEn: "Terms",
    textAr: "الشروط",
    description: "Footer terms link",
  },
  {
    key: "footer.quickLinks",
    category: "footer",
    textEn: "Quick Links",
    textAr: "روابط سريعة",
    description: "Footer quick links heading",
  },
  {
    key: "footer.followUs",
    category: "footer",
    textEn: "Follow Us",
    textAr: "تابعنا",
    description: "Footer follow us heading",
  },
  {
    key: "footer.description",
    category: "footer",
    textEn:
      "Luxury kitchen design specialists for palaces, villas, and premium estates",
    textAr: "متخصصون في تصميم المطابخ الفاخرة للقصور والفلل والعقارات الراقية",
    description: "Footer description text",
  },

  // Video Showcase
  {
    key: "videoShowcase.badge",
    category: "video",
    textEn: "Video Showcase",
    textAr: "عرض الفيديو",
    description: "Video showcase badge",
  },
  {
    key: "videoShowcase.title",
    category: "video",
    textEn: "Experience",
    textAr: "تجربة",
    description: "Video showcase title",
  },
  {
    key: "videoShowcase.titleHighlight",
    category: "video",
    textEn: "Excellence",
    textAr: "التميز",
    description: "Video showcase title highlight",
  },
  {
    key: "videoShowcase.description",
    category: "video",
    textEn:
      "Watch our kitchen transformations come to life. See the quality, precision, and attention to detail that defines Kitchen Core.",
    textAr:
      "شاهد تحولات مطابخنا تنبض بالحياة. اطلع على الجودة والدقة والاهتمام بالتفاصيل التي تميز Kitchen Core.",
    description: "Video showcase description",
  },
  {
    key: "videoShowcase.ctaTitle",
    category: "video",
    textEn: "Ready to Transform Your",
    textAr: "هل أنت مستعد لتحويل",
    description: "Video CTA title",
  },
  {
    key: "videoShowcase.ctaTitleHighlight",
    category: "video",
    textEn: "Kitchen?",
    textAr: "مطبخك؟",
    description: "Video CTA title highlight",
  },
  {
    key: "videoShowcase.ctaDescription",
    category: "video",
    textEn:
      "Experience the perfect blend of durability and elegance. Our aluminum structures and PVC finishes ensure your kitchen stays beautiful for years to come.",
    textAr:
      "اختبر المزيج المثالي بين المتانة والأناقة. هياكلنا الألمنيوم والتشطيبات بـ PVC تضمن بقاء مطبخك جميلاً لسنوات قادمة.",
    description: "Video CTA description",
  },
  {
    key: "videoShowcase.ctaButton",
    category: "video",
    textEn: "Start Your Project",
    textAr: "ابدأ مشروعك",
    description: "Video CTA button",
  },

  // Hero Section
  {
    key: "hero.badge",
    category: "hero",
    textEn: "Luxury Kitchen Specialists",
    textAr: "متخصصون في المطابخ الفاخرة",
    description: "Hero badge text",
  },
  {
    key: "hero.title",
    category: "hero",
    textEn: "Distinctive",
    textAr: "تفرّد",
    description: "Hero title",
  },
  {
    key: "hero.titleHighlight",
    category: "hero",
    textEn: "Elegance",
    textAr: "بأناقة",
    description: "Hero title highlight",
  },
  {
    key: "hero.description",
    category: "hero",
    textEn:
      "We offer complete kitchen solutions designed to fit every space and meet every expectation — from refined luxury to smart practicality.",
    textAr:
      "نقدّم حلول مطابخ متكاملة تُصمَّم لتناسب كل مساحة وتلبي كل توقّع — من الفخامة الراقية إلى العملية الذكية.",
    description: "Hero description",
  },
  {
    key: "hero.viewProjects",
    category: "hero",
    textEn: "View Projects",
    textAr: "عرض المشاريع",
    description: "View projects button",
  },
  {
    key: "hero.startProject",
    category: "hero",
    textEn: "Start Your Project",
    textAr: "ابدأ مشروعك",
    description: "Start project button",
  },
  {
    key: "hero.scroll",
    category: "hero",
    textEn: "Scroll",
    textAr: "تمرير",
    description: "Scroll indicator text",
  },

  // Stats
  {
    key: "stats.kitchens",
    category: "stats",
    textEn: "Luxury Kitchens",
    textAr: "مطبخ فاخر",
    description: "Kitchens stat label",
  },
  {
    key: "stats.countries",
    category: "stats",
    textEn: "Countries",
    textAr: "دولة",
    description: "Countries stat label",
  },
  {
    key: "stats.experience",
    category: "stats",
    textEn: "Years Excellence",
    textAr: "سنة من التميز",
    description: "Experience stat label",
  },
  {
    key: "stats.satisfaction",
    category: "stats",
    textEn: "Client Satisfaction",
    textAr: "رضا العملاء",
    description: "Satisfaction stat label",
  },

  // About Section
  {
    key: "about.badge",
    category: "about",
    textEn: "Our Philosophy",
    textAr: "فلسفتنا",
    description: "About section badge",
  },
  {
    key: "about.title",
    category: "about",
    textEn: "Creating Solutions That Fit Your Vision",
    textAr: "نبتكر حلولاً تناسب رؤيتك",
    description: "About section title",
  },

  // Contact Section
  {
    key: "contact.badge",
    category: "contact",
    textEn: "Begin Your Journey",
    textAr: "ابدأ رحلتك",
    description: "Contact section badge",
  },
  {
    key: "contact.title",
    category: "contact",
    textEn: "Let's Create Your Dream Kitchen",
    textAr: "لنصنع مطبخ أحلامك",
    description: "Contact section title",
  },
];

async function main() {
  console.log("Seeding UI translations...");

  for (const translation of uiTranslations) {
    await prisma.uITranslation.upsert({
      where: { key: translation.key },
      update: {
        textEn: translation.textEn,
        textAr: translation.textAr,
        description: translation.description,
      },
      create: translation,
    });
  }

  console.log(`✅ Seeded ${uiTranslations.length} UI translations`);
}

main()
  .catch((e) => {
    console.error("Error seeding UI translations:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
