import { useRef, useEffect, FC } from 'react'

import styles from './CanvasFrame.module.scss'
// TODO: feature/cfg-37 временный компонент frame для примера, удалить позже
const CanvasFrame: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let requestId: number

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

      requestId = requestAnimationFrame(draw)
    }

    const animate = () => {
      draw()
    }

    animate()

    // TODO: feature/cfg-37 eslint временный, компонент будет полностью переделан
    // eslint-disable-next-line consistent-return
    return () => {
      cancelAnimationFrame(requestId)
    }
  }, [])

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} className={styles.root__canvas} />
    </div>
  )
}

export default CanvasFrame
