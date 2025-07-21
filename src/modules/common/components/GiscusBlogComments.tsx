'use client'

import Giscus from '@giscus/react'

export default function GiscusBlogComments() {
  return (
    <Giscus
      id="blog-comments"
      repo="EP-coode/portfolio-blog"
      repoId="R_kgDONtoTag"
      category="Blog comments"
      categoryId="DIC_kwDONtoTas4CtO34"
      mapping="og:title"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  )
}
