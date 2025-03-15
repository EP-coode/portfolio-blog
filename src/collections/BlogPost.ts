import { CollectionConfig } from 'payload'
import {
  BoldFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { Content } from '@/blocks/Content/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/Media/config'

export const BlogPost: CollectionConfig = {
  slug: 'blog-post',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // TODO: create custom field for slug
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'shortDescription',
      type: 'richText',
      editor: lexicalEditor({
        features: ({}) => {
          return [BoldFeature(), ItalicFeature(), FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      type: 'relationship',
      hasMany: true,
      relationTo: 'post-tag',
      index: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [Content, Code, MediaBlock],
    },
  ],
}
