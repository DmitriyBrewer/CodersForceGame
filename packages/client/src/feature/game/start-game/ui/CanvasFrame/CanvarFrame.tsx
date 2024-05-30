import React, { useRef, useEffect } from 'react'

import styles from './CanvasFramse.module.scss'
// TODO: feature/cfg-37 временный frame для примера, удалить позже
const CanvasFrame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let requestId: number

    const draw = () => {
      if (!ctx) return

      // Очистка холста
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Генерация случайной позиции и цвета для круга
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = 20
      const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`

      // Отрисовка круга
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
      <canvas ref={canvasRef} width={1000} height={200} />
    </div>
  )
}

export default CanvasFrame
