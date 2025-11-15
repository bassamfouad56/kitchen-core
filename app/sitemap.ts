import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kitchen-core.com";
  const locales = ["en", "ar"];

  // Static pages (bilingual) - Optimized SEO priorities
  const staticPages: MetadataRoute.Sitemap = [];
  const pages = [
    { path: "", priority: 1.0, freq: "daily" as const }, // Homepage - Highest priority
    { path: "/projects", priority: 0.95, freq: "weekly" as const }, // Portfolio - Very high (visual proof)
    { path: "/services", priority: 0.95, freq: "weekly" as const }, // Services - Very high (conversions)
    { path: "/gallery", priority: 0.85, freq: "weekly" as const }, // Gallery - High (visual content)
    { path: "/about", priority: 0.8, freq: "monthly" as const }, // About - Trust building
    { path: "/blog", priority: 0.75, freq: "daily" as const }, // Blog - Content marketing
    { path: "/privacy", priority: 0.3, freq: "yearly" as const }, // Privacy Policy - Legal
    { path: "/terms", priority: 0.3, freq: "yearly" as const }, // Terms & Conditions - Legal
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

  // Dynamic project pages (bilingual) - Higher priority for portfolio items
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
      priority: 0.8, // Increased from 0.7 - Portfolio items are high value
    })),
  );

  // Dynamic blog posts (bilingual) - Increased priority for fresh content
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
        priority: 0.7, // Increased from 0.6 - Blog content drives SEO
      })),
    );
  } catch (error) {
    console.log("Blog posts not available for sitemap:", error);
  }

  // Combine all pages
  return [...staticPages, ...projectPages, ...blogPages];
}
