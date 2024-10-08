import { FC } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseTextField from '@/shared/components/ui/BaseTextField'
import BaseButton from '@/shared/components/ui/BaseButton'

import useMessage from '../../hooks/useComment'

import styles from './AddComment.module.scss'

interface Props {
  setReplyToId: (id?: number) => void
  replyToId: number | undefined
}

const AddComment: FC<Props> = ({ setReplyToId, replyToId }) => {
  const { newComment, commentsData, handleAddMessage, handleChange } = useMessage({ replyToId, setReplyToId })

  const replyiedMessage = commentsData.find(m => m.id === replyToId)?.comment

  return (
    <BaseBox component="form" onSubmit={handleAddMessage}>
      <BaseBox className={styles.root}>
        {replyToId && (
          <BaseBox className={styles.reply}>
            <BaseTypography className={styles.replyTo} variant="body2" color="textSecondary" gutterBottom>
              Ответ на: {replyiedMessage}
            </BaseTypography>
          </BaseBox>
        )}
        <BaseTextField
          color="info"
          label="Добавить комментарий"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          onChange={handleChange}
          value={newComment}
          required
        />
        <BaseButton type="submit" color="primary" variant="contained">
          Отправить
        </BaseButton>
      </BaseBox>
    </BaseBox>
  )
}

export default AddComment
