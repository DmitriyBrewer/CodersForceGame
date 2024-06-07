import { FC } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseTextField from '@/shared/components/ui/BaseTextField'
import BaseButton from '@/shared/components/ui/BaseButton'

import styles from './AddMessage.module.scss'
import useMessage from '../../hooks/useMessage'

interface Props {
  setReplyToId: (id?: number) => void
  replyToId: number | undefined
}

const AddMessage: FC<Props> = ({ setReplyToId, replyToId }) => {
  const { newMessage, messagesData, handleAddMessage, handleChange } = useMessage({ replyToId, setReplyToId })

  const replyiedMessage = messagesData.find(m => m.id === replyToId)?.message

  return (
    <form onSubmit={handleAddMessage}>
      <BaseBox className={styles.root}>
        {replyToId && (
          <BaseBox className={styles.reply}>
            <BaseTypography variant="body2" color="textSecondary" gutterBottom>
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
          value={newMessage}
          required
        />
        <BaseButton type="submit" color="primary" variant="contained">
          Отправить
        </BaseButton>
      </BaseBox>
    </form>
  )
}

export default AddMessage
