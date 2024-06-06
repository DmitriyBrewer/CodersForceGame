import { useRef, useEffect } from 'react'

const useCanvasAnimation = (pause: boolean) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const requestIdRef = useRef<number>()

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
      draw()
    }

    if (!pause) {
      animate()
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
      }
    }
  }, [pause])

  return canvasRef
}

export default useCanvasAnimation
