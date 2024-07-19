import { FC, useState } from 'react'

import { useSelector } from 'react-redux'

import BaseDialog from '@/shared/components/ui/BaseDialog'
import BaseDialogTitle from '@/shared/components/ui/BaseDialogTitle'
import BaseDialogContent from '@/shared/components/ui/BaseDialogContent'
import BaseDialogActions from '@/shared/components/ui/BaseDialogActions'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseTextField from '@/shared/components/ui/BaseTextField'

import BaseBox from '@/shared/components/ui/BaseBox'

import { getUserName } from '@/entities/user/model/selector'

import styles from './CreateTopicDialog.module.scss'
import { useCreateTopicMutation } from '../../api/forumApi'

const CreateTopicDialog: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const userName = useSelector(getUserName)

  const [createTopic] = useCreateTopicMutation()

  const handleCreate = async () => {
    try {
      await createTopic({ title, autor: userName || 'Current User', content: description }).unwrap()
      onClose()
    } catch (error) {
      console.error('Failed to create topic: ', error)
    }
  }
  return (
    <BaseDialog open={open} onClose={onClose}>
      <BaseBox className={styles.wrapper}>
        <BaseDialogTitle color="info">Новый топик</BaseDialogTitle>
      </BaseBox>
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
