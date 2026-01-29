import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const classicImages = [
  "/صور مطابخ الكلاسيك/0ffc8595-78ff-4e27-87ea-06531654926b.jpg",
  "/صور مطابخ الكلاسيك/486b8483-6daa-4551-949f-330e5261066c.jpg",
  "/صور مطابخ الكلاسيك/97fe6a18-2e1f-4093-8847-24eabf87b809.jpg",
  "/صور مطابخ الكلاسيك/f55050f3-494c-48ae-989e-63f027f70474.jpg",
];

const projectNames = [
  { en: "Classic Wooden Kitchen", ar: "مطبخ خشب كلاسيك" },
  { en: "Traditional Kitchen Design", ar: "تصميم مطبخ تقليدي" },
  { en: "Elegant Classic Kitchen", ar: "مطبخ كلاسيك أنيق" },
  { en: "Premium Classic Kitchen", ar: "مطبخ كلاسيك فاخر" },
];

export async function POST() {
  try {
    const projects = [];

    for (let i = 0; i < classicImages.length; i++) {
      const nameIndex = i % projectNames.length;
      const uniqueSlug = `classic-kitchen-${i + 1}-${Date.now()}`;

      projects.push({
        titleEn: projectNames[nameIndex].en,
        titleAr: projectNames[nameIndex].ar,
        slug: uniqueSlug,
        location: "UAE",
        category: "CLASSIC_WOODEN" as const,
        image: classicImages[i],
        gallery: [classicImages[i]],
        descriptionEn:
          "A beautifully crafted classic wooden kitchen featuring traditional design elements, ornate details, and timeless elegance.",
        descriptionAr:
          "مطبخ خشب كلاسيك مصنوع بعناية يتميز بعناصر تصميم تقليدية وتفاصيل مزخرفة وأناقة خالدة.",
        year: "2024",
        area: "30 sqm",
        budget: "Luxury",
        materials: ["Solid Wood", "Marble", "Brass"],
        appliances: [],
        features: [
          "Hand-Crafted Details",
          "Traditional Joinery",
          "Premium Lacquer Finish",
          "Ornate Hardware",
        ],
        duration: "5 weeks",
        challengesEn: "",
        challengesAr: "",
        innovations: [],
        featured: i < 2,
        order: i,
        published: true,
      });
    }

    // Delete existing CLASSIC_WOODEN projects first
    await prisma.project.deleteMany({
      where: { category: "CLASSIC_WOODEN" },
    });

    // Insert new projects
    const result = await prisma.project.createMany({
      data: projects,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.count} classic kitchen projects`,
      count: result.count,
    });
  } catch (error) {
    console.error("Error seeding classic kitchens:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
