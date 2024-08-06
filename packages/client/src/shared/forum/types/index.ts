export type Comment = {
  id: number
  comment: string
  author: string
  date: string
  replyToId?: number
}

interface Topic {
  id: number
  title: string
  author: string
  lastMessageDate: string
}

export interface NewTopic {
  title: string
  author: string
  content: string
}

export type GetTopicsResponse = Topic[]

export interface AddCommentRequest {
  topicId: number
  comment: string
  author?: string
  date: string
  replyToId?: number
}
