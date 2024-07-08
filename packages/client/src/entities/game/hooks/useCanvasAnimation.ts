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
    const startAnimation = () => {
      if (!animationStopped.current) {
        if (canvasRef.current && !gameInstance.current) {
          gameInstance.current = new Game(submitUserScore, userName)
          gameInstance.current.start(canvasRef.current)
        }
      }
    }

    // TODO:feature/cfg-85 доделать паузу старт и стоп анимаций + рестарт
    const stopAnimation = () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }
      animationStopped.current = true
    }

    // TODO:feature/cfg-85 доделать паузу старт и стоп анимаций + рестарт
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

    // TODO:feature/cfg-85 доделать паузу старт и стоп анимаций + рестарт
    // TODO:feature/cfg-65 тут сделал ignore по месту, по другому не получается, а в целом отключать правило consistent-return нет смысла
    // eslint-disable-next-line consistent-return,@typescript-eslint/no-empty-function
    return () => {}
  }, [pause, restart, stop, setEndGame, submitUserScore, userName])

  return canvasRef
}

export default useCanvasAnimation
