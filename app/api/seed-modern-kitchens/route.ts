import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const modernKitchenImages = [
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

const projectNames = [
  { en: "Modern Kitchen Design", ar: "تصميم مطبخ عصري" },
  { en: "Contemporary Kitchen", ar: "مطبخ معاصر" },
  { en: "Elegant Kitchen Space", ar: "مساحة مطبخ أنيقة" },
  { en: "Luxury Kitchen Project", ar: "مشروع مطبخ فاخر" },
  { en: "Premium Kitchen Design", ar: "تصميم مطبخ ممتاز" },
];

export async function POST() {
  try {
    const projects = [];
    const timestamp = Date.now();

    for (let i = 0; i < modernKitchenImages.length; i++) {
      const nameIndex = i % projectNames.length;
      const projectNumber = Math.floor(i / projectNames.length) + 1;
      const uniqueSlug = `modern-kitchen-${i + 1}-${timestamp}`;

      projects.push({
        titleEn: `${projectNames[nameIndex].en} ${projectNumber}`,
        titleAr: `${projectNames[nameIndex].ar} ${projectNumber}`,
        slug: uniqueSlug,
        location: "UAE",
        category: "MODERN_WOODEN" as const,
        image: modernKitchenImages[i],
        gallery: [modernKitchenImages[i]],
        descriptionEn:
          "A beautifully crafted modern kitchen featuring premium materials, sleek lines, and innovative storage solutions.",
        descriptionAr:
          "مطبخ عصري مصنوع بعناية يتميز بمواد فاخرة وخطوط أنيقة وحلول تخزين مبتكرة.",
        year: "2024",
        area: "28 sqm",
        budget: "Premium",
        materials: ["European Wood", "PVC", "Stainless Steel"],
        appliances: [],
        features: [
          "Soft-Close Mechanisms",
          "LED Integrated Lighting",
          "German Hinges",
          "Custom Storage",
        ],
        duration: "4 weeks",
        challengesEn: "",
        challengesAr: "",
        innovations: [],
        featured: i < 6,
        order: i,
        published: true,
      });
    }

    // Delete existing MODERN_WOODEN projects first
    await prisma.project.deleteMany({
      where: { category: "MODERN_WOODEN" },
    });

    // Insert new projects
    const result = await prisma.project.createMany({
      data: projects,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.count} modern kitchen projects`,
      count: result.count,
    });
  } catch (error) {
    console.error("Error seeding modern kitchens:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
