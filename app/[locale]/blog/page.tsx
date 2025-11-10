import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BlogHero from "@/app/components/blog/BlogHero";
import BlogGrid from "@/app/components/blog/BlogGrid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        titleEn: true,
        titleAr: true,
        excerptEn: true,
        excerptAr: true,
        featuredImage: true,
        category: true,
        author: true,
        readingTime: true,
        publishedAt: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale });
  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "المدونة | Kitchen Core"
      : "Blog | Kitchen Core",
    description: isArabic
      ? "اكتشف أحدث الاتجاهات والنصائح والقصص من عالم تصميم المطابخ الفاخرة"
      : "Discover the latest trends, tips, and stories from the world of luxury kitchen design",
    keywords: [
      "kitchen design blog",
      "luxury kitchen trends",
      "kitchen design tips",
      "interior design blog",
      "kitchen renovation ideas",
      isArabic ? "مدونة تصميم المطابخ" : "",
      isArabic ? "اتجاهات المطابخ الفاخرة" : "",
    ].filter(Boolean),
    openGraph: {
      title: isArabic ? "المدونة | Kitchen Core" : "Blog | Kitchen Core",
      description: isArabic
        ? "اكتشف أحدث الاتجاهات والنصائح والقصص من عالم تصميم المطابخ الفاخرة"
        : "Discover the latest trends, tips, and stories from the world of luxury kitchen design",
      type: "website",
      locale: isArabic ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: isArabic ? "المدونة | Kitchen Core" : "Blog | Kitchen Core",
      description: isArabic
        ? "اكتشف أحدث الاتجاهات والنصائح والقصص من عالم تصميم المطابخ الفاخرة"
        : "Discover the latest trends, tips, and stories from the world of luxury kitchen design",
    },
  };
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      <BlogHero locale={locale} />
      <BlogGrid posts={posts} locale={locale} />
    </div>
  );
}
