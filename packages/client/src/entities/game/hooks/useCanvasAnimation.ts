import { useRef, useEffect, Dispatch } from 'react'

const useCanvasAnimation = (
  pause: boolean,
  restart: boolean,
  stop: boolean,
  setEndGame: Dispatch<React.SetStateAction<boolean>>
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const requestIdRef = useRef<number>()
  const animationStopped = useRef<boolean>(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const draw = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = 20
      const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      requestIdRef.current = requestAnimationFrame(draw)
    }

    const animate = () => {
      if (animationStopped.current) {
        return
      }

      draw()
    }

    if (stop && requestIdRef.current) {
      cancelAnimationFrame(requestIdRef.current)
      animationStopped.current = true
    }

    if (restart && requestIdRef.current) {
      cancelAnimationFrame(requestIdRef.current)
      animationStopped.current = false
    }

    if (!stop && !pause && !animationStopped.current) {
      animate()
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
