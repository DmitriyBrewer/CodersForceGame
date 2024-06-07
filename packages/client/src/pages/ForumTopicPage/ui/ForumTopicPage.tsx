import { FC, useState } from 'react'

import { MessageList } from '@/widgets/forum'

import { AddMessage } from '@/feature/forum'

const ForumTopicPage: FC = () => {
  const [replyToId, setReplyToId] = useState<number | undefined>(undefined)

  return (
    <>
      <MessageList setReplyToId={setReplyToId} />
      <AddMessage replyToId={replyToId} setReplyToId={setReplyToId} />
    </>
  )
}

export default ForumTopicPage
