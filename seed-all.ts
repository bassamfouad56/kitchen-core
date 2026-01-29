import { PrismaClient, ProjectCategory, GallerySize } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("\n🌱 Seeding ALL missing content...\n");

  // Services
  console.log("📦 Creating services...");
  await prisma.service.deleteMany({});
  await prisma.service.createMany({
    data: [
      {
        titleEn: "Modern Wooden Kitchens",
        titleAr: "مطابخ خشبية عصرية",
        descriptionEn:
          "Contemporary wood designs with clean lines and smart functionality for modern living.",
        descriptionAr:
          "تصاميم خشبية عصرية بخطوط نظيفة ووظائف ذكية للحياة الحديثة.",
        features: [
          "Premium Wood Materials",
          "Custom Storage Solutions",
          "Modern Aesthetics",
          "Smart Lighting Integration",
        ],
        order: 1,
        published: true,
      },
      {
        titleEn: "Classic Wooden Kitchens",
        titleAr: "مطابخ خشبية كلاسيكية",
        descriptionEn:
          "Timeless elegance with traditional craftsmanship and luxurious details.",
        descriptionAr: "أناقة خالدة مع حرفية تقليدية وتفاصيل فاخرة.",
        features: [
          "Handcrafted Details",
          "Premium Hardwood",
          "Crown Molding",
          "Classic Hardware",
        ],
        order: 2,
        published: true,
      },
      {
        titleEn: "Aluminum Kitchens",
        titleAr: "مطابخ ألومنيوم",
        descriptionEn:
          "Durable, weather-resistant solutions with minimal maintenance and modern finish.",
        descriptionAr: "حلول متينة ومقاومة للعوامل مع صيانة قليلة وتشطيب عصري.",
        features: [
          "Weather Resistant",
          "Low Maintenance",
          "Durable Finish",
          "Moisture Protection",
        ],
        order: 3,
        published: true,
      },
      {
        titleEn: "Bedroom & Wardrobe Solutions",
        titleAr: "حلول غرف النوم وخزائن الملابس",
        descriptionEn:
          "Smart organization systems that maximize space and reflect your personal style.",
        descriptionAr: "أنظمة تنظيم ذكية تعظم المساحة وتعكس أسلوبك الشخصي.",
        features: [
          "Custom Walk-in Closets",
          "Smart Storage Systems",
          "LED Lighting",
          "Soft-Close Mechanisms",
        ],
        order: 4,
        published: true,
      },
    ],
  });

  // Gallery Images
  console.log("🖼️  Creating gallery images...");
  await prisma.galleryImage.deleteMany({});
  await prisma.galleryImage.createMany({
    data: [
      {
        titleEn: "Modern Kitchen Design - Villa Marina",
        titleAr: "تصميم مطبخ عصري - فيلا مارينا",
        image: "/1.jpg",
        category: ProjectCategory.MODERN_WOODEN,
        location: "Dubai, UAE",
        size: GallerySize.LARGE,
        descriptionEn: "Contemporary wooden kitchen with clean lines",
        descriptionAr: "مطبخ خشبي عصري بخطوط نظيفة",
        order: 1,
        published: true,
      },
      {
        titleEn: "Classic Kitchen - Royal Estate",
        titleAr: "مطبخ كلاسيكي - العقار الملكي",
        image: "/2.jpg",
        category: ProjectCategory.CLASSIC_WOODEN,
        location: "Abu Dhabi, UAE",
        size: GallerySize.MEDIUM,
        descriptionEn: "Timeless elegance with traditional craftsmanship",
        descriptionAr: "أناقة خالدة مع حرفية تقليدية",
        order: 2,
        published: true,
      },
      {
        titleEn: "Aluminum Kitchen - Urban Loft",
        titleAr: "مطبخ ألومنيوم - لوفت حضري",
        image: "/3.jpg",
        category: ProjectCategory.ALUMINUM,
        location: "Dubai Marina, UAE",
        size: GallerySize.SMALL,
        descriptionEn: "Modern aluminum kitchen with durable finish",
        descriptionAr: "مطبخ ألومنيوم عصري بتشطيب متين",
        order: 3,
        published: true,
      },
      {
        titleEn: "Master Bedroom Suite",
        titleAr: "جناح غرفة النوم الرئيسية",
        image: "/4.jpg",
        category: ProjectCategory.BEDROOMS,
        location: "Sharjah, UAE",
        size: GallerySize.WIDE,
        descriptionEn: "Smart organization with custom wardrobe",
        descriptionAr: "تنظيم ذكي مع خزانة مخصصة",
        order: 4,
        published: true,
      },
      {
        titleEn: "Contemporary Kitchen Island",
        titleAr: "جزيرة مطبخ عصرية",
        image: "/5.jpg",
        category: ProjectCategory.MODERN_WOODEN,
        location: "Dubai, UAE",
        size: GallerySize.LARGE,
        descriptionEn: "Spacious island with integrated storage",
        descriptionAr: "جزيرة واسعة مع تخزين متكامل",
        order: 5,
        published: true,
      },
      {
        titleEn: "Classic Pantry Design",
        titleAr: "تصميم مخزن كلاسيكي",
        image: "/6.jpg",
        category: ProjectCategory.CLASSIC_WOODEN,
        location: "Abu Dhabi, UAE",
        size: GallerySize.TALL,
        descriptionEn: "Traditional pantry with modern functionality",
        descriptionAr: "مخزن تقليدي بوظائف حديثة",
        order: 6,
        published: true,
      },
    ],
  });

  // Testimonials
  console.log("💬 Creating testimonials...");
  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({
    data: [
      {
        nameEn: "Ahmed Al-Mansoori",
        nameAr: "أحمد المنصوري",
        titleEn: "Villa Owner, Dubai",
        titleAr: "مالك فيلا، دبي",
        location: "Dubai, UAE",
        image: "/9.jpg",
        quoteEn:
          "Kitchen Core transformed our kitchen into a masterpiece. The attention to detail and quality of craftsmanship is exceptional. Highly recommended!",
        quoteAr:
          "حوّل كيتشن كور مطبخنا إلى تحفة فنية. الاهتمام بالتفاصيل وجودة الحرفية استثنائية. أنصح بهم بشدة!",
        rating: 5,
        project: "Modern Wooden Kitchen - Villa Marina",
        featured: true,
        order: 1,
        published: true,
      },
      {
        nameEn: "Fatima Al-Zarooni",
        nameAr: "فاطمة الزعروني",
        titleEn: "Homeowner, Abu Dhabi",
        titleAr: "صاحبة منزل، أبوظبي",
        location: "Abu Dhabi, UAE",
        image: "/10.jpg",
        quoteEn:
          "Professional team, excellent communication, and beautiful results. Our classic kitchen exceeded all expectations. Thank you Kitchen Core!",
        quoteAr:
          "فريق محترف، تواصل ممتاز، ونتائج جميلة. مطبخنا الكلاسيكي تجاوز كل التوقعات. شكراً كيتشن كور!",
        rating: 5,
        project: "Classic Kitchen - Royal Estate",
        featured: true,
        order: 2,
        published: true,
      },
      {
        nameEn: "Mohammed Al-Sharqi",
        nameAr: "محمد الشرقي",
        titleEn: "Apartment Owner, Dubai Marina",
        titleAr: "مالك شقة، دبي مارينا",
        location: "Dubai Marina, UAE",
        image: "/9.jpg",
        quoteEn:
          "The aluminum kitchen is perfect for our coastal location - durable, beautiful, and easy to maintain. Great value for money!",
        quoteAr:
          "مطبخ الألومنيوم مثالي لموقعنا الساحلي - متين، جميل، وسهل الصيانة. قيمة ممتازة مقابل المال!",
        rating: 5,
        project: "Aluminum Kitchen - Urban Loft",
        featured: true,
        order: 3,
        published: true,
      },
    ],
  });

  console.log("\n✅ All content seeded successfully!");
  console.log("   ✅ Services: 4 items");
  console.log("   ✅ Gallery Images: 6 items");
  console.log("   ✅ Testimonials: 3 items\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
