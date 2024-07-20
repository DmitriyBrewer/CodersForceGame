import express, { Request, Response } from 'express'

const router = express.Router()

interface Topic {
  id: number
  title: string
  author: string
  lastMessageDate: string
  content: string
}

export interface Comment {
  id: number
  comment: string
  author: string
  date: string
  topicId: number
  replyToId?: number
}

/// TODO: заменить на реальную бд feature/cfg-96
const INITIAL_TOPICS = [
  { id: 1, title: 'Первый топик', author: 'Автор1', lastMessageDate: '2024-06-03', content: 'test1' },
  { id: 2, title: 'Второй топик', author: 'Автор2', lastMessageDate: '2024-06-04', content: 'test2' },
  { id: 3, title: 'Третий топик', author: 'Автор3', lastMessageDate: '2024-06-05', content: 'test3' }
]

const INITIAL_COMMENTS = {
  1: [
    { id: 1, comment: '1Первое сообщение', author: 'Автор1', date: '2024-06-03', topicId: 1 },
    { id: 2, comment: '1Второе сообщение', author: 'Автор2', date: '2024-06-04', topicId: 1 },
    { id: 3, comment: '1Третье сообщение', author: 'Автор3', date: '2024-06-05', topicId: 1 }
  ],
  2: [
    { id: 1, comment: '2Первое сообщение', author: 'Автор1', date: '2024-06-03', topicId: 2 },
    { id: 2, comment: '2Второе сообщение', author: 'Автор2', date: '2024-06-04', topicId: 2 },
    { id: 3, comment: '2Третье сообщение', author: 'Автор3', date: '2024-06-05', topicId: 2 }
  ]
}

function formatDate(isoDate: string) {
  const date = new Date(isoDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}

interface Data {
  topics: Topic[]
  comments: Record<number, Comment[]>
}

export const data: Data = {
  topics: INITIAL_TOPICS,
  comments: INITIAL_COMMENTS
}

router.get('/', (_req: Request, res: Response) => {
  res.json(data.topics)
})

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const topic = data.topics.find(t => t.id === parseInt(id, 10))
  if (topic) {
    res.json(topic)
  } else {
    res.status(404).json({ error: 'Topic not found' })
  }
})

router.post('/', (req: Request, res: Response) => {
  console.log(req.body)
  const { title, author, content } = req.body
  const newTopic: Topic = {
    id: data.topics.at(-1)!.id + 1,
    title,
    author,
    lastMessageDate: formatDate(new Date().toISOString()),
    content
  }
  data.topics.push(newTopic)
  res.status(201).json(newTopic)
})

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  data.topics = data.topics.filter(topic => topic.id !== parseInt(id, 10))

  const { comments } = data

  delete comments[Number(id)]
  res.status(204).send()
})

export default router
