import React from 'react'
import style from './TechTag.module.css'

const TechTag = ({ color, content }: { color: string; content: string }) => {
  return (
    <span className={style.tag} style={{ '--tagColor': color } as React.CSSProperties}>
      {content}
    </span>
  )
}

export default TechTag
