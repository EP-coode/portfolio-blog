import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { ContentBlock } from './Content/Component'
import { TechListBlock } from './TechList/TechListBlock'
import { TimelineBlock } from './Timeline/TimeineBlock'

const contentBlocks = {
  content: ContentBlock,
  techList: TechListBlock,
  timeLine: TimelineBlock,
}

export const RenderBlocks: React.FC<{ blocks: ContentBlockProps[] | null | undefined }> = ({
  blocks,
}) => {
  return (
    <div>
      {blocks?.map((data, index) => {
        const { blockType } = data
        const Block = contentBlocks[blockType]

        if (!Block) return

        return <Block {...data} key={index}></Block>
      })}
    </div>
  )
}
