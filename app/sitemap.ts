import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kitchen-core.com";
  const locales = ["en", "ar"];

  // Static pages (bilingual)
  const staticPages: MetadataRoute.Sitemap = [];
  const pages = [
    { path: "", priority: 1.0, freq: "daily" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/services", priority: 0.9, freq: "monthly" as const },
    { path: "/projects", priority: 0.9, freq: "weekly" as const },
    { path: "/gallery", priority: 0.8, freq: "weekly" as const },
    { path: "/blog", priority: 0.7, freq: "daily" as const },
  ];

  // Generate bilingual static pages
  locales.forEach((locale) => {
    pages.forEach((page) => {
      staticPages.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.freq,
        priority: page.priority,
      });
    });
  });

  // Dynamic project pages (bilingual)
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  const projectPages: MetadataRoute.Sitemap = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  // Dynamic blog posts (bilingual)
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });

    blogPages = blogPosts.flatMap((post) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    );
  } catch (error) {
    console.log("Blog posts not available for sitemap:", error);
  }

  // Combine all pages
  return [...staticPages, ...projectPages, ...blogPages];
}
