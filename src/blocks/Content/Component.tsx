import React from 'react'

import { RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

// TODO: add handling of checklist block
export function ContentBlock(props: Props) {
  return <RichTextWithoutBlocks {...props}></RichTextWithoutBlocks>
}
