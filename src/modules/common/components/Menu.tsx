'use client'

import React from 'react'

import styles from './Menu.module.css'
import { SvgLogo } from '@/modules/common/icons/SvgLogo'
import Button from '@/modules/common/ui/Button'
import ButtonGroup from '@/modules/common/ui/ButtonGroup'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Menu() {
  const pathName = usePathname()

  return (
    <nav className={styles.menu}>
      <div className={styles.menuContent}>
        <SvgLogo width={54} height={54}></SvgLogo>
        <div>
          <ButtonGroup>
            <Button leftCornerCut="bottom" active={pathName == '/'} asChild>
              <Link href="/">About me</Link>
            </Button>
            <Button active={pathName == '/design-system'} asChild>
              <Link href="/design-system">Tags</Link>
            </Button>
            <Button rightCornerCut="top">Blog</Button>
          </ButtonGroup>
        </div>
      </div>
    </nav>
  )
}

export default Menu
