import { FC } from 'react'

import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'
import BasePaper from '@/shared/components/ui/BasePaper'

import styles from './TopicList.module.scss'

const TopicList: FC = () => {
  // TODO заменить на данные с бэка
  return (
    <BasePaper elevation={3} className={styles.paper}>
      <BaseListItemButton>
        <BaseListItemText primary="Первый топик" secondary="Автор: Автор1 | Последнее сообщение: 2024-06-03" />
      </BaseListItemButton>
      <BaseListItemButton>
        <BaseListItemText primary="Второй топик" secondary="Автор: Автор2 | Последнее сообщение: 2024-06-04" />
      </BaseListItemButton>
      <BaseListItemButton>
        <BaseListItemText primary="Третий топик" secondary="Автор: Автор3 | Последнее сообщение: 2024-06-05" />
      </BaseListItemButton>
    </BasePaper>
  )
}
export default TopicList
