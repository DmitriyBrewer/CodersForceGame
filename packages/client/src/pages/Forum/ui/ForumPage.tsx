import { FC } from 'react'

import { AddTopicButton, TopicList } from '@/widgets/forum'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseBox from '@/shared/components/ui/BaseBox'

import styles from './ForumPage.module.scss'

const ForumPage: FC = () => {
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

export default ForumPage
