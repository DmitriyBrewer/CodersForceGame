import { FC, Dispatch, SetStateAction } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseTextField from '@/shared/components/ui/BaseTextField'
import BaseButton from '@/shared/components/ui/BaseButton'

import styles from './AddMessage.module.scss'
import useMessage from '../../hooks/useMessage'

interface Props {
  // eslint-disable-next-line react/require-default-props
  replyToId?: number | null
  setReplyToId: Dispatch<SetStateAction<number | null>>
}

const AddMessage: FC<Props> = ({ replyToId = null, setReplyToId }) => {
  const { newMessage, messagesData, handleAddMessage, handleChange } = useMessage(replyToId, setReplyToId)

  const replyiedMessage = messagesData.find(m => m.id === replyToId)?.message

  return (
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
      />
      <BaseButton color="primary" variant="contained" onClick={handleAddMessage}>
        Отправить
      </BaseButton>
    </BaseBox>
  )
}

export default AddMessage
