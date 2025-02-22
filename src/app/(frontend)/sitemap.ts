import type { MetadataRoute } from 'next'
import { queryAboutMePateContent } from './[locale]/page'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { updatedAt } = await queryAboutMePateContent()

  // TODO: remake sitemap
  return [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified: new Date(updatedAt ?? new Date()),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: `${process.env.BASE_URL}/en`,
          pl: `${process.env.BASE_URL}/pl`,
        },
      },
    },
  ]
}
