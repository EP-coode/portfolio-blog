import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

// import { Content } from './Content/config'
// import { ContentBlock } from './Content/Component'
// import { Field } from 'payload'

// const blocksComponents = {
//   content: ContentBlock,
// }

export const RenderBlocks: React.FC<{ blocks: ContentBlockProps[] | null | undefined }> = ({
  blocks,
}) => {
  return <div>{blocks?.map((p) => p?.text)}</div>
}
