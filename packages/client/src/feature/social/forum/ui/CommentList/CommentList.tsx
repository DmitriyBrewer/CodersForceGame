import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { EmojiClickData } from 'emoji-picker-react'

import BaseButton from '@/shared/components/ui/BaseButton'
import BaseListItemButton from '@/shared/components/ui/BaseListItemButton'
import BaseListItemText from '@/shared/components/ui/BaseListItemText'
import BaseBox from '@/shared/components/ui/BaseBox'
import { Comment } from '@/shared/forum/types'
import { getComments } from '@/entities/comment/model/selector'
import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'

import EmojiSelector from '@/feature/social/forum/ui/EmojiSelector'
import styles from './CommentList.module.scss'
import EmojiDisplay from '@/feature/social/forum/ui/EmojiDisplay'

interface Props {
  setReplyToId: (id?: number) => void
}

const CommentList: FC<Props> = props => {
  const messagesData = useSelector(getComments)
  const { setReplyToId } = props

  const [emojiPickerOpenId, setEmojiPickerOpenId] = useState<number | null>(null)
  const [reactions, setReactions] = useState<{ [key: number]: { [emoji: string]: number } }>({})

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

  const handleEmojiClick = (id: number, emojiData: EmojiClickData) => {
    setReactions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [emojiData.emoji]: (prev[id]?.[emojiData.emoji] || 0) + 1
      }
    }))
    setEmojiPickerOpenId(null)
  }

  const handleEmojiRemove = (id: number, emoji: string) => {
    setReactions(prev => {
      const updatedReactions = { ...prev }
      if (updatedReactions[id]?.[emoji]) {
        updatedReactions[id][emoji] -= 1
        if (updatedReactions[id][emoji] === 0) {
          delete updatedReactions[id][emoji]
        }
      }
      return updatedReactions
    })
  }

  const toggleEmojiPicker = (id: number) => {
    setEmojiPickerOpenId(prev => (prev === id ? null : id))
  }

  return (
    <BaseBox className={styles.root}>
      <BasePaperPolymorphic elevation={3} className={styles.paper}>
        {messagesData?.map(messageItem => (
          <div key={messageItem.id} className={styles.commentItem}>
            <BaseListItemButton>
              <BaseListItemText
                primary={<div style={{ whiteSpace: 'pre-line' }}>{getPrimaryText(messageItem)}</div>}
                secondary={`Автор ${messageItem.author} | Дата: ${messageItem.date}`}
              />
              <div className={styles.actions}>
                <BaseButton color="secondary" className={styles.reply} onClick={() => handleReply(messageItem.id)}>
                  Ответить
                </BaseButton>
                <BaseButton color="primary" className={styles.react} onClick={() => toggleEmojiPicker(messageItem.id)}>
                  Реагировать
                </BaseButton>
              </div>
            </BaseListItemButton>
            {emojiPickerOpenId === messageItem.id && (
              <EmojiSelector onEmojiClick={emojiData => handleEmojiClick(messageItem.id, emojiData)} />
            )}
            {reactions[messageItem.id] && (
              <div className={styles.reactions}>
                <EmojiDisplay
                  reactions={reactions[messageItem.id]}
                  onRemove={emoji => handleEmojiRemove(messageItem.id, emoji)}
                />
              </div>
            )}
          </div>
        ))}
      </BasePaperPolymorphic>
    </BaseBox>
  )
}

export default CommentList
