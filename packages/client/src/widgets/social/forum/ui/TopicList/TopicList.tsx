import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'

import { getTopics } from '@/entities/topic/model/selector'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import { useLazyGetTopicsQuery } from '@/feature/social/forum/api/forumApi'

import styles from './TopicList.module.scss'

const TopicList: FC = () => {
  const [getTopicsTrigger] = useLazyGetTopicsQuery()

  useEffect(() => {
    getTopicsTrigger()
  }, [getTopicsTrigger])

  const topicsData = useSelector(getTopics)
  const navigate = useNavigate()

  const handleClick = (id: number) => {
    navigate(String(id))
  }

  return (
    <BasePaperPolymorphic elevation={3} className={styles.paper}>
      {topicsData?.map(topicItem => (
        <BaseListItemButton key={topicItem.id} onClick={() => handleClick(topicItem.id)}>
          <BaseListItemText
            primary={topicItem.title}
            secondary={`Автор ${topicItem.author} | Дата: ${topicItem.lastMessageDate}`}
          />
        </BaseListItemButton>
      ))}
    </BasePaperPolymorphic>
  )
}

export default TopicList
