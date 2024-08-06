import { useState } from 'react'

import { useSubmitScoreMutation } from '../../../entities/leaderboard/api/leaderboardApi'

export type ScoreData = {
  data: Record<string, string | number>
  ratingFieldName: string
  teamName: string
}

export type LeaderboardParams = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type Leader = {
  data: {
    myField: string
    otherField: number
  }
}

export type LeaderboardResponse = {
  leaders: Leader[]
}

export const useLeaderboard = () => {
  const [submitScore] = useSubmitScoreMutation()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitUserScore = async (scoreData: ScoreData) => {
    setLoading(true)
    setError(null)

    try {
      await submitScore({ ...scoreData }).unwrap()
    } catch (err) {
      setError('Ошибка при отправке результата')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    submitUserScore
  }
}
