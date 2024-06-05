import { FC, useState } from 'react'

import { MessageList } from '@/widgets/forum'

import { AddMessage } from '@/feature/forum'
import { Message } from '@/feature/forum/ui/AddMessage/AddMessage'

// TODO заменить на редакс по готовности редакса и данных с апишки
const DATA_FROM_REDUX = [
  { id: 1, message: 'Первое сообщение', autor: 'Автор1', date: '2024-06-03' },
  { id: 2, message: 'Второе сообщение', autor: 'Автор2', date: '2024-06-04' },
  { id: 3, message: 'Третье сообщение', autor: 'Автор3', date: '2024-06-05' }
]

const TopicDetailPage: FC = () => {
  const [messages, setMessages] = useState<Message[]>(DATA_FROM_REDUX)
  const [replyToId, setReplyToId] = useState<number | null>(null)

  return (
    <>
      <MessageList messages={messages} setReplyToId={setReplyToId} />
      <AddMessage replyToId={replyToId} messages={messages} setMessages={setMessages} setReplyToId={setReplyToId} />
    </>
  )
}

export default TopicDetailPage
