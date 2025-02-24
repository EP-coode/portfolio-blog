'use client'

import React from 'react'
// import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

// import { useLocale } from '@/modules/common/hooks/useLocale'
import { SvgLogo } from '@/modules/common/icons/SvgLogo'
import Button from '@/modules/common/ui/Button'
import ButtonGroup from '@/modules/common/ui/ButtonGroup'

import { Link } from '@/i18n/routing'

import styles from './Menu.module.css'
import { useLocale, useTranslations } from 'next-intl'

function Menu({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
  const pathName = usePathname()
  const locale = useLocale()
  const t = useTranslations('menu')

  return (
    <nav className={clsx(styles.menu, className)} {...props}>
      <div className={styles.menuContent}>
        <div className={styles.menuLogo}>
          <Link href="/" className={clsx(styles.logoLink, 'svgDrawLogoAnimation')} title="home">
            <SvgLogo className={styles.logoImg}></SvgLogo>
          </Link>
          <span className={styles.logoText}>Ernest Przybył</span>
        </div>
        <div>
          <ButtonGroup>
            <Button
              className={styles.menuButton}
              leftCornerCut="bottom"
              active={pathName === `/${locale}`}
              asChild
            >
              <Link href="/" title="home" locale={locale}>
                {t('aboutMe')}
              </Link>
            </Button>
            <Button className={styles.menuButton} active={pathName == `/${locale}/tags`} asChild>
              <Link href="/tags" title="tags" locale={locale}>
                {t('tags')}
              </Link>
            </Button>
            <Button
              className={styles.menuButton}
              active={pathName == `/${locale}/blog`}
              rightCornerCut="top"
              asChild
            >
              <Link href="/blog" title="blog" locale={locale}>
                {t('blog')}
              </Link>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </nav>
  )
}

export default Menu
