import { FC } from 'react'

import styles from './GameEntities.module.scss'
import useCanvasAnimation from '../../hooks/useCanvasAnimation'

interface Props {
  pause: boolean
}

const GameEntities: FC<Props> = ({ pause }) => {
  const canvasRef = useCanvasAnimation(pause)

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} className={styles.root__canvas} />
    </div>
  )
}

export default GameEntities
