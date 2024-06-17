import { FC, useEffect, useRef } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import { styleMui } from '@/shared/styleMui'

import Game from '@/entities/game'

import StartGame from '../StartGame/StartGame'
import styles from './GameEngineFeature.module.scss'
import { useGame } from '../../hooks/useGame'

const GameEngineFeature: FC = () => {
  const { progress, isGameStarted, isButtonDisabled, handleStartGame } = useGame()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gameInstance = useRef<Game | null>(null)

  useEffect(() => {
    if (canvasRef.current && isGameStarted && !gameInstance.current) {
      gameInstance.current = new Game()
      gameInstance.current.start(canvasRef.current)
    }
  }, [isGameStarted])

  if (!isGameStarted) {
    return <StartGame progress={progress} isButtonDisabled={isButtonDisabled} handleStartGame={handleStartGame} />
  }

  return (
    <BaseBox className={styles.root} sx={styleMui.bgColorGame}>
      <canvas ref={canvasRef} width="800" height="600" />
    </BaseBox>
  )
}

export default GameEngineFeature
