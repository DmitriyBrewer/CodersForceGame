import { FC, useState } from 'react'

import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'
import BasePaper from '@/shared/components/ui/BasePaper'

import styles from './TopicList.module.scss'

const DATA_FROM_REDUX = [
  { id: 1, title: 'Первый топик', autor: 'Автор1', lastMessageDate: '2024-06-03' },
  { id: 2, title: 'Второй топик', autor: 'Автор2', lastMessageDate: '2024-06-04' },
  { id: 3, title: 'Третий топик', autor: 'Автор3', lastMessageDate: '2024-06-05' }
]
export interface Title {
  id: number
  title: string
  autor: string
  lastMessageDate: string
}
const TopicList: FC = () => {
  const [topics, setTopics] = useState<Title[]>(DATA_FROM_REDUX)

  return (
    <BasePaper elevation={3} className={styles.paper}>
      {topics.map(topicItem => (
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
