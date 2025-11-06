import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kitchencore.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/admin/*',
          '/api/*',
          '/*.json',
          '/*?*',  // Query parameters
          '/studio',
          '/studio/*',
        ],
      },
      {
        userAgent: 'GPTBot',  // OpenAI crawler
        disallow: ['/'],      // Prevent AI training on content
      },
      {
        userAgent: 'CCBot',   // Common Crawl
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
