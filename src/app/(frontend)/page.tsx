import Hero from '@/modules/common/components/Hero'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await queryAboutMePateContent()

  return {
    keywords: meta?.keywords ?? '',
    openGraph: {
      type: 'website',
      url: '/',
      title: meta?.title ?? '',
      description: meta?.description ?? '',
    },
  }
}

export default async function HomePage() {
  const { layout } = await queryAboutMePateContent()

  return (
    <div className="content-grid" style={{ marginTop: 0 }}>
      <Hero className="full-width"></Hero>
      <RenderBlocks blocks={layout}></RenderBlocks>
    </div>
  )
}

export const queryAboutMePateContent = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.findGlobal({
    slug: 'aboutMe',
  })

  return result
})
