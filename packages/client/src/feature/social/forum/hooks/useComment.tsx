import { ChangeEvent, FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import { getComments } from '@/entities/comment/model/selector'
import formatDate from '@/shared/utils/formatISODate'

import { getUser } from '@/entities/user/model/selector'

import { useAddCommentMutation } from '../api/forumApi'

interface Props {
  replyToId?: number
  setReplyToId: (id?: number) => void
}

const useComment = ({ replyToId, setReplyToId }: Props) => {
  const [newComment, setNewComment] = useState<string>('')
  const commentsData = useSelector(getComments)
  const author = useSelector(getUser)?.first_name

  const [addComment] = useAddCommentMutation()

  const { topicId } = useParams()

  const handleAddMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addComment({
      topicId: Number(topicId),
      author,
      date: formatDate(new Date().toISOString()),
      comment: newComment,
      replyToId: replyToId || undefined
    })

    setNewComment('')
    setReplyToId(undefined)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value)
  }

  return {
    newComment,
    commentsData,
    handleAddMessage,
    handleChange
  }
}

export default useComment
