import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addMessage } from '@/entities/message/model'
import { getMessages } from '@/entities/message/model/selector'
import formatDate from '@/shared/utils/formatISODate'

const useMessage = (replyToId: number | null, setReplyToId: (id: number | null) => void) => {
  const [newMessage, setNewMessage] = useState<string>('')
  const messagesData = useSelector(getMessages)
  const dispatch = useDispatch()

  const handleAddMessage = () => {
    dispatch(
      addMessage({
        id: 6,
        autor: 'asd',
        date: formatDate(new Date().toISOString()),
        message: newMessage,
        replyToId: replyToId || undefined
      })
    )

    setNewMessage('')
    setReplyToId(null)
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
