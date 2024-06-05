import { useCallback, useEffect, useRef, useState } from 'react'

export const useStartGame = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [endGame, setEndGame] = useState(false)
  const [isFullscreen, setFullscreen] = useState(false)
  const [openGame, setOpenGame] = useState(false)

  const rootRef = useRef<HTMLDivElement | null>(null)

  const toggleFullscreen = useCallback(
    (payload: boolean) => {
      if (!isFullscreen) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
          setFullscreen(payload)
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
        setFullscreen(payload)
      }
    },
    [isFullscreen, setFullscreen]
  )

  const handleClickOpenEndGame = () => {
    setOpenGame(true)
  }
  const handleCloseEndGame = () => {
    setOpenGame(false)
  }

  const handleStopGame = () => {
    setGameStarted(false)
    setButtonDisabled(false)
    setEndGame(true)
    toggleFullscreen(false)
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

  const onRetryGame = () => {
    handleCloseEndGame()
    handleStartGame()
  }

  const onReturnToMenu = () => {
    handleCloseEndGame()
    handleStopGame()
  }

  useEffect(() => {
    if (progress >= 100) {
      setGameStarted(true)
      toggleFullscreen(true)
    }
    // TODO исправить
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    endGame,
    endGameProps,
    rootRef
  }
}
