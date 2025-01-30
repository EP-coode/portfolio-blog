'use client'

import React, { useLayoutEffect, useState } from 'react'

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(1)

  useLayoutEffect(() => {
    const onWindowScroll = () => {
      setScrollProgress(window.scrollY)
    }

    window.addEventListener('scroll', onWindowScroll)

    return () => window.removeEventListener('scroll', onWindowScroll)
  })

  useLayoutEffect(() => {
    const onWindowResize = () => {
      setScrollHeight(window.scrollY)
    }

    window.addEventListener('resize', onWindowResize)

    return () => window.removeEventListener('resize', onWindowResize)
  })

  return scrollProgress / scrollHeight
}
