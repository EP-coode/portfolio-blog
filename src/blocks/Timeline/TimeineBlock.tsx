'use client'

import React from 'react'

import { TimeLine as TimelineBlockProps } from '@/payload-types'

import { RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react'

import styles from './TimelineBlock.module.css'
import { useIntersectionObserver } from '@/modules/common/hooks/useIntersectionObserver'
import clsx from 'clsx'
import Link from 'next/link'

import { format } from 'date-fns'

type TimeLineItemProps = NonNullable<TimelineBlockProps['timeLineItems']>[number]
const DATE_FORMAT = 'MMM yyyy'

export const TimelineBlock = (props: TimelineBlockProps) => {
  const { timeLineItems } = props
  return (
    <div className={styles.wrapper}>
      <div className={styles.timelineWrapper}>
        {timeLineItems?.map((item) => (
          <TimelineBlockItem {...item} key={item.id}></TimelineBlockItem>
        ))}
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
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-10%',
  })

  const startDateFormated = startDate ? format(new Date(startDate), DATE_FORMAT) : null
  const endDateFormated = endDate ? format(new Date(endDate), DATE_FORMAT) : 'now'

  return (
    <div className={clsx(styles.timeLineEntry, { [styles.animate]: isIntersecting })} ref={ref}>
      <div className={styles.timeRange}>
        {startDateFormated} - {endDateFormated}
      </div>
      <h4 className={styles.roleTitle}>{roleName}</h4>
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
