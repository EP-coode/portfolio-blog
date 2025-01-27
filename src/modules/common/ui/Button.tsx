import React from 'react'

import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import styles from './Button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

function Button({ asChild, className, ref, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={clsx({ className }, styles.button)} ref={ref} {...props}></Comp>
}

export default Button
