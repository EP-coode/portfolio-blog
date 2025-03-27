import type { MetadataRoute } from 'next'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Locale } from '@/i18n/routing'

// TODO: remove repetitive code
const queryAboutMePateContent = cache(async (locale = 'en') => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.findGlobal({
    slug: 'aboutMe',
    locale: locale as 'en' | 'pl',
  })

  return result
})

// TODO: remove repetitive code
const getBlogListing = cache(async (locale: Locale = 'en') => {
  const payload = await getPayload({ config: configPromise })
  return await payload.find({
    locale,
    collection: 'blog-post',
    select: {
      updatedAt: true,
      slug: true,
    },
  })
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { updatedAt } = await queryAboutMePateContent()
  const blogList = await getBlogListing()

  const blogSitemap: MetadataRoute.Sitemap = blogList.docs.map(({ updatedAt, slug }) => ({
    url: `${process.env.BASE_URL}/blog/${slug}`,
    lastModified: new Date(updatedAt ?? new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: {
        en: `${process.env.BASE_URL}/en/blog/${slug}`,
        pl: `${process.env.BASE_URL}/pl/blog/${slug}`,
      },
    },
  }))

  // TODO: remake sitemap
  return [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified: new Date(updatedAt ?? new Date()),
      changeFrequency: 'weekly',
      priority: 0.99,
      alternates: {
        languages: {
          en: `${process.env.BASE_URL}/en`,
          pl: `${process.env.BASE_URL}/pl`,
        },
      },
    },
    {
      url: `${process.env.BASE_URL}/blog`,
      lastModified: new Date(updatedAt ?? new Date()),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${process.env.BASE_URL}/en/blog`,
          pl: `${process.env.BASE_URL}/pl/blog`,
        },
      },
    },
    ...blogSitemap,
  ]
}
