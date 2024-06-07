import { FC } from 'react'

import { useSelector } from 'react-redux'

import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'

import { getTopics } from '@/entities/topic/model/selector'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import styles from './TopicList.module.scss'

const TopicList: FC = () => {
  const topicsData = useSelector(getTopics)

  return (
    <BasePaperPolymorphic elevation={3} className={styles.paper}>
      {topicsData?.map(topicItem => (
        <BaseListItemButton key={topicItem.id}>
          <BaseListItemText
            primary={topicItem.title}
            secondary={`Автор ${topicItem.autor} | Дата: ${topicItem.lastMessageDate}`}
          />
        </BaseListItemButton>
      ))}
    </BasePaperPolymorphic>
  )
}
export default TopicList
