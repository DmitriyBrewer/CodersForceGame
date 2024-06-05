import { FC, useState } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BasePaper from '@/shared/components/ui/BasePaper'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'
import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'

import styles from './TopicList.module.scss'
import CreateTopicDialog from '../CreateTopicDialog'

const TopicList: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <BaseBox className={styles.container}>
      <div className={styles.header}>
        <BaseTypography variant="h4" component="h2" gutterBottom>
          Форум
        </BaseTypography>
        <BaseButton
          variant="contained"
          color="primary"
          className={styles.createButton}
          onClick={handleOpenDialog} // Добавляем обработчик клика
        >
          Создать топик
        </BaseButton>
      </div>
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
      <CreateTopicDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </BaseBox>
  )
}

export default TopicList
