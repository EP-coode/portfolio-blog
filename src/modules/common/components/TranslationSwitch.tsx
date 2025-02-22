'use client'

import React from 'react'

import { Link } from '@/i18n/routing'

import styles from './TranslationSwitch.module.css'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export const TranslationSwitch = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => {
  const path = usePathname()

  return (
    <div className={clsx(className, styles.wrapper)} {...props}>
      <Link
        className={clsx(styles.item, {
          [styles.itemActive]: path.startsWith('/en'),
        })}
        locale="en"
        href={'./'}
      >
        EN
      </Link>
      <Link
        className={clsx(styles.item, {
          [styles.itemActive]: path.startsWith('/pl'),
        })}
        locale="pl"
        href={'./'}
      >
        PL
      </Link>
    </div>
  )
}
