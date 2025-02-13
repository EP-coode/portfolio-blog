import type { MetadataRoute } from 'next'
import { queryAboutMePateContent } from './page'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { updatedAt } = await queryAboutMePateContent()

  return [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified: new Date(updatedAt ?? new Date()),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
