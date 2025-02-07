import React from 'react'
import styles from './Footer.module.css'
import {
  DiscordLogoIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import clsx from 'clsx'

function Footer() {
  return (
    <footer className={clsx(styles.footer, 'content-grid')}>
      <div className={clsx(styles.footerContentWrapper, 'content')}>
        <div className={styles.linkContainer}>
          <Link
            href="https://github.com/EP-coode"
            rel="noopener noreferrer"
            target="_blank"
            title="github"
          >
            <GitHubLogoIcon className={styles.linkIcon}></GitHubLogoIcon>
          </Link>
          <Link
            href="https://www.linkedin.com/in/ernestprzybyl/"
            rel="noopener noreferrer"
            target="_blank"
            title="linkedin"
          >
            <LinkedInLogoIcon className={styles.linkIcon}></LinkedInLogoIcon>
          </Link>
          <a href="mailto:admin@eprzybyl.eu" title="email">
            <EnvelopeClosedIcon className={styles.linkIcon}></EnvelopeClosedIcon>
          </a>
          <Link
            href="https://discord.com/users/672869766763118592/"
            rel="noopener noreferrer"
            target="_blank"
            title="discord"
          >
            <DiscordLogoIcon className={styles.linkIcon}></DiscordLogoIcon>
          </Link>
        </div>
        <div className={styles.footerCopyRight}> © 2025 All Rights Reserved Ernest Przybył</div>
      </div>
    </footer>
  )
}

export default Footer
