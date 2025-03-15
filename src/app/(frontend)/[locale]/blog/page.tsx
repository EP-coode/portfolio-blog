import { cache } from 'react'
import { getPayload } from 'payload'
import { Locale } from '@/i18n/routing'
import configPromise from '@payload-config'
import BlogPostTile from '@/modules/common/components/BlogPostTile'

import style from './page.module.css'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const locale = (await params).locale
  const result = await getBlogListing(locale)
  const t = await getTranslations('blogListing')

  return (
    <div className={clsx('content-grid', style.blogListLayout)}>
      <div>
        <h1>{t('title')}</h1>
        <p>{t('subTitle')}</p>
      </div>
      <div className={clsx(style.blogList)}>
        {result.docs.map((doc, i) => (
          <BlogPostTile key={i} tileData={doc} />
        ))}
      </div>
    </div>
  )
}

const getBlogListing = cache(async (locale: Locale = 'en') => {
  const payload = await getPayload({ config: configPromise })
  return await payload.find({
    locale,
    collection: 'blog-post',
    select: {
      title: true,
      createdAt: true,
      heroImage: true,
      shortDescription: true,
      tags: true,
      slug: true,
    },
  })
})

export type BlogTileType = Awaited<ReturnType<typeof getBlogListing>>['docs'][number]
