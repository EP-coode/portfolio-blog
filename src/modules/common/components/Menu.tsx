'use client'

import React from 'react'

import styles from './Menu.module.css'

import { SvgLogo } from '@/modules/common/icons/SvgLogo'
import Button from '@/modules/common/ui/Button'
import ButtonGroup from '@/modules/common/ui/ButtonGroup'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export interface MenuProps extends React.HTMLProps<HTMLDivElement> {}

function Menu({ className, ...props }: MenuProps) {
  const pathName = usePathname()

  return (
    <nav className={clsx(styles.menu, className)} {...props}>
      <div className={styles.menuContent}>
        <div className={styles.menuLogo}>
          <Link href="/" className={clsx(styles.logoLink, 'svgDrawLogoAnimation')}>
            <SvgLogo className={styles.logoImg}></SvgLogo>
          </Link>
          <span className={styles.logoText}>Ernest Przybył</span>
        </div>
        <div>
          <ButtonGroup>
            <Button
              className={styles.menuButton}
              leftCornerCut="bottom"
              active={pathName == '/'}
              asChild
            >
              <Link href="/">About me</Link>
            </Button>
            <Button className={styles.menuButton} active={pathName == '/design-system'} asChild>
              <Link href="/design-system">Tags</Link>
            </Button>
            <Button className={styles.menuButton} rightCornerCut="top">
              Blog
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </nav>
  )
}

export default Menu
