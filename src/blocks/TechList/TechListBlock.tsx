import { TechListBlock as TechListBlockProps } from '@/payload-types'
import React from 'react'
import Image from 'next/image'

import styles from './TechListBlock.module.css'

export const TechListBlock = (params: TechListBlockProps) => {
  const { techListItems } = params
  return (
    <div>
      <h2>{params.title}</h2>
      <div className={styles.listWrapper}>
        {techListItems?.map(({ displayName, id, techIcon }) => {
          let techIconComp = null

          if (!!techIcon && typeof techIcon !== 'number' && techIcon.url) {
            techIconComp = (
              <div className={styles.itemIconWrapper}>
                <Image
                  src={techIcon.url}
                  alt={techIcon.alt}
                  className={styles.itemIcon}
                  fill
                  unoptimized={true}
                ></Image>
              </div>
            )
          }

          return (
            <div key={id} className={styles.itemWrapper}>
              {techIconComp}
              <span className={styles.itemLabel}>{displayName}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
