import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
  "/Bedrooms & Wardrobes/WhatsApp Image 2026-01-11 at 12.28.40 PM.jpeg",
];

const projectNames = [
  { en: "Modern Wardrobe Design", ar: "تصميم خزانة عصرية" },
  { en: "Elegant Bedroom Suite", ar: "جناح غرفة نوم أنيق" },
  { en: "Custom Closet System", ar: "نظام خزانة مخصص" },
  { en: "Luxury Bedroom Set", ar: "طقم غرفة نوم فاخر" },
  { en: "Premium Wardrobe Project", ar: "مشروع خزانة ممتاز" },
];

export async function POST() {
  try {
    const projects = [];
    const timestamp = Date.now();

    for (let i = 0; i < bedroomImages.length; i++) {
      const nameIndex = i % projectNames.length;
      const projectNumber = Math.floor(i / projectNames.length) + 1;
      const uniqueSlug = `bedroom-wardrobe-${i + 1}-${timestamp}`;

      projects.push({
        titleEn: `${projectNames[nameIndex].en} ${projectNumber}`,
        titleAr: `${projectNames[nameIndex].ar} ${projectNumber}`,
        slug: uniqueSlug,
        location: "UAE",
        category: "BEDROOMS" as const,
        image: bedroomImages[i],
        gallery: [bedroomImages[i]],
        descriptionEn:
          "A beautifully crafted bedroom and wardrobe solution featuring premium materials and innovative storage designs.",
        descriptionAr:
          "حل غرفة نوم وخزانة مصنوع بعناية يتميز بمواد فاخرة وتصاميم تخزين مبتكرة.",
        year: "2024",
        area: "20 sqm",
        budget: "Premium",
        materials: ["MDF", "Premium Fabric", "Glass"],
        appliances: [],
        features: [
          "Custom-fit Wardrobe Systems",
          "Integrated LED Lighting",
          "Soft-Close Mechanisms",
          "Accessory Organizers",
        ],
        duration: "3 weeks",
        challengesEn: "",
        challengesAr: "",
        innovations: [],
        featured: i < 4,
        order: i,
        published: true,
      });
    }

    // Delete existing BEDROOMS projects first
    await prisma.project.deleteMany({
      where: { category: "BEDROOMS" },
    });

    // Insert new projects
    const result = await prisma.project.createMany({
      data: projects,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.count} bedroom projects`,
      count: result.count,
    });
  } catch (error) {
    console.error("Error seeding bedrooms:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
