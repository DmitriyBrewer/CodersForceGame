import { useEffect, useRef, useState } from 'react'

export const useStartGame = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [endGame, setEndGame] = useState(false)
  const [, setFullscreen] = useState(false)
  const [openGame, setOpenGame] = useState(false)

  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (openGame) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
        setFullscreen(true)
      }
    }
    if (!openGame) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setFullscreen(false)
      }
    }
  }, [openGame])

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
