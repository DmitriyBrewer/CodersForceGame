import { FC } from 'react'
import { useSelector } from 'react-redux'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'
import BaseBox from '@/shared/components/ui/BaseBox'
import { Comment } from '@/entities/comment/types'
import { getComments } from '@/entities/comment/model/selector'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import styles from './CommentList.module.scss'

interface Props {
  setReplyToId: (id?: number) => void
}

const CommentList: FC<Props> = props => {
  const messagesData = useSelector(getComments)
  const { setReplyToId } = props

  const getPrimaryText = (messageItem: Comment) => {
    if (messageItem.replyToId) {
      const originalMessage = messagesData?.find(m => m.id === messageItem.replyToId)?.comment
      return `Ответ на: ${originalMessage}\n${messageItem.comment}`
    }
    return messageItem.comment
  }

  const handleReply = (id: number) => {
    setReplyToId(id)
  }

  return (
    <BaseBox className={styles.root}>
      <BasePaperPolymorphic elevation={3} className={styles.paper}>
        {messagesData?.map(messageItem => (
          <BaseListItemButton key={messageItem.id}>
            <BaseListItemText
              primary={<div style={{ whiteSpace: 'pre-line' }}>{getPrimaryText(messageItem)}</div>}
              secondary={`Автор ${messageItem.author} | Дата: ${messageItem.date}`}
            />
            <BaseButton color="secondary" className={styles.reply} onClick={() => handleReply(messageItem.id)}>
              Ответить
            </BaseButton>
          </BaseListItemButton>
        ))}
      </BasePaperPolymorphic>
    </BaseBox>
  )
}

export default CommentList
