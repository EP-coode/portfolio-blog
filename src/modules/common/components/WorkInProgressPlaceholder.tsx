import React from 'react'

import styles from './WorkInProgressPlaceholder.module.css'
import { RulerSquareIcon } from '@radix-ui/react-icons'

export const WorkInProgressPlaceholder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <RulerSquareIcon width={40} height={40}></RulerSquareIcon>
        <div>Work in progress...</div>
        <div>Please visit later</div>
      </div>
    </div>
  )
}
