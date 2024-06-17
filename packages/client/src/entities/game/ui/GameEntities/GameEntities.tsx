import { Dispatch, FC, SetStateAction } from 'react'

import useCanvasAnimation from '../../hooks/useCanvasAnimation'

import styles from './GameEntities.module.scss'

interface Props {
  pause: boolean
  restart: boolean
  stop: boolean
  setEndGame: Dispatch<SetStateAction<boolean>>
}

const GameEntities: FC<Props> = ({ pause, restart, stop, setEndGame }) => {
  const canvasRef = useCanvasAnimation(pause, restart, stop, setEndGame)

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} className={styles.root__canvas} width="800" height="600" />
    </div>
  )
}

export default GameEntities
