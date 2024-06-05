import { FC, Fragment } from 'react'

import GameEntities from '@/entities/game/ui/GameEntities'

import { useStartGame } from '../../hooks/useStartGame'
import StartGame from '../StartGame/StartGame'
import StopGame from '../StopGame'
import EndGame from '../EndGame'

const GameEngineFeature: FC = () => {
  const { progress, isGameStarted, isButtonDisabled, handleStartGame, handleStopGame, endGameProps } = useStartGame()

  if (!isGameStarted) {
    return <StartGame progress={progress} isButtonDisabled={isButtonDisabled} handleStartGame={handleStartGame} />
  }

  return (
    <>
      <GameEntities />
      <StopGame handleStopGame={handleStopGame} />
      <EndGame {...endGameProps} />
    </>
  )
}

export default GameEngineFeature
