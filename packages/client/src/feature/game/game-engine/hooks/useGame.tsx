import { useCallback, useEffect, useState } from 'react'

export const useGame = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const [restart, setRestart] = useState(false)

  const [openMenuGame, setOpenMenuGame] = useState(false)
  const [isFullscreen, setFullscreen] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [progress, setProgress] = useState(0)

  const toggleFullscreen = useCallback(
    (payload: boolean) => {
      if (!isFullscreen && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
        setFullscreen(payload)
      } else if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
          setFullscreen(payload)
        }
      }
    },
    [isFullscreen, setFullscreen]
  )

  const handleClickOpenEndGame = () => {
    setOpenMenuGame(true)
  }
  const handleCloseEndGame = () => {
    setOpenMenuGame(false)
  }

  const handleStopGame = () => {
    setGameStarted(false)
    setButtonDisabled(false)
    setEndGame(true)
    toggleFullscreen(false)
  }

  const handleStartGame = () => {
    setButtonDisabled(true)
    setEndGame(false)
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

  const onRetryGame = () => {
    handleCloseEndGame()
    handleStopGame()
    handleStartGame()
    setRestart(true)
  }

  const onReturnToMenu = () => {
    handleCloseEndGame()
    handleStopGame()
  }

  useEffect(() => {
    if (progress >= 100) {
      setGameStarted(true)
    }
  }, [progress, setGameStarted])

  useEffect(() => {
    if (isGameStarted) {
      toggleFullscreen(true)
    }
  }, [toggleFullscreen, isGameStarted])

  useEffect(() => {
    if (endGame) {
      setOpenMenuGame(true)
    }
  }, [endGame])

  const menuGameProps = {
    onRetryGame,
    onReturnToMenu,
    openMenuGame,
    handleCloseEndGame,
    handleClickOpenEndGame
  }

  return {
    progress,
    isGameStarted,
    isButtonDisabled,
    handleStartGame,
    menuGameProps,
    restart,
    endGame,
    setEndGame
  }
}
