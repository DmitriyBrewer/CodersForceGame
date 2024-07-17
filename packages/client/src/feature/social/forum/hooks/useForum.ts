import { useState } from 'react'

import {
  useCreateTopicMutation,
  useAddCommentMutation,
  useGetTopicsQuery,
  useGetTopicDetailsQuery
} from '../api/forumApi'

export type NewTopicData = {
  title: string
  content: string
}

export type CommentData = {
  topicId: number
  content: string
  author: string
}

export const useForum = (topicId: number) => {
  const [createTopic] = useCreateTopicMutation()
  const [addComment] = useAddCommentMutation()

  const { data: topicsData, isLoading: topicsLoading, error: topicsError, refetch: refetchTopics } = useGetTopicsQuery()
  const {
    data: topicDetailsData,
    isLoading: topicDetailsLoading,
    error: topicDetailsError,
    refetch: refetchTopicDetails
  } = useGetTopicDetailsQuery(topicId)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createNewTopic = async (newTopicData: NewTopicData) => {
    setLoading(true)
    setError(null)

    try {
      await createTopic({ ...newTopicData, autor: 'Автор' }).unwrap()
      refetchTopics()
    } catch (err) {
      setError('Ошибка при создании темы')
    } finally {
      setLoading(false)
    }
  }

  const addNewComment = async (commentData: CommentData) => {
    setLoading(true)
    setError(null)

    try {
      await addComment(commentData).unwrap()
      refetchTopicDetails()
    } catch (err) {
      setError('Ошибка при добавлении комментария')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    topicsData,
    topicsLoading,
    topicsError,
    topicDetailsData,
    topicDetailsLoading,
    topicDetailsError,
    createNewTopic,
    addNewComment
  }
}
