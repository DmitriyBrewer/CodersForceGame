import { FC } from 'react'

import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseBox from '@/shared/components/ui/BaseBox'

import TopicList from '../TopicList'
import styles from './ForumWidget.module.scss'
import AddTopicButton from '../AddTopicButton'

const ForumWidget: FC = () => {
  return (
    <BaseBox className={styles.root}>
      <BaseBox className={styles.header}>
        <BaseTypography variant="h4" component="h2" gutterBottom>
          Форум
        </BaseTypography>
        <AddTopicButton />
      </BaseBox>
      <TopicList />
    </BaseBox>
  )
}

export default ForumWidget
