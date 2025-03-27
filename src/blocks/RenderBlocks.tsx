import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import type { TechListBlock as TechListBlockProps } from '@/payload-types'
import type { TimeLine as TimeLineBlockProps } from '@/payload-types'
import type { CodeBlock as CodeBlockProps } from '@/payload-types'
import type { MediaBlock as MediaBlockContent } from '@/payload-types'

import { ContentBlock } from './Content/Component'
import { TechListBlock } from './TechList/TechListBlock'
import { TimelineBlock } from './Timeline/TimeineBlock'

import styles from './RenderBlocks.module.css'
import MediaBlock from '@/blocks/Media/MediaBlock'
import CodeBlock from '@/blocks/Code/CodeBlock'

type ContentBlocks =
  | ContentBlockProps
  | TechListBlockProps
  | TimeLineBlockProps
  | CodeBlockProps
  | MediaBlockContent

const contentBlocks = {
  content: ContentBlock,
  techList: TechListBlock,
  timeLine: TimelineBlock,
  mediaBlock: MediaBlock,
  code: CodeBlock,
}

export const RenderBlocks: React.FC<{ blocks: ContentBlocks[] | null | undefined }> = ({
  blocks,
}) => {
  return (
    <div className={styles.blocksWrapper}>
      {blocks?.map((data, index) => {
        const { blockType } = data
        const Block = contentBlocks[blockType]

        if (!Block) return

        // TODO: solve this type error with type guards or something else
        // @ts-expect-error there may be some mismatch between the expected types here
        return <Block {...data} key={index}></Block>
      })}
    </div>
  )
}
