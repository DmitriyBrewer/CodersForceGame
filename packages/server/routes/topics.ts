import express, { Request, Response } from 'express'

const router = express.Router()

interface Topic {
  id: number
  title: string
  autor: string
  lastMessageDate: string
}

interface Comment {
  id: number
  content: string
  topicId: number
}
const INITIAL_TOPICS = [
  { id: 1, title: 'Первый топик', autor: 'Автор1', lastMessageDate: '2024-06-03' },
  { id: 2, title: 'Второй топик', autor: 'Автор2', lastMessageDate: '2024-06-04' },
  { id: 3, title: 'Третий топик', autor: 'Автор3', lastMessageDate: '2024-06-05' }
]

export const data = {
  topics: INITIAL_TOPICS,
  comments: {} as { [key: number]: Comment[] }
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
  const { title, autor, lastMessageDate } = req.body
  const newTopic: Topic = { id: Date.now(), title, autor, lastMessageDate }
  data.topics.push(newTopic)
  res.status(201).json(newTopic)
})

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params
  data.topics = data.topics.filter(topic => topic.id !== parseInt(id, 10))
  delete data.comments[parseInt(id, 10)]
  res.status(204).send()
})

export default router
