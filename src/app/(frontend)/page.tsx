import Hero from '@/modules/common/components/Hero'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export default async function HomePage() {
  const aboutMeData = await queryAboutMePateContent()
  const layoutData = aboutMeData.layout

  return (
    <div>
      <Hero></Hero>
      <RenderBlocks blocks={layoutData}></RenderBlocks>
    </div>
  )
}

const queryAboutMePateContent = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.findGlobal({
    slug: 'aboutMe',
  })

  return result
})
