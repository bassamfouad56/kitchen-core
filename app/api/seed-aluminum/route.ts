import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const aluminumImages = [
  "/صور مطابخ الألومنيوم/3752c5da-5463-42ff-a383-fd92f6ca9ff7.jpg",
  "/صور مطابخ الألومنيوم/72b67059-2e64-4e01-900d-851f175389e5.jpg",
  "/صور مطابخ الألومنيوم/aeb76f0b-5480-4010-868e-8dbef969d55d.jpg",
  "/صور مطابخ الألومنيوم/c478db8c-e49c-47c0-917a-5a11cb5fc664.jpg",
  "/صور مطابخ الألومنيوم/c4b57357-7d17-493c-813c-728593b15207.jpg",
  "/صور مطابخ الألومنيوم/edea8ca0-ca7c-4631-9c04-5032e726c03c.jpg",
];

const projectNames = [
  { en: "Full Aluminum Kitchen", ar: "مطبخ ألومنيوم كامل" },
  { en: "Modern Aluminum Design", ar: "تصميم ألومنيوم عصري" },
  { en: "Premium Aluminum Kitchen", ar: "مطبخ ألومنيوم فاخر" },
];

export async function POST() {
  try {
    const projects = [];

    for (let i = 0; i < aluminumImages.length; i++) {
      const nameIndex = i % projectNames.length;
      const projectNumber = Math.floor(i / projectNames.length) + 1;
      const uniqueSlug = `aluminum-kitchen-${i + 1}-${Date.now()}`;

      projects.push({
        titleEn: `${projectNames[nameIndex].en} ${projectNumber}`,
        titleAr: `${projectNames[nameIndex].ar} ${projectNumber}`,
        slug: uniqueSlug,
        location: "UAE",
        category: "ALUMINUM" as const,
        image: aluminumImages[i],
        gallery: [aluminumImages[i]],
        descriptionEn:
          "A durable aluminum kitchen featuring 100% waterproof construction, rust-resistant materials, and modern aesthetics.",
        descriptionAr:
          "مطبخ ألومنيوم متين يتميز ببناء مقاوم للماء 100%، ومواد مقاومة للصدأ، وجماليات عصرية.",
        year: "2024",
        area: "25 sqm",
        budget: "Premium",
        materials: ["Aluminum", "Glass", "Stainless Steel"],
        appliances: [],
        features: [
          "100% Waterproof",
          "Rust Resistant",
          "Termite Proof",
          "Easy Clean",
        ],
        duration: "3 weeks",
        challengesEn: "",
        challengesAr: "",
        innovations: [],
        featured: i < 3,
        order: i,
        published: true,
      });
    }

    // Delete existing ALUMINUM projects first
    await prisma.project.deleteMany({
      where: { category: "ALUMINUM" },
    });

    // Insert new projects
    const result = await prisma.project.createMany({
      data: projects,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.count} aluminum kitchen projects`,
      count: result.count,
    });
  } catch (error) {
    console.error("Error seeding aluminum kitchens:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
