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
    [isFullscreen]
  )

  const handleClickOpenEndGame = useCallback(() => {
    setOpenMenuGame(true)
  }, [])

  const handleCloseEndGame = useCallback(() => {
    setOpenMenuGame(false)
  }, [])

  const handleStopGame = useCallback(() => {
    setGameStarted(false)
    setButtonDisabled(false)
    setEndGame(true)
    toggleFullscreen(false)
  }, [toggleFullscreen])

  const handleStartGame = useCallback(() => {
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
    }, 120)

    return () => clearInterval(timer)
  }, [progress])

  const onRetryGame = useCallback(() => {
    handleCloseEndGame()
    handleStopGame()
    handleStartGame()
    setRestart(true)
  }, [handleCloseEndGame, handleStopGame, handleStartGame])

  const onReturnToMenu = useCallback(() => {
    handleCloseEndGame()
    handleStopGame()
    setRestart(true)
  }, [handleCloseEndGame, handleStopGame])

  const togglePause = useCallback(() => {
    setOpenMenuGame(prevState => !prevState)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setGameStarted(true)
    }
  }, [progress])

  useEffect(() => {
    if (isGameStarted) {
      toggleFullscreen(true)
    }
  }, [isGameStarted, toggleFullscreen])

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
    handleClickOpenEndGame,
    togglePause
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
