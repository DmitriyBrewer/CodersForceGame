import { useRef, useEffect, Dispatch, SetStateAction } from 'react'

import Game from '..'

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
    if (!canvasRef.current) return

    const startAnimation = () => {
      if (!animationStopped.current) {
        if (canvasRef.current && !gameInstance.current) {
          gameInstance.current = new Game()
          gameInstance.current.start(canvasRef.current)
        }
      }
    }

    const stopAnimation = () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }
      animationStopped.current = true
    }

    if (stop) {
      stopAnimation()
    }
    if (restart) {
      stopAnimation()
      animationStopped.current = false

      startAnimation()
    }
    if (!stop && !pause && !animationStopped.current) {
      startAnimation()
    }

    const timeoutId = setTimeout(() => {
      setEndGame(true)
    }, 4000)

    // TODO:feature/cfg-65 тут сделал ignore по месту, по другому не получается, а в целом отключать правило consistent-return нет смысла
    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timeoutId)
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
      }
    }
  }, [pause, restart, stop, setEndGame])

  return canvasRef
}

export default useCanvasAnimation
