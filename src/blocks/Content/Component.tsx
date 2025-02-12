import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react'

export function ContentBlock(props: ContentBlockProps) {
  const { richText } = props

  return richText && <RichTextWithoutBlocks data={richText}></RichTextWithoutBlocks>
}
