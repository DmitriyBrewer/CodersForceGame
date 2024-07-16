import express, { Request, Response } from 'express'

const router = express.Router()

interface Topic {
  id: number
  title: string
  content: string
}

interface Comment {
  id: number
  content: string
  topicId: number
}

export const data = {
  topics: [{ id: 1, title: 'kek', content: 'lol' }] as Topic[],
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
  const { title, content } = req.body
  const newTopic: Topic = { id: Date.now(), title, content }
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
