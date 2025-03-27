import React from 'react'

import { BlogTileType } from '@/app/(frontend)/[locale]/blog/page'
import clsx from 'clsx'
import Image from 'next/image'

import style from './BlogPostTile.module.css'
import { RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react'
import { format } from 'date-fns'
import { useLocale } from 'next-intl'
import { dateFormattersMap, Link, Locale } from '@/i18n/routing'
import TechTag from '@/modules/common/ui/TechTag'

const DATE_FORMAT = 'd MMMM yyyy'

export interface IBlogTileProps extends React.HTMLProps<HTMLAnchorElement> {
  tileData: BlogTileType
}

const BlogPostTile = ({ tileData, className, ...props }: IBlogTileProps) => {
  const locale = useLocale() as Locale

  const heroImgUrl =
    !!tileData.heroImage && typeof tileData.heroImage !== 'number' && tileData.heroImage.url
      ? tileData.heroImage?.sizes?.medium?.url || tileData.heroImage.url
      : null

  const heroImgAlt =
    !!tileData.heroImage && typeof tileData.heroImage !== 'number' ? tileData.heroImage.alt : null

  const formatedPubDate = format(new Date(tileData.createdAt), DATE_FORMAT, {
    locale: dateFormattersMap[locale],
  })

  const tags = tileData.tags?.filter((t) => typeof t !== 'number') ?? []

  return (
    <Link
      href={`/blog/${tileData.slug}`}
      className={clsx(className, style.tileWrapper)}
      prefetch={true}
      {...props}
    >
      <div className={style.imageWrapper}>
        {heroImgUrl && heroImgAlt && <Image src={heroImgUrl} alt={heroImgAlt} fill></Image>}
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <span className={style.blogIdFlag}>//Blog/00{tileData.id}...</span>
      </div>

      <div className={style.tileContent}>
        <div className={style.tagContainer}>
          {tags.map((tag) => (
            <TechTag color={tag.tagColor} content={tag.tagLabel} key={tag.id}></TechTag>
          ))}
        </div>
        <h2> {tileData.title} </h2>
        <RichTextWithoutBlocks data={tileData.shortDescription}></RichTextWithoutBlocks>
        <div className={style.footer}>
          <p className={style.date}>{formatedPubDate}</p>
        </div>
      </div>
    </Link>
  )
}

export default BlogPostTile
