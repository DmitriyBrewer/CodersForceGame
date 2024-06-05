/* eslint-disable react/require-default-props */
import { Dispatch, FC, SetStateAction, useState } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseTextField from '@/shared/components/ui/BaseTextField'
import BaseButton from '@/shared/components/ui/BaseButton'

import styles from './AddMessage.module.scss'

export interface Message {
  id: number
  message: string
  autor: string
  date: string
  replyToId?: number | null
}

interface Props {
  replyToId?: number | null
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  setReplyToId: Dispatch<SetStateAction<number | null>>
}

const CURRENT_USER = 'Автор 4'

const AddMessage: FC<Props> = props => {
  const { replyToId, messages, setMessages, setReplyToId } = props

  const [newMessage, setNewMessage] = useState<string>('')

  const handleAddMessage = () => {
    // TODO запрос к апи за айди сообщения
    setMessages(prev => {
      const newMessages = [...prev]
      newMessages.push({
        id: newMessages.length + 1,
        autor: CURRENT_USER,
        date: new Date().toISOString(),
        message: newMessage,
        replyToId: replyToId || undefined
      })

      return newMessages
    })

    setNewMessage('')
    setReplyToId(null)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value)
  }

  return (
    <BaseBox className={styles.reply}>
      {replyToId && (
        <BaseTypography variant="body2" color="textSecondary" gutterBottom>
          Ответ на: {messages.find(m => m.id === replyToId)?.message}
        </BaseTypography>
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
      <BaseButton color="primary" variant="contained" className={styles.comment} onClick={handleAddMessage}>
        Отправить
      </BaseButton>
    </BaseBox>
  )
}

export default AddMessage
