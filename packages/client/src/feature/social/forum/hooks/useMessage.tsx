import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addMessage } from '@/entities/message/model'
import { getMessages } from '@/entities/message/model/selector'
import formatDate from '@/shared/utils/formatISODate'

interface Props {
  replyToId?: number
  setReplyToId: (id?: number) => void
}

const useMessage = ({ replyToId, setReplyToId }: Props) => {
  const [newMessage, setNewMessage] = useState<string>('')
  const messagesData = useSelector(getMessages)
  const dispatch = useDispatch()

  const handleAddMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      addMessage({
        // TODO переехать на id с бэка
        id: 6,
        autor: 'asd',
        date: formatDate(new Date().toISOString()),
        message: newMessage,
        replyToId: replyToId || undefined
      })
    )

    setNewMessage('')
    setReplyToId(undefined)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value)
  }

  return {
    newMessage,
    messagesData,
    handleAddMessage,
    handleChange
  }
}

export default useMessage
