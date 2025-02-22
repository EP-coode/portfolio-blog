import React from 'react'

import { useTranslations } from 'next-intl'

import styles from './WorkInProgressPlaceholder.module.css'
import { RulerSquareIcon } from '@radix-ui/react-icons'

export const WorkInProgressPlaceholder = () => {
  const t = useTranslations('workInProgressPage')

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <RulerSquareIcon width={40} height={40}></RulerSquareIcon>
        <div>{t('line1')}</div>
        <div>{t('line2')}</div>
      </div>
    </div>
  )
}
