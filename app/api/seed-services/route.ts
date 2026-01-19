import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProjectCategory } from "@prisma/client";

// Modern Wood Images
const modernWoodImages = [
  "/صور المطابخ العصرية/04cc5592-d3e3-4127-a6ce-0ddeca503bda.jpg",
  "/صور المطابخ العصرية/059476a3-0703-4c77-9974-90cff95ae7c2.jpg",
  "/صور المطابخ العصرية/10b26ef0-fc76-4f1b-a106-abc637ce8f7c.jpg",
  "/صور المطابخ العصرية/128ddb7e-e05c-4f96-a892-92ee8ad469fa.jpg",
  "/صور المطابخ العصرية/166c23c4-6da8-436c-ac48-9ee3c19a3ac7.jpg",
  "/صور المطابخ العصرية/1d889be0-549f-43b6-9f39-b5b63beefa97.jpg",
  "/صور المطابخ العصرية/239d5db4-6f1e-4d44-a207-c38b4b0d6eff.jpg",
  "/صور المطابخ العصرية/23ab572b-cd70-4145-851b-85079dcfc22b.jpg",
  "/صور المطابخ العصرية/25497d6e-b2bd-4f0e-8f8d-a26e3d9111be.jpg",
  "/صور المطابخ العصرية/320bc068-aa45-41e9-bb09-419bb769191e.jpg",
];

// Classic Wood Images
const classicWoodImages = [
  "/صور مطابخ الكلاسيك/0ffc8595-78ff-4e27-87ea-06531654926b.jpg",
  "/صور مطابخ الكلاسيك/486b8483-6daa-4551-949f-330e5261066c.jpg",
  "/صور مطابخ الكلاسيك/97fe6a18-2e1f-4093-8847-24eabf87b809.jpg",
  "/صور مطابخ الكلاسيك/f55050f3-494c-48ae-989e-63f027f70474.jpg",
];

// Aluminum Images
const aluminumImages = [
  "/صور مطابخ الألومنيوم/3752c5da-5463-42ff-a383-fd92f6ca9ff7.jpg",
  "/صور مطابخ الألومنيوم/72b67059-2e64-4e01-900d-851f175389e5.jpg",
  "/صور مطابخ الألومنيوم/aeb76f0b-5480-4010-868e-8dbef969d55d.jpg",
  "/صور مطابخ الألومنيوم/c478db8c-e49c-47c0-917a-5a11cb5fc664.jpg",
  "/صور مطابخ الألومنيوم/c4b57357-7d17-493c-813c-728593b15207.jpg",
  "/صور مطابخ الألومنيوم/edea8ca0-ca7c-4631-9c04-5032e726c03c.jpg",
];

// Bedroom Images
const bedroomImages = [
  "/Bedrooms & Wardrobes/1.jpeg",
  "/Bedrooms & Wardrobes/2.jpeg",
  "/Bedrooms & Wardrobes/4.jpeg",
  "/Bedrooms & Wardrobes/5.jpeg",
  "/Bedrooms & Wardrobes/6.jpeg",
  "/Bedrooms & Wardrobes/7.jpeg",
  "/Bedrooms & Wardrobes/8.jpeg",
  "/Bedrooms & Wardrobes/9.jpeg",
  "/Bedrooms & Wardrobes/10.jpeg",
  "/Bedrooms & Wardrobes/11.jpeg",
];

