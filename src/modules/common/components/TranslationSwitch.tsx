'use client'

import React from 'react'

import { Link, SUPPORTED_LOCALES } from '@/i18n/routing'

import styles from './TranslationSwitch.module.css'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export const TranslationSwitch = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => {
  const path = usePathname()
  const delocalizedPath = path.split('/').slice(2).join('/')

  return (
    <div className={clsx(className, styles.wrapper)} {...props}>
      {SUPPORTED_LOCALES.map((locale) => (
        <Link
          className={clsx(styles.item, {
            [styles.itemActive]: path.startsWith(`/${locale}`),
          })}
          locale={locale}
          href={`/${delocalizedPath}`}
          key={locale}
        >
          {locale}
        </Link>
      ))}
    </div>
  )
}
