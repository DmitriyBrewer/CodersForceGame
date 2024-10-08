import { FC, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useLazyGetCommentsQuery } from '@/shared/forum/api/forumApi'

import { AddComment } from '@/feature/social/forum'
import CommentList from '@/feature/social/forum/ui/CommentList'

const ForumTopicWidget: FC = () => {
  const [replyToId, setReplyToId] = useState<number | undefined>(undefined)
  const [getCommentsTrigger] = useLazyGetCommentsQuery()

  const { topicId } = useParams()

  useEffect(() => {
    getCommentsTrigger(Number(topicId))
  }, [getCommentsTrigger, topicId])

  return (
    <>
      <CommentList setReplyToId={setReplyToId} />
      <AddComment replyToId={replyToId} setReplyToId={setReplyToId} />
    </>
  )
}

export default ForumTopicWidget
