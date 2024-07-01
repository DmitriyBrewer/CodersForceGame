import { useRef, useEffect, Dispatch, SetStateAction } from 'react'

import Game from '@/entities/game'

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

  useEffect(() => {
    const stopAnimation = () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }
      animationStopped.current = true
    }

    const startAnimation = () => {
      if (canvasRef.current && !gameInstance.current) {
        gameInstance.current = new Game(() => {
          setEndGame(true)
          stopAnimation()
        })
        gameInstance.current.start(canvasRef.current)
      }
      const animate = () => {
        if (!animationStopped.current && !pause) {
          gameInstance.current?.mainLoop(performance.now())
          requestIdRef.current = requestAnimationFrame(animate)
        }
      }
      requestIdRef.current = requestAnimationFrame(animate)
    }

    if (stop) {
      stopAnimation()
    } else if (restart) {
      stopAnimation()
      animationStopped.current = false
      setEndGame(false)
      startAnimation()
    } else if (!pause) {
      animationStopped.current = false
      if (!requestIdRef.current) {
        startAnimation()
      }
    } else if (pause) {
      stopAnimation()
    }

    return () => {
      stopAnimation()
    }
  }, [pause, restart, stop, setEndGame])

  return canvasRef
}

export default useCanvasAnimation
