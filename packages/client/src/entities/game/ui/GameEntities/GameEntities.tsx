import { FC } from 'react'

import styles from './GameEntities.module.scss'
import useCanvasAnimation from '../../hooks/useCanvasAnimation'

const GameEntities: FC = () => {
  const canvasRef = useCanvasAnimation()

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} className={styles.root__canvas} />
    </div>
  )
}

export default GameEntities
