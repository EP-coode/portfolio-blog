import React from 'react'
import { ButtonProps } from '@/modules/common/ui/Button'

import styles from './ButtonGroup.module.css'
import clsx from 'clsx'

interface ButtonGroupProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode[]
}

function ButtonGroup({ children, ...props }: ButtonGroupProps) {
  const modifiedChildren = React.Children.toArray(children).map((child, i) => {
    if (!React.isValidElement(child)) return child

    const childProps = child.props as ButtonProps

    return React.cloneElement(child, {
      className: clsx(childProps.className ?? '', styles.buttonGroupButton),
    } as ButtonProps)
  })

  return (
    <div className={styles.buttonGroup} {...props}>
      {modifiedChildren}
    </div>
  )
}

export default ButtonGroup
