import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const videos = [
  {
    titleEn: "Complete Kitchen Solutions",
    titleAr: "حلول مطابخ متكاملة",
    descriptionEn:
      "Kitchen Core offers a complete solution for kitchens that combine high quality and modern design. The internal structure is made entirely of aluminum to ensure durability and efficiency in the long term. The external facades are made of PVC material, designed carefully to give an elegant and lasting appearance.",
    descriptionAr:
      "تقدم Kitchen Core حلاً متكاملاً للمطابخ التي تجمع بين الجودة العالية والتصميم العصري. الهيكل الداخلي مصنوع بالكامل من الألومنيوم لضمان المتانة والكفاءة على المدى الطويل. الواجهات الخارجية مصنوعة من مادة PVC، مصممة بعناية لتعطي مظهراً أنيقاً ودائماً.",
    url: "https://dr3oahdfiq9ky1mn.public.blob.vercel-storage.com/kitchen%20core%20new.mp4",
    thumbnail: "/صور المطابخ العصرية/04cc5592-d3e3-4127-a6ce-0ddeca503bda.jpg",
    order: 1,
    published: true,
  },
  {
    titleEn: "Modern High-Quality Design",
    titleAr: "تصميم عصري عالي الجودة",
    descriptionEn:
      "Modern design with high quality adds a refined touch to every corner of your home. Our kitchens combine aesthetic beauty with practical functionality, ensuring your space is both stunning and efficient.",
    descriptionAr:
      "التصميم العصري مع الجودة العالية يضيف لمسة راقية لكل ركن من أركان منزلك. مطابخنا تجمع بين الجمال الجذاب والوظائف العملية، مما يضمن أن تكون مساحتك مذهلة وفعالة.",
    url: "https://dr3oahdfiq9ky1mn.public.blob.vercel-storage.com/kitchen%20core%20new.mp4",
    thumbnail: "/صور المطابخ العصرية/059476a3-0703-4c77-9974-90cff95ae7c2.jpg",
    order: 2,
    published: true,
  },
];

export async function POST() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete existing videos
    await prisma.video.deleteMany();

    // Create new videos
    const createdVideos = [];
    for (const video of videos) {
      const created = await prisma.video.create({
        data: video,
      });
      createdVideos.push(created);
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${createdVideos.length} videos successfully`,
      videos: createdVideos,
    });
  } catch (error) {
    console.error("Error seeding videos:", error);
    return NextResponse.json(
      { error: "Failed to seed videos" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Delete existing videos
    await prisma.video.deleteMany();

    // Create new videos
    const createdVideos = [];
    for (const video of videos) {
      const created = await prisma.video.create({
        data: video,
      });
      createdVideos.push(created);
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${createdVideos.length} videos successfully!`,
      videos: createdVideos.map((v) => ({ id: v.id, title: v.titleEn })),
    });
  } catch (error) {
    console.error("Error seeding videos:", error);
    return NextResponse.json(
      { error: "Failed to seed videos", details: String(error) },
      { status: 500 }
    );
  }
}
