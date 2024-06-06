import { Dispatch, FC, SetStateAction, useState } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'
import BasePaper from '@/shared/components/ui/BasePaper'

import BaseBox from '@/shared/components/ui/BaseBox'

import styles from './MessageList.module.scss'
import { Message } from '@/feature/forum/ui/AddMessage/addMessage'

interface Props {
  messages: Message[]
  setReplyToId: Dispatch<SetStateAction<number | null>>
}

const MessageList: FC<Props> = props => {
  const { messages, setReplyToId } = props
  const getPrimaryText = (messageItem: Message) => {
    if (messageItem.replyToId) {
      const originalMessage = messages.find(m => m.id === messageItem.replyToId)?.message
      return `Ответ на: ${originalMessage}\n${messageItem.message}`
    }
    return messageItem.message
  }

  const handleReply = (id: number) => {
    setReplyToId(id)
  }

  return (
    <BaseBox className={styles.root}>
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
    </BaseBox>
  )
}

export default MessageList
