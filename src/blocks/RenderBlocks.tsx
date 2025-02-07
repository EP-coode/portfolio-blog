import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { ContentBlock } from './Content/Component'

const contentBlocks = {
  content: ContentBlock,
}

export const RenderBlocks: React.FC<{ blocks: ContentBlockProps[] | null | undefined }> = ({
  blocks,
}) => {
  return (
    <div>
      {blocks?.map((data, index) => {
        const { richText, blockType } = data
        const Block = contentBlocks[blockType]

        if (!Block) return

        return richText && <Block data={richText} key={index}></Block>
      })}
    </div>
  )
}
