import React from 'react'
import Button, { ButtonProps } from '@/modules/common/ui/Button'

import styles from './ButtonGroup.module.css'

interface ButtonGroupProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactElement<typeof Button>[]
}

function ButtonGroup({ children, ...props }: ButtonGroupProps) {
  const modifiedChildren = React.Children.toArray(children).map((child, i) => {
    return React.isValidElement(child)
      ? React.cloneElement(child, { className: styles.buttonGroupButton } as ButtonProps)
      : child
  })

  return (
    <div className={styles.buttonGroup} {...props}>
      {modifiedChildren}
    </div>
  )
}

export default ButtonGroup
