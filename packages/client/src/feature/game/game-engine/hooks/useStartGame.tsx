import { useEffect, useRef, useState } from 'react'

// TODO: feature/cfg-37 , удалить позже сообщение,  тестовая логика для старта игры
export const useStartGame = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [endGame, setEndGame] = useState(false)

  const [openGame, setOpenGame] = useState(false)

  const rootRef = useRef<HTMLDivElement | null>(null)

  const toggleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    }
  }

  const handleClickOpenEndGame = () => {
    setOpenGame(true)
  }
  const handleCloseEndGame = () => {
    setOpenGame(false)
  }

  const onRetryGame = () => {
    // TODO:feature/cfg-27 добавить логику
  }
  const onReturnToMenu = () => {
    // TODO:feature/cfg-27 добавить логику
  }

  const handleStopGame = () => {
    setGameStarted(false)
    setButtonDisabled(false)
    setEndGame(true)
  }

  // useEffect(() => {}, [endGame])

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
      toggleFullscreen()
    }
  }, [progress, setGameStarted])

  const endGameProps = {
    onRetryGame,
    onReturnToMenu,
    openGame,
    handleCloseEndGame,
    handleClickOpenEndGame
  }

  return {
    progress,
    isGameStarted,
    isButtonDisabled,
    handleStartGame,
    handleStopGame,
    endGame,
    endGameProps,
    rootRef
  }
}
