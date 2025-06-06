import { GlobalConfig } from 'payload'

import { Content } from '@/blocks/Content/config'
import { TechList } from '@/blocks/TechList/config'

import {
  MetaDescriptionField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { TimeLine } from '@/blocks/Timeline/config'

export const AboutMe: GlobalConfig = {
  slug: 'aboutMe',
  versions: {
    drafts: true,
    max: 50,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Content, TechList, TimeLine],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),

            MetaTitleField({
              hasGenerateFn: true,
            }),

            MetaDescriptionField({}),

            {
              type: 'text',
              name: 'keywords',
            },

            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
}
