import { FC } from 'react'
import { useSelector } from 'react-redux'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'
import BasePaper from '@/shared/components/ui/BasePaper'
import BaseBox from '@/shared/components/ui/BaseBox'
import { Message } from '@/entities/message/types'
import { getMessages } from '@/entities/message/model/selector'

import styles from './MessageList.module.scss'

interface Props {
  setReplyToId: (id?: number) => void
}

const MessageList: FC<Props> = props => {
  const messagesData = useSelector(getMessages)
  const { setReplyToId } = props

  const getPrimaryText = (messageItem: Message) => {
    if (messageItem.replyToId) {
      const originalMessage = messagesData?.find(m => m.id === messageItem.replyToId)?.message
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
        {messagesData?.map(messageItem => (
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
