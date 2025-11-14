import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://kitchen-core.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*/admin", // Admin in any locale
          "/*/admin/*",
          "/api",
          "/api/*",
          "/*.json",
          "/*?*", // Query parameters
          "/studio",
          "/studio/*",
          "/_next",
          "/_next/*",
        ],
      },
      {
        userAgent: "GPTBot", // OpenAI crawler
        disallow: ["/"], // Prevent AI training on content
      },
      {
        userAgent: "CCBot", // Common Crawl
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
