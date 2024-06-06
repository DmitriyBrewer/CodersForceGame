import { FC, useState } from 'react'

import { useSelector } from 'react-redux'

import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'
import BasePaper from '@/shared/components/ui/BasePaper'

import { Topic } from '@/entities/topic/types'

import { getTopics } from '@/entities/topic/model/selector'

import styles from './TopicList.module.scss'

const TopicList: FC = () => {
  const topicsData = useSelector(getTopics)

  return (
    <BasePaper elevation={3} className={styles.paper}>
      {topicsData?.map(topicItem => (
        <BaseListItemButton key={topicItem.id}>
          <BaseListItemText
            primary={topicItem.title}
            secondary={`Автор ${topicItem.autor} | Дата: ${topicItem.lastMessageDate}`}
          />
        </BaseListItemButton>
      ))}
    </BasePaper>
  )
}
export default TopicList
