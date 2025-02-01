// import {
//   lexicalEditor,
//   HeadingFeature,
//   FixedToolbarFeature,
//   InlineToolbarFeature,
// } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

// export const columnFields: Field[] = [
//   {
//     name: 'text',
//     type: 'text',
//   },
// ]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'text',
      type: 'text',
      //   editor: lexicalEditor({
      //     features: ({ rootFeatures }) => {
      //       return [
      //         ...rootFeatures,
      //         HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
      //         FixedToolbarFeature(),
      //         InlineToolbarFeature(),
      //       ]
      //     },
      //   }),
      //   label: false,
    },
  ],
}
