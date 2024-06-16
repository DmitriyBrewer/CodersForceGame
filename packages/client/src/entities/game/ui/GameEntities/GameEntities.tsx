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
      <canvas ref={canvasRef} className={styles.root__canvas} />
    </div>
  )
}

export default GameEntities
