'use client'

import React, { useState } from 'react'
import { ClipboardCopyIcon } from '@radix-ui/react-icons'

import styles from './CopyButton.module.css'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export interface CodeBlockProps extends React.HTMLProps<HTMLDivElement> {
  code: string
}

export function CopyButton({ code, className, ...props }: CodeBlockProps) {
  const t = useTranslations('codeBlock')
  const [text, setText] = useState(t('copy'))

  function updateCopyStatus() {
    if (text === t('copy')) {
      setText(() => t('copied'))
      setTimeout(() => {
        setText(() => t('copy'))
      }, 1000)
    }
  }

  async function handleCoppyClick() {
    await navigator.clipboard.writeText(code)
    updateCopyStatus()
  }

  return (
    <div
      className={clsx(styles.copyButton, className)}
      onClick={() => handleCoppyClick()}
      {...props}
    >
      <ClipboardCopyIcon />
      <span>{text}</span>
    </div>
  )
}
