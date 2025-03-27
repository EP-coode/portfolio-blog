import React from 'react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import BorderImage from '@/modules/common/ui/BorderImage'

const MediaBlock = ({ media, caption }: MediaBlockProps) => {
  return (
    media &&
    typeof media !== 'number' && <BorderImage media={media} caption={caption ?? undefined} />
  )
}

export default MediaBlock