// Product Services Data
const productServicesData = [
  {
    slug: "modern-kitchens-wood",
    categoryKey: "modernWood",
    dbCategory: ProjectCategory.MODERN_WOODEN,
    titleEn: "Modern Kitchens – Wood",
    titleAr: "مطابخ عصرية - خشب",
    taglineEn: "Precise design, smart details.",
    taglineAr: "تصميم دقيق، تفاصيل ذكية.",
    descriptionEn:
      "The luxury of clean lines and functionality that suits a modern lifestyle. Our modern wooden kitchens combine contemporary aesthetics with premium craftsmanship for spaces that inspire everyday living.",
    descriptionAr:
      "فخامة الخطوط النظيفة والوظائف العملية التي تناسب أسلوب الحياة العصري. مطابخنا الخشبية العصرية تجمع بين الجماليات المعاصرة والحرفية الفاخرة لمساحات تلهم الحياة اليومية.",
    heroImage: modernWoodImages[0],
    featuresEn: [
      "Premium European wood materials",
      "Soft-close mechanisms on all doors",
      "LED integrated lighting",
      "High-quality German hinges",
      "Custom storage solutions",
      "Water-resistant finishes",
    ],
    featuresAr: [
      "خامات خشب أوروبية فاخرة",
      "آلية إغلاق ناعم لجميع الأبواب",
      "إضاءة LED مدمجة",
      "مفصلات ألمانية عالية الجودة",
      "حلول تخزين مخصصة",
      "تشطيبات مقاومة للماء",
    ],
    benefitsEn: [
      "Clean, minimalist aesthetics",
      "Maximum functionality",
      "Easy maintenance",
      "Long-lasting durability",
    ],
    benefitsAr: [
      "جماليات نظيفة وبسيطة",
      "أقصى قدر من الوظائف",
      "سهولة الصيانة",
      "متانة طويلة الأمد",
    ],
    images: modernWoodImages,
    order: 1,
  },
  {
    slug: "classic-kitchens-wood",
    categoryKey: "classicWood",
    dbCategory: ProjectCategory.CLASSIC_WOODEN,
    titleEn: "Classic Kitchens – Wood",
    titleAr: "مطابخ كلاسيك - خشب",
    taglineEn: "Timeless elegance.",
    taglineAr: "أناقة خالدة.",
    descriptionEn:
      "Luxurious details and a presence that reflects sophistication and warmth. Classic wooden kitchens that bring heritage craftsmanship into your home with enduring beauty that stands the test of time.",
    descriptionAr:
      "تفاصيل فاخرة وحضور يعكس الرقي والدفء. مطابخ خشبية كلاسيكية تجلب حرفية التراث إلى منزلك بجمال يدوم يصمد أمام اختبار الزمن.",
    heroImage: classicWoodImages[0],
    featuresEn: [
      "Solid wood cabinet construction",
      "Hand-crafted decorative details",
      "Traditional joinery techniques",
      "Premium lacquer finishes",
      "Ornate hardware options",
      "Crown molding integration",
    ],
    featuresAr: [
      "خزائن من الخشب الصلب",
      "تفاصيل زخرفية مصنوعة يدوياً",
      "تقنيات نجارة تقليدية",
      "تشطيبات ورنيش فاخرة",
      "خيارات أجهزة مزخرفة",
      "تكامل الكورنيش",
    ],
    benefitsEn: [
      "Timeless elegance",
      "Heritage craftsmanship",
      "Warm, inviting atmosphere",
      "Appreciates in value",
    ],
    benefitsAr: [
      "أناقة خالدة",
      "حرفية تراثية",
      "أجواء دافئة ومرحبة",
      "تزداد قيمتها مع الوقت",
    ],
    images: classicWoodImages,
    order: 2,
  },
  {
    slug: "aluminum-kitchens",
    categoryKey: "aluminum",
    dbCategory: ProjectCategory.ALUMINUM,
    titleEn: "Aluminum Kitchens",
    titleAr: "مطابخ ألومنيوم",
    taglineEn: "A practical solution that lasts.",
    taglineAr: "حل عملي يدوم.",
    descriptionEn:
      "Resistant to external factors, with design options that give you beauty without maintenance. Perfect for modern homes seeking durability, hygiene, and timeless style.",
    descriptionAr:
      "مقاومة للعوامل الخارجية، مع خيارات تصميم تمنحك الجمال بدون صيانة. مثالية للمنازل العصرية التي تبحث عن المتانة والنظافة والأناقة الخالدة.",
    heroImage: aluminumImages[0],
    featuresEn: [
      "100% aluminum construction",
      "Waterproof & rust-resistant",
      "Termite-proof material",
      "Easy to clean surfaces",
      "Heat-resistant panels",
      "Eco-friendly & recyclable",
    ],
    featuresAr: [
      "هيكل ألومنيوم 100%",
      "مقاوم للماء والصدأ",
      "مادة مقاومة للنمل الأبيض",
      "أسطح سهلة التنظيف",
      "ألواح مقاومة للحرارة",
      "صديق للبيئة وقابل لإعادة التدوير",
    ],
    benefitsEn: [
      "Zero maintenance required",
      "Lifetime durability",
      "Perfect for humid climates",
      "Cost-effective long-term",
    ],
    benefitsAr: [
      "لا تحتاج صيانة",
      "متانة مدى الحياة",
      "مثالية للمناخات الرطبة",
      "فعالة من حيث التكلفة على المدى الطويل",
    ],
    images: aluminumImages,
    order: 3,
  },
  {
    slug: "bedrooms-wardrobes",
    categoryKey: "bedrooms",
    dbCategory: ProjectCategory.BEDROOMS,
    titleEn: "Bedrooms & Wardrobes",
    titleAr: "غرف النوم وخزائن الملابس",
    taglineEn: "Spaces that reflect your style.",
    taglineAr: "مساحات تعكس أسلوبك.",
    descriptionEn:
      "Smart organization that gives every item its place, making every day an easier start. Custom wardrobes and bedroom furniture designed to maximize space and enhance your daily lifestyle.",
    descriptionAr:
      "تنظيم ذكي يمنح كل قطعة مكانها، مما يجعل كل يوم بداية أسهل. خزائن ملابس وأثاث غرف نوم مصممة لتعظيم المساحة وتحسين أسلوب حياتك اليومي.",
    heroImage: bedroomImages[0],
    featuresEn: [
      "Custom-fit wardrobe systems",
      "Integrated LED lighting",
      "Soft-close drawer mechanisms",
      "Premium fabric upholstery",
      "Accessory organizers included",
      "Full-length mirrors available",
    ],
    featuresAr: [
      "أنظمة خزائن ملابس مخصصة",
      "إضاءة LED مدمجة",
      "آليات أدراج بإغلاق ناعم",
      "تنجيد قماش فاخر",
      "منظمات إكسسوارات مضمنة",
      "مرايا بطول كامل متاحة",
    ],
    benefitsEn: [
      "Maximized storage space",
      "Personalized organization",
      "Premium aesthetics",
      "Enhanced daily routine",
    ],
    benefitsAr: [
      "مساحة تخزين قصوى",
      "تنظيم شخصي",
      "جماليات فاخرة",
      "روتين يومي محسّن",
    ],
    images: bedroomImages,
    order: 4,
  },
];

