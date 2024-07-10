import { useRef, useEffect, Dispatch, SetStateAction } from 'react'

import { useSelector } from 'react-redux'

import Game from '@/entities/game'

import { getUserName } from '@/entities/user/model/selector'

import { useLeaderboard } from '@/feature/leaderbord/hooks/useLeaderboard'

const useCanvasAnimation = (
  pause: boolean,
  restart: boolean,
  stop: boolean,
  setEndGame: Dispatch<SetStateAction<boolean>>
) => {
  const requestIdRef = useRef<number | null>(null)
  const animationStopped = useRef<boolean>(false)
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
      animationStopped.current = true
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
          if (!animationStopped.current) {
            gameInstance.current?.mainLoop(time)
            requestIdRef.current = requestAnimationFrame(animate)
          }
        }
        animationStopped.current = false
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
      animationStopped.current = true
    } else if (!requestIdRef.current) {
      startAnimation()
    } else {
      gameInstance.current?.resume()
      animationStopped.current = false
    }

    return () => {
      stopAnimation()
    }
  }, [pause, restart, stop, setEndGame, submitUserScore, userName])

  return canvasRef
}

export default useCanvasAnimation
