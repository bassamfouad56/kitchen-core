import { PrismaClient, ProjectCategory } from "@prisma/client";

const prisma = new PrismaClient();

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
  "/صور المطابخ العصرية/334e2e74-e49a-45b0-851f-90bae31be4b3.jpg",
  "/صور المطابخ العصرية/3bad2a0c-16ea-44cd-94f0-88bfc7d60006.jpg",
  "/صور المطابخ العصرية/3e3e1729-fbf7-473c-a9d4-f4d1a850b7ad.jpg",
  "/صور المطابخ العصرية/428e5070-f067-4b4b-ba52-459dcccbb274.jpg",
  "/صور المطابخ العصرية/4a62ebd8-319f-4d1d-8766-e38be6988014.jpg",
  "/صور المطابخ العصرية/4cef5e4d-d6ff-4aaa-9b61-8ef10adfe153.jpg",
  "/صور المطابخ العصرية/5014cc4a-724c-4b6b-bdd9-848961ff55f7.jpg",
  "/صور المطابخ العصرية/53546883-7ca0-472f-87ce-2ad59f64097c.jpg",
  "/صور المطابخ العصرية/59944b2d-5e9f-40a3-90dc-e025680f4049.jpg",
  "/صور المطابخ العصرية/5bc6a952-f8a1-431d-9e2c-f17d7cd33122.jpg",
  "/صور المطابخ العصرية/5eacaaf2-1571-49ba-9b54-08d39fcb6ef0.jpg",
  "/صور المطابخ العصرية/608f2d3d-0c2f-4313-8120-162272db2930.jpg",
  "/صور المطابخ العصرية/61b77219-eeb4-4056-9066-459fd7a7e610.jpg",
  "/صور المطابخ العصرية/68269947-89ef-4000-b00b-bb91e6949007.jpg",
  "/صور المطابخ العصرية/689e0ecf-0b96-4552-b1e7-e0072e2013ed.jpg",
  "/صور المطابخ العصرية/6b0f86ef-c2ff-456f-b25b-ad019b4f7cbf.jpg",
  "/صور المطابخ العصرية/7206b11d-fd53-483c-9d11-7ad565748714.jpg",
  "/صور المطابخ العصرية/78f260d9-9b34-432f-ad9d-cc20bd614029.jpg",
  "/صور المطابخ العصرية/805ce7e2-6ca5-4fe2-9c38-259ba52495ae.jpg",
  "/صور المطابخ العصرية/887821dd-5dc2-4a15-9580-4be6b1fe87c4.jpg",
  "/صور المطابخ العصرية/89c822fc-65b2-4775-8665-9a95ea489c21.jpg",
  "/صور المطابخ العصرية/8e95f51f-0ca1-4d6a-ac87-bf36223ef67d.jpg",
  "/صور المطابخ العصرية/903585c4-237f-4f22-b011-4d5cf80951fd.jpg",
  "/صور المطابخ العصرية/907ce55c-5f2a-4fea-bee7-208ba8b596b6.jpg",
  "/صور المطابخ العصرية/91f40ce7-6a5e-4976-872a-6572beb5e7c3.jpg",
  "/صور المطابخ العصرية/94b84509-70e7-4e80-aab3-39a828e2461d.jpg",
  "/صور المطابخ العصرية/95769e51-78f4-436a-bb7e-426ca68c2793.jpg",
  "/صور المطابخ العصرية/99d7183c-39ef-47a8-9a60-7a4c6e729327.jpg",
  "/صور المطابخ العصرية/9fa07605-8679-469a-bbc0-455373dca9d8.jpg",
  "/صور المطابخ العصرية/9fcb2258-78a3-48cc-80d8-ec174ef6992e.jpg",
  "/صور المطابخ العصرية/a23b26cc-ed09-46a7-a2e8-ad5605bee2bc.jpg",
  "/صور المطابخ العصرية/a306dc8a-239a-40f3-953f-01252c9144f8.jpg",
  "/صور المطابخ العصرية/a3da3f9f-6e41-4208-bcf2-0959acee1ff6.jpg",
  "/صور المطابخ العصرية/a9270a58-4926-4578-afb2-bf08258a2a61.jpg",
  "/صور المطابخ العصرية/b0d98304-5571-4838-a50a-6ba3fb4affec.jpg",
  "/صور المطابخ العصرية/b10087e4-7308-4ab2-99ad-d69cfd86f646.jpg",
  "/صور المطابخ العصرية/b6e02fba-6448-4978-ba3d-82986daf5faa.jpg",
  "/صور المطابخ العصرية/b7c5d8e3-4870-4470-b703-055f7bf6cea6.jpg",
  "/صور المطابخ العصرية/b947e228-3d6c-4081-8abd-94243cc83249.jpg",
  "/صور المطابخ العصرية/b9a36790-1d89-4297-becb-35cd6f8da991.jpg",
  "/صور المطابخ العصرية/c3051c94-af97-4927-b760-4052211dea7d.jpg",
  "/صور المطابخ العصرية/ca148242-1638-4482-8bdd-c104bb3883a7.jpg",
  "/صور المطابخ العصرية/ce0f3e69-a1d2-4875-bf9f-1c740b8a6735.jpg",
  "/صور المطابخ العصرية/ceea36e3-ed23-46a8-830b-c84f59f5ff76.jpg",
  "/صور المطابخ العصرية/d2f44311-8fa5-4a81-9f3e-5360ff44d240.jpg",
  "/صور المطابخ العصرية/d444f44c-9e31-4be4-bde5-be28f40916f5.jpg",
  "/صور المطابخ العصرية/d9bf6535-56da-44aa-a09c-a1a0fafe4bc8.jpg",
  "/صور المطابخ العصرية/dbca38b9-ac4f-4e1a-ac60-0bbfa513b62e.jpg",
  "/صور المطابخ العصرية/dc338715-3e75-413e-9698-61820c255b54.jpg",
  "/صور المطابخ العصرية/ddf2c106-47c1-4180-b029-34f7f15c791a.jpg",
  "/صور المطابخ العصرية/de7806e9-699a-4ad4-992a-2e40a1834bf7.jpg",
  "/صور المطابخ العصرية/debf2f3c-c12f-4280-b3ac-624827ddbc02.jpg",
  "/صور المطابخ العصرية/e0841177-ac36-4bb1-a5e0-31a3888b56b3.jpg",
  "/صور المطابخ العصرية/e287fe4f-3cb9-4d21-ba20-b78dcc7bd059.jpg",
  "/صور المطابخ العصرية/edd06d2f-9789-43c8-94bb-27e0cf5cbfde.jpg",
  "/صور المطابخ العصرية/f071e543-d170-462c-be41-b5072b7a43c5.jpg",
  "/صور المطابخ العصرية/f780a496-17e4-4d21-9259-652fd9cc3a49.jpg",
  "/صور المطابخ العصرية/f93b244d-fe91-437b-aee0-503e23a82a73.jpg",
  "/صور المطابخ العصرية/fb5d6073-8f0d-43a6-b104-c154bbd712c1.jpg",
  "/صور المطابخ العصرية/fdf5503f-ac9a-40dd-b37d-34915d1f9c8e.jpg",
  "/صور المطابخ العصرية/fe906f7b-19ba-4301-89c2-433a069852dc.jpg",
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
  "/Bedrooms & Wardrobes/12.jpeg",
  "/Bedrooms & Wardrobes/13.jpeg",
  "/Bedrooms & Wardrobes/14.jpeg",
  "/Bedrooms & Wardrobes/15.jpeg",
  "/Bedrooms & Wardrobes/16.jpeg",
  "/Bedrooms & Wardrobes/18.jpeg",
  "/Bedrooms & Wardrobes/19.jpeg",
  "/Bedrooms & Wardrobes/20.jpeg",
  "/Bedrooms & Wardrobes/21.jpeg",
  "/Bedrooms & Wardrobes/WhatsApp%20Image%202026-01-11%20at%2012.28.40%20PM.jpeg",
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
      "Book an appointment for our team to visit your site and take precise measurements. Our expert team will assess your space, discuss your requirements, and provide professional recommendations for your project.",
    descriptionAr:
      "احجز موعداً لفريقنا لزيارة موقعك وأخذ القياسات الدقيقة. سيقوم فريقنا المتخصص بتقييم المساحة ومناقشة متطلباتك وتقديم توصيات احترافية لمشروعك.",
    image: modernWoodImages[0],
    stepsEn: [
      "Book your preferred appointment time",
      "Our team visits your location",
      "Precise measurements are taken",
      "Initial assessment is provided",
    ],
    stepsAr: [
      "احجز موعدك المفضل",
      "يزور فريقنا موقعك",
      "يتم أخذ القياسات الدقيقة",
      "يتم تقديم التقييم الأولي",
    ],
    benefitsEn: [
      "Free professional measurement service",
      "Expert site assessment",
      "Personalized recommendations",
      "No obligation consultation",
    ],
    benefitsAr: [
      "خدمة قياس احترافية مجانية",
      "تقييم موقع من خبراء",
      "توصيات شخصية",
      "استشارة بدون التزام",
    ],
    order: 1,
  },
  {
    slug: "design-consultation",
    icon: "Palette",
    titleEn: "Design Consultation",
    titleAr: "استشارة التصميم",
    taglineEn: "Bring your vision to life",
    taglineAr: "حوّل رؤيتك إلى واقع",
    descriptionEn:
      "Meet with our designers to discuss your vision and create your perfect design. Our experienced design team will work with you to develop a customized solution that matches your style and functional needs.",
    descriptionAr:
      "قابل مصممينا لمناقشة رؤيتك وإنشاء تصميمك المثالي. سيعمل فريق التصميم ذو الخبرة معك لتطوير حل مخصص يتناسب مع أسلوبك واحتياجاتك الوظيفية.",
    image: modernWoodImages[5],
    stepsEn: [
      "Share your ideas and inspiration",
      "Review material and color options",
      "Receive 3D design visualization",
      "Finalize your custom design",
    ],
    stepsAr: [
      "شارك أفكارك وإلهامك",
      "راجع خيارات المواد والألوان",
      "احصل على تصور ثلاثي الأبعاد",
      "أنهِ تصميمك المخصص",
    ],
    benefitsEn: [
      "Professional design expertise",
      "3D visualization included",
      "Material selection guidance",
      "Unlimited revision options",
    ],
    benefitsAr: [
      "خبرة تصميم احترافية",
      "تصور ثلاثي الأبعاد مضمن",
      "إرشادات اختيار المواد",
      "خيارات مراجعة غير محدودة",
    ],
    order: 2,
  },
  {
    slug: "price-quotation",
    icon: "Calculator",
    titleEn: "Price Quotation",
    titleAr: "عرض الأسعار",
    taglineEn: "Transparent pricing, no surprises",
    taglineAr: "أسعار شفافة، بدون مفاجآت",
    descriptionEn:
      "Get a detailed quote with transparent pricing. We provide comprehensive breakdowns of all costs, materials, and timelines so you can make an informed decision about your investment.",
    descriptionAr:
      "احصل على عرض أسعار مفصل بأسعار شفافة. نقدم تفصيلاً شاملاً لجميع التكاليف والمواد والجداول الزمنية حتى تتمكن من اتخاذ قرار مستنير بشأن استثمارك.",
    image: modernWoodImages[10],
    stepsEn: [
      "Review your design specifications",
      "Receive itemized cost breakdown",
      "Discuss payment options",
      "Approve and proceed",
    ],
    stepsAr: [
      "راجع مواصفات التصميم",
      "احصل على تفصيل التكاليف",
      "ناقش خيارات الدفع",
      "وافق وابدأ",
    ],
    benefitsEn: [
      "No hidden fees",
      "Flexible payment plans",
      "Competitive pricing",
      "Value guarantee",
    ],
    benefitsAr: [
      "لا رسوم خفية",
      "خطط دفع مرنة",
      "أسعار تنافسية",
      "ضمان القيمة",
    ],
    order: 3,
  },
  {
    slug: "project-tracking",
    icon: "ClipboardList",
    titleEn: "Project Tracking",
    titleAr: "متابعة المشروع",
    taglineEn: "Stay informed every step of the way",
    taglineAr: "ابق على اطلاع في كل خطوة",
    descriptionEn:
      "Track your project through fabrication and installation. Our project management system keeps you updated on progress milestones, delivery schedules, and installation timelines.",
    descriptionAr:
      "تتبع مشروعك خلال مراحل التصنيع والتركيب. يبقيك نظام إدارة المشاريع لدينا على اطلاع بمراحل التقدم وجداول التسليم والجداول الزمنية للتركيب.",
    image: modernWoodImages[15],
    stepsEn: [
      "Receive project timeline",
      "Get regular progress updates",
      "Coordinate installation dates",
      "Final quality inspection",
    ],
    stepsAr: [
      "احصل على الجدول الزمني للمشروع",
      "تلقَ تحديثات التقدم المنتظمة",
      "نسق مواعيد التركيب",
      "الفحص النهائي للجودة",
    ],
    benefitsEn: [
      "Real-time progress updates",
      "Dedicated project manager",
      "Quality assurance checks",
      "On-time delivery guarantee",
    ],
    benefitsAr: [
      "تحديثات التقدم في الوقت الفعلي",
      "مدير مشروع مخصص",
      "فحوصات ضمان الجودة",
      "ضمان التسليم في الموعد",
    ],
    order: 4,
  },
  {
    slug: "maintenance",
    icon: "Wrench",
    titleEn: "Request Maintenance",
    titleAr: "طلب الصيانة",
    taglineEn: "We're here when you need us",
    taglineAr: "نحن هنا عندما تحتاجنا",
    descriptionEn:
      "Submit a maintenance request and we'll assist you promptly. Our after-sales service team is dedicated to ensuring your kitchen remains in perfect condition for years to come.",
    descriptionAr:
      "قدّم طلب صيانة وسنساعدك على الفور. فريق خدمة ما بعد البيع لدينا مكرس لضمان بقاء مطبخك في حالة مثالية لسنوات قادمة.",
    image: modernWoodImages[20],
    stepsEn: [
      "Submit maintenance request",
      "Technician assessment scheduled",
      "Service performed",
      "Follow-up confirmation",
    ],
    stepsAr: [
      "قدم طلب الصيانة",
      "يتم جدولة تقييم الفني",
      "يتم تنفيذ الخدمة",
      "تأكيد المتابعة",
    ],
    benefitsEn: [
      "Quick response time",
      "Certified technicians",
      "Genuine replacement parts",
      "Warranty coverage",
    ],
    benefitsAr: [
      "وقت استجابة سريع",
      "فنيون معتمدون",
      "قطع غيار أصلية",
      "تغطية الضمان",
    ],
    order: 5,
  },
];

async function seedProductServices() {
  console.log("🍳 Seeding product services...");

  // Delete existing product services and their images
  await prisma.productServiceImage.deleteMany({});
  await prisma.productService.deleteMany({});

  for (const serviceData of productServicesData) {
    const { images, ...service } = serviceData;

    // Create product service
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

    // Create images for this service
    await prisma.productServiceImage.createMany({
      data: images.map((src, index) => ({
        serviceId: createdService.id,
        src,
        order: index,
      })),
    });

    console.log(`  ✓ Created ${service.titleEn} with ${images.length} images`);
  }

  console.log("✅ Product services seeded successfully!");
}

async function seedCustomerServices() {
  console.log("🛎️ Seeding customer services...");

  // Delete existing customer services
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

  console.log("✅ Customer services seeded successfully!");
}

async function main() {
  console.log("🚀 Starting services seed...\n");

  await seedProductServices();
  console.log("");
  await seedCustomerServices();

  console.log("\n🎉 All services seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding services:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
