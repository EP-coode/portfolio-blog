import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow indexing util development is finished
      disallow: ['/tags', '/admin', '/admin/*'],
    },
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  }
}
