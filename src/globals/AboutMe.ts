import { Content } from '@/blocks/Content/config'
// import { dynamicBlocks } from '@/blocks/RenderBlocks'
import { GlobalConfig } from 'payload'

export const AboutMe: GlobalConfig = {
  slug: 'aboutMe',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Content],
      label: 'Content',
    },
  ],
}
