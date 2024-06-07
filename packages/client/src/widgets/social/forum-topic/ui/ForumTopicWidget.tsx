import { FC, useState } from 'react'

import { AddMessage } from '@/feature/social/forum'
import MessageList from '@/feature/social/forum/ui/MessageList'

const ForumTopicWidget: FC = () => {
  const [replyToId, setReplyToId] = useState<number | undefined>(undefined)

  return (
    <>
      <MessageList setReplyToId={setReplyToId} />
      <AddMessage replyToId={replyToId} setReplyToId={setReplyToId} />
    </>
  )
}

export default ForumTopicWidget