// Customer Services Data
const customerServicesData = [
  {
    slug: "site-inspection",
    icon: "MapPin",
    titleEn: "Site Inspection & Measurements",
    titleAr: "معاينة الموقع والقياسات",
    taglineEn: "The first step to your perfect kitchen",
    taglineAr: "الخطوة الأولى نحو مطبخك المثالي",
    descriptionEn:
      "Book an appointment for our team to visit your site and take precise measurements.",
    descriptionAr:
      "احجز موعداً لفريقنا لزيارة موقعك وأخذ القياسات الدقيقة.",
    image: modernWoodImages[0],
    stepsEn: ["Book appointment", "Team visits", "Measurements taken", "Assessment provided"],
    stepsAr: ["احجز موعد", "يزور فريقنا", "يتم أخذ القياسات", "يتم تقديم التقييم"],
    benefitsEn: ["Free service", "Expert assessment", "Personalized recommendations"],
    benefitsAr: ["خدمة مجانية", "تقييم من خبراء", "توصيات شخصية"],
    order: 1,
  },
  {
    slug: "design-consultation",
    icon: "Palette",
    titleEn: "Design Consultation",
    titleAr: "استشارة التصميم",
    taglineEn: "Bring your vision to life",
    taglineAr: "حوّل رؤيتك إلى واقع",
    descriptionEn: "Meet with our designers to discuss your vision and create your perfect design.",
    descriptionAr: "قابل مصممينا لمناقشة رؤيتك وإنشاء تصميمك المثالي.",
    image: modernWoodImages[1],
    stepsEn: ["Share ideas", "Review options", "3D visualization", "Finalize design"],
    stepsAr: ["شارك أفكارك", "راجع الخيارات", "تصور ثلاثي الأبعاد", "أنهِ التصميم"],
    benefitsEn: ["Professional expertise", "3D included", "Unlimited revisions"],
    benefitsAr: ["خبرة احترافية", "تصور ثلاثي الأبعاد", "مراجعات غير محدودة"],
    order: 2,
  },
  {
    slug: "price-quotation",
    icon: "Calculator",
    titleEn: "Price Quotation",
    titleAr: "عرض الأسعار",
    taglineEn: "Transparent pricing",
    taglineAr: "أسعار شفافة",
    descriptionEn: "Get a detailed quote with transparent pricing.",
    descriptionAr: "احصل على عرض أسعار مفصل بأسعار شفافة.",
    image: modernWoodImages[2],
    stepsEn: ["Review specs", "Cost breakdown", "Payment options", "Approve"],
    stepsAr: ["راجع المواصفات", "تفصيل التكاليف", "خيارات الدفع", "وافق"],
    benefitsEn: ["No hidden fees", "Flexible plans", "Competitive pricing"],
    benefitsAr: ["لا رسوم خفية", "خطط مرنة", "أسعار تنافسية"],
    order: 3,
  },
  {
    slug: "project-tracking",
    icon: "ClipboardList",
    titleEn: "Project Tracking",
    titleAr: "متابعة المشروع",
    taglineEn: "Stay informed",
    taglineAr: "ابق على اطلاع",
    descriptionEn: "Track your project through fabrication and installation.",
    descriptionAr: "تتبع مشروعك خلال مراحل التصنيع والتركيب.",
    image: modernWoodImages[3],
    stepsEn: ["Timeline", "Updates", "Coordinate", "Inspection"],
    stepsAr: ["الجدول الزمني", "التحديثات", "التنسيق", "الفحص"],
    benefitsEn: ["Real-time updates", "Project manager", "On-time delivery"],
    benefitsAr: ["تحديثات مباشرة", "مدير مشروع", "تسليم في الموعد"],
    order: 4,
  },
  {
    slug: "maintenance",
    icon: "Wrench",
    titleEn: "Request Maintenance",
    titleAr: "طلب الصيانة",
    taglineEn: "We're here when you need us",
    taglineAr: "نحن هنا عندما تحتاجنا",
    descriptionEn: "Submit a maintenance request and we'll assist you promptly.",
    descriptionAr: "قدّم طلب صيانة وسنساعدك على الفور.",
    image: modernWoodImages[4],
    stepsEn: ["Submit request", "Assessment", "Service", "Follow-up"],
    stepsAr: ["قدم الطلب", "التقييم", "الخدمة", "المتابعة"],
    benefitsEn: ["Quick response", "Certified technicians", "Warranty coverage"],
    benefitsAr: ["استجابة سريعة", "فنيون معتمدون", "تغطية الضمان"],
    order: 5,
  },
];

