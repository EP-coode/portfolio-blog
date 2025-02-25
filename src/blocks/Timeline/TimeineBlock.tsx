'use client'

import React from 'react'

import Link from 'next/link'

import { TimeLine as TimelineBlockProps } from '@/payload-types'
import { RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react'
import clsx from 'clsx'
import { format } from 'date-fns'
import { pl, enUS } from 'date-fns/locale'
import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '@/i18n/routing'

import { useIntersectionObserver } from '@/modules/common/hooks/useIntersectionObserver'

import styles from './TimelineBlock.module.css'

const localeMap = {
  pl: pl,
  en: enUS,
}

type TimeLineItemProps = NonNullable<TimelineBlockProps['timeLineItems']>[number]
const DATE_FORMAT = 'MMM yyyy'

export const TimelineBlock = (props: TimelineBlockProps) => {
  const { timeLineItems } = props
  return (
    <div className={styles.blockWrapper}>
      <h2 className={styles.sectionTitle}>{props.title}</h2>
      <div className={styles.timelineAdditionalWrapper}>
        <div className={styles.timelineWrapper}>
          {timeLineItems?.map((item) => (
            <TimelineBlockItem {...item} key={item.id}></TimelineBlockItem>
          ))}
        </div>
      </div>
    </div>
  )
}

const TimelineBlockItem = ({
  description,
  endDate,
  roleName,
  startDate,
  companyName,
  companyLink,
}: TimeLineItemProps) => {
  const locale = useLocale() as Locale
  const t = useTranslations('timeline')
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-10%',
  })

  const startDateFormated = startDate
    ? format(new Date(startDate), DATE_FORMAT, { locale: localeMap[locale] })
    : null
  const endDateFormated = endDate
    ? format(new Date(endDate), DATE_FORMAT, { locale: localeMap[locale] })
    : t('now')

  return (
    <div className={clsx(styles.timeLineEntry, { [styles.animate]: isIntersecting })} ref={ref}>
      <div className={styles.timeRange}>
        {startDateFormated} - {endDateFormated}
      </div>
      <h3 className={styles.roleTitle}>{roleName}</h3>
      <Link
        className={styles.companyName}
        href={companyLink}
        rel="noopener noreferrer"
        target="_blank"
        title="discord"
      >
        {companyName}
      </Link>
      {description && (
        <RichTextWithoutBlocks
          data={description}
          className={styles.content}
        ></RichTextWithoutBlocks>
      )}
    </div>
  )
}
