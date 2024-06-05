import { FC, useState } from 'react'

import BaseDialog from '@/shared/components/ui/BaseDialog'
import BaseDialogTitle from '@/shared/components/ui/BaseDialogTitle'
import BaseDialogContent from '@/shared/components/ui/BaseDialogContent'
import BaseDialogActions from '@/shared/components/ui/BaseDialogActions'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseTextField from '@/shared/components/ui/BaseTextField'

import styles from './CreateTopicDialog.module.scss'

const CreateTopicDialog: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleCreate = () => {
    onClose()
  }

  return (
    <BaseDialog open={open} onClose={onClose}>
      <BaseDialogTitle className={styles.title} color="info">
        Новый топик
      </BaseDialogTitle>
      <BaseDialogContent>
        <BaseTextField label="Заголовок" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
        <BaseTextField
          label="Описание"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </BaseDialogContent>
      <BaseDialogActions>
        <BaseButton onClick={onClose} color="secondary">
          Отмена
        </BaseButton>
        <BaseButton onClick={handleCreate} color="primary" variant="contained">
          Создать топик
        </BaseButton>
      </BaseDialogActions>
    </BaseDialog>
  )
}

export default CreateTopicDialog
