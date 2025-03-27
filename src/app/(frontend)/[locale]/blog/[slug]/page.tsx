import React, { cache } from 'react'
import { dateFormattersMap, Locale, SUPPORTED_LOCALES } from '@/i18n/routing'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import clsx from 'clsx'
import styles from './page.module.css'
import { format } from 'date-fns'
import TechTag from '@/modules/common/ui/TechTag'
import { Link } from '@/i18n/routing'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { getTranslations } from 'next-intl/server'
import BorderImage from '@/modules/common/ui/BorderImage'
import { Metadata } from 'next'

// Revalidate each 2 days
export const revalidate = 172800
export const dynamicParams = false

const DATE_FORMAT = 'd MMMM yyyy'

interface BlogPageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const { title, heroImage, shortDescription, tags } = await queryBlogDetail(locale, slug)

  const getRichContentText = (c: any) =>
      c?.text || '' + c?.children?.map((c2: any) => getRichContentText(c2))

  const description = shortDescription?.root?.children?.map((c) => getRichContentText(c)).join('')

  console.log(description)

  return {
    keywords: tags
      ?.filter((tag) => typeof tag !== 'number')
      .map((tag) => tag.tagLabel)
      .join(','),
    description,
    openGraph: {
      type: 'website',
      url: `/${locale}/blog/${slug}`,
      title,
      description,
      images: [
        {
          url: (typeof heroImage != 'number' && heroImage?.url) || '',
          alt: (typeof heroImage != 'number' && heroImage?.alt) || '',
          type: (typeof heroImage != 'number' && heroImage?.mimeType) || '',
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  let pathParams: { locale: string; slug: string }[] = []

  for (const locale of SUPPORTED_LOCALES) {
    const articleSlugs = await payload.find({
      collection: 'blog-post',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      locale: locale as (typeof SUPPORTED_LOCALES)[number],
      select: { slug: true },
    })

    pathParams = pathParams.concat(articleSlugs.docs.map(({ slug }) => ({ locale, slug })))
  }

  return pathParams
}

const BlogDetail = async ({ params }: BlogPageProps) => {
  const { locale, slug } = await params
  const t = await getTranslations('blogDetail')

  const blogPost = await queryBlogDetail(locale, slug)

  const createDateFromated = blogPost.createdAt
    ? format(new Date(blogPost.createdAt), DATE_FORMAT, { locale: dateFormattersMap[locale] })
    : null

  return (
    <article className={clsx('content-grid', styles.articleContainer)}>
      <Link href="./" className={styles.returnBtn}>
        <ArrowLeftIcon />
        {t('return')}
      </Link>

      <span className={styles.createDate}>{createDateFromated}</span>
      <h1 className={styles.blogTitle}>{blogPost.title}</h1>
      <div className={styles.tags}>
        {blogPost?.tags?.map((tag) => {
          return (
            typeof tag !== 'number' && (
              <TechTag color={tag.tagColor} content={tag.tagLabel}></TechTag>
            )
          )
        })}
      </div>
      <hr />
      {blogPost.heroImage && typeof blogPost.heroImage !== 'number' && (
        <BorderImage media={blogPost.heroImage} caption={blogPost.heroCaption ?? undefined} />
      )}
      {blogPost.content && <RenderBlocks blocks={blogPost.content} />}
    </article>
  )
}

export default BlogDetail

const queryBlogDetail = cache(async (locale: Locale = 'en', slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const article = await payload.find({
    collection: 'blog-post',
    draft: false,
    pagination: false,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as (typeof SUPPORTED_LOCALES)[number],
  })

  return article.docs?.[0] ?? null
})