export async function POST() {
  try {
    // Seed Product Services
    await prisma.productServiceImage.deleteMany({});
    await prisma.productService.deleteMany({});

    for (const serviceData of productServicesData) {
      const { images, ...service } = serviceData;

      const createdService = await prisma.productService.create({
        data: {
          slug: service.slug,
          categoryKey: service.categoryKey,
          dbCategory: service.dbCategory,
          titleEn: service.titleEn,
          titleAr: service.titleAr,
          taglineEn: service.taglineEn,
          taglineAr: service.taglineAr,
          descriptionEn: service.descriptionEn,
          descriptionAr: service.descriptionAr,
          heroImage: service.heroImage,
          featuresEn: service.featuresEn,
          featuresAr: service.featuresAr,
          benefitsEn: service.benefitsEn,
          benefitsAr: service.benefitsAr,
          order: service.order,
          published: true,
        },
      });

      await prisma.productServiceImage.createMany({
        data: images.map((src, index) => ({
          serviceId: createdService.id,
          src,
          order: index,
        })),
      });
    }

    // Seed Customer Services
    await prisma.customerService.deleteMany({});

    await prisma.customerService.createMany({
      data: customerServicesData.map((service) => ({
        slug: service.slug,
        icon: service.icon,
        titleEn: service.titleEn,
        titleAr: service.titleAr,
        taglineEn: service.taglineEn,
        taglineAr: service.taglineAr,
        descriptionEn: service.descriptionEn,
        descriptionAr: service.descriptionAr,
        image: service.image,
        stepsEn: service.stepsEn,
        stepsAr: service.stepsAr,
        benefitsEn: service.benefitsEn,
        benefitsAr: service.benefitsAr,
        order: service.order,
        published: true,
      })),
    });

    return NextResponse.json({
      success: true,
      message: "Services seeded successfully",
      productServices: productServicesData.length,
      customerServices: customerServicesData.length,
    });
  } catch (error) {
    console.error("Error seeding services:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
