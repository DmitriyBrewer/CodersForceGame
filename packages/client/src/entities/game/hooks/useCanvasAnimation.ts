import { useRef, useEffect, Dispatch, SetStateAction } from 'react'

import { useSelector } from 'react-redux'

import { getUserName } from '@/entities/user/model/selector'

import Game, { GAME_STATE } from '@/entities/game'

import { useLeaderboard } from '@/shared/leaderboard/hooks/useLeaderboard'

const useCanvasAnimation = (
  pause: boolean,
  restart: boolean,
  stop: boolean,
  setEndGame: Dispatch<SetStateAction<boolean>>
) => {
  const requestIdRef = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gameInstance = useRef<Game | null>(null)

  const { submitUserScore } = useLeaderboard()
  const userName = useSelector(getUserName)

  useEffect(() => {
    const stopAnimation = () => {
      if (requestIdRef.current !== null) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }
    }

    const startAnimation = () => {
      if (canvasRef.current) {
        if (!gameInstance.current) {
          gameInstance.current = new Game(
            () => {
              setEndGame(true)
              stopAnimation()
            },
            submitUserScore,
            userName
          )
          gameInstance.current.start(canvasRef.current)
        }
        const animate = (time: DOMHighResTimeStamp) => {
          if (gameInstance.current?.currentGameState !== GAME_STATE.PAUSED) {
            gameInstance?.current?.mainLoop(time)
            requestIdRef.current = requestAnimationFrame(animate)
          }
        }
        requestIdRef.current = requestAnimationFrame(animate)
      }
    }

    if (stop) {
      stopAnimation()
    } else if (restart) {
      stopAnimation()
      setEndGame(false)
      startAnimation()
    } else if (pause) {
      gameInstance.current?.pause()
    } else {
      gameInstance.current?.resume()
      startAnimation()
    }

    return () => {
      stopAnimation()
    }
  }, [pause, restart, stop, setEndGame, submitUserScore, userName])

  return canvasRef
}

export default useCanvasAnimation
