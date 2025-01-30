import React from 'react'

import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import styles from './Button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
  leftCornerCut?: 'top' | 'bottom'
  rightCornerCut?: 'top' | 'bottom'
  active?: boolean
  size?: 'sm' | 'md' | 'lg'
  cornerCutSize?: string
}

function getCornerCutPolygon(
  leftCornerCut?: 'top' | 'bottom',
  rightCornerCut?: 'top' | 'bottom',
): string {
  const cornerCuts = []

  if (leftCornerCut === 'top') {
    cornerCuts.push('0 var(--cornerCutSize)')
    cornerCuts.push('var(--cornerCutSize) 0')
  } else {
    cornerCuts.push('0 0')
  }

  if (rightCornerCut === 'top') {
    cornerCuts.push('calc(100% - var(--cornerCutSize)) 0')
    cornerCuts.push('100% var(--cornerCutSize)')
  } else {
    cornerCuts.push('100% 0')
  }

  if (rightCornerCut === 'bottom') {
    cornerCuts.push('100% calc(100% - var(--cornerCutSize))')
    cornerCuts.push('calc(100% - var(--cornerCutSize)) 100%')
  } else {
    cornerCuts.push('100% 100%')
  }

  if (leftCornerCut === 'bottom') {
    cornerCuts.push('var(--cornerCutSize) 100%')
    cornerCuts.push('0 calc(100% - var(--cornerCutSize))')
  } else {
    cornerCuts.push('0 100%')
  }

  return `polygon(${cornerCuts.join(',')})`
}

function Button({
  asChild,
  className,
  leftCornerCut,
  rightCornerCut,
  cornerCutSize = '14px',
  active = false,
  size = 'md',
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  const cornerCutPolygon = getCornerCutPolygon(leftCornerCut, rightCornerCut)

  return (
    <Comp
      role="button"
      style={
        { clipPath: cornerCutPolygon, '--cornerCutSize': cornerCutSize } as React.CSSProperties
      }
      className={clsx(className, styles.button, {
        [styles.leftCornerCutTop]: leftCornerCut == 'top',
        [styles.leftCornerCutBottom]: leftCornerCut == 'bottom',
        [styles.rightCornerCutTop]: rightCornerCut == 'top',
        [styles.rightCornerCutBottom]: rightCornerCut == 'bottom',
        [styles.active]: !!active,
        [styles.sm]: size == 'sm',
        [styles.lg]: size == 'lg',
      })}
      ref={ref}
      {...props}
    ></Comp>
  )
}

export default Button
