import { useEffect, useState } from 'react'

// TODO: feature/cfg-37 , удалить позже сообщение,  тестовая логика для старта игры
export const useStartGame = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleStopGame = () => {
    setGameStarted(false)
    setButtonDisabled(false)
  }

  const handleStartGame = () => {
    setButtonDisabled(true)
    setProgress(0)

    const timer = setInterval(() => {
      if (progress >= 100) {
        clearInterval(timer)
      } else {
        const diff = Math.random() * 10
        setProgress(prevProgress => {
          const newProgress = prevProgress + diff
          return newProgress >= 100 ? 100 : newProgress
        })
      }
    }, 200)
  }

  useEffect(() => {
    if (progress >= 100) {
      setGameStarted(true)
    }
  }, [progress, setGameStarted])

  return {
    progress,
    isGameStarted,
    isButtonDisabled,
    handleStartGame,
    handleStopGame
  }
}
