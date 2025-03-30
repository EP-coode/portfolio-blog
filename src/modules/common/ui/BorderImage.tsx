import React from 'react'

import { Media } from '@/payload-types'
// import Image from 'next/image'

import styles from './BorderImage.module.css'

const BorderImage = ({ media, caption }: { media: Media; caption?: string }) => {
  const aspectRatio = (media?.width || 1) / (media?.height || 1)

  const imgSrc = media?.sizes?.large?.url || media?.sizes?.medium?.url || media?.url || ''
  return (
    <figure className={styles.figure}>
      <div className={styles.mediaBlockWrapper} style={{ width: '100%', aspectRatio: aspectRatio }}>
        {media?.thumbnailURL}
        <img src={imgSrc} alt={media?.alt || ''} className={styles.mediaBlock}></img>
      </div>
      {caption && <div className={styles.caption}>{caption}</div>}
    </figure>
  )
}

export default BorderImage
