import { FC, useState } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import BasePaper from '@/shared/components/ui/BasePaper'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'
import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'

import BaseTextField from '@/shared/components/ui/BaseTextField'

import styles from './TopicDetail.module.scss'

interface Message {
  id: number
  message: string
  autor: string
  date: string
  replyToId?: number | null
}

const DATA_FROM_REDUX = [
  { id: 1, message: 'Первое сообщение', autor: 'Автор1', date: '2024-06-03' },
  { id: 2, message: 'Второе сообщение', autor: 'Автор2', date: '2024-06-04' },
  { id: 3, message: 'Третье сообщение', autor: 'Автор3', date: '2024-06-05' }
]

const CURRENT_USER = 'Автор 4'

const TopicDetail: FC = () => {
  // TODO заменить на редакс по готовности редакса и данных с апишки
  const [messages, setMessages] = useState<Message[]>(DATA_FROM_REDUX)

  const [newMessage, setNewMessage] = useState<string>('')
  const [replyToId, setReplyToId] = useState<number | null>(null)

  const handleReply = (id: number) => {
    setReplyToId(id)
  }

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
  const getPrimaryText = (messageItem: Message) => {
    if (messageItem.replyToId) {
      const originalMessage = messages.find(m => m.id === messageItem.replyToId)?.message
      return `Ответ на: ${originalMessage}\n${messageItem.message}`
    }
    return messageItem.message
  }
  return (
    <BaseBox className={styles.container}>
      <BaseTypography className={styles.title} variant="h4" component="h2" gutterBottom>
        Название топика
      </BaseTypography>

      <BasePaper elevation={3} className={styles.paper}>
        {messages.map(messageItem => (
          <BaseListItemButton key={messageItem.id}>
            <BaseListItemText
              primary={getPrimaryText(messageItem)}
              secondary={`Автор ${messageItem.autor} | Дата: ${messageItem.date}`}
            />
            <BaseButton color="secondary" className={styles.reply} onClick={() => handleReply(messageItem.id)}>
              Ответить
            </BaseButton>
          </BaseListItemButton>
        ))}
      </BasePaper>
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
    </BaseBox>
  )
}

export default TopicDetail
