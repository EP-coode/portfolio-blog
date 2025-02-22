import type { MetadataRoute } from 'next'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// TODO: remove repetitive code
const queryAboutMePateContent = cache(async (locale = 'en') => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.findGlobal({
    slug: 'aboutMe',
    locale: locale as 'en' | 'pl',
  })

  return result
})

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
