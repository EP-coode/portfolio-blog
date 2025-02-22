import Hero from '@/modules/common/components/Hero'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'pl' | 'en' }>
}): Promise<Metadata> {
  const locale = (await params).locale
  const { meta } = await queryAboutMePateContent(locale)

  return {
    keywords: meta?.keywords ?? '',
    description: meta?.description ?? '',
    openGraph: {
      type: 'website',
      url: '/',
      title: meta?.title ?? '',
      description: meta?.description ?? '',
    },
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: 'pl' | 'en' }> }) {
  const locale = (await params).locale
  const { layout } = await queryAboutMePateContent(locale)

  return (
    <div className="content-grid" style={{ marginTop: 0 }}>
      <Hero className="full-width"></Hero>
      <RenderBlocks blocks={layout}></RenderBlocks>
    </div>
  )
}

// TODO: remove repetitive code
const queryAboutMePateContent = cache(async (locale = 'en') => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.findGlobal({
    slug: 'aboutMe',
    locale: locale as 'en' | 'pl',
  })

  return result
})
