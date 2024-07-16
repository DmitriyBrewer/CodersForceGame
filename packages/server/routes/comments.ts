import express, { Request, Response } from 'express'

import { data } from './topics'

const router = express.Router()

interface Comment {
  id: number
  content: string
  topicId: number
}

router.get('/:topicId', (req: Request, res: Response) => {
  const { topicId } = req.params
  const topic = data.topics.find(t => t.id === parseInt(topicId, 10))
  if (topic) {
    res.json({
      topic,
      comments: data.comments[parseInt(topicId, 10)] || []
    })
  } else {
    res.status(404).json({ error: 'Topic not found' })
  }
})

router.post('/:topicId', (req: Request, res: Response) => {
  const { topicId } = req.params
  const { content } = req.body
  const newComment: Comment = { id: Date.now(), content, topicId: parseInt(topicId, 10) }
  if (!data.comments[parseInt(topicId, 10)]) {
    data.comments[parseInt(topicId, 10)] = []
  }
  data.comments[parseInt(topicId, 10)].push(newComment)
  res.status(201).json(newComment)
})

router.delete('/:topicId/:commentId', (req: Request, res: Response) => {
  const { topicId, commentId } = req.params
  if (data.comments[parseInt(topicId, 10)]) {
    data.comments[parseInt(topicId, 10)] = data.comments[parseInt(topicId, 10)].filter(
      comment => comment.id !== parseInt(commentId, 10)
    )
  }
  res.status(204).send()
})

export default router
