import { FC } from 'react'

import { useStartGame } from '../../hooks/useStartGame'
import StartGame from '../StartGame/StartGame'
import StopGame from '../StopGame'

const StartGameFeature: FC = () => {
  const { progress, isGameStarted, isButtonDisabled, handleStartGame, handleStopGame } = useStartGame()

  if (!isGameStarted) {
    return <StartGame progress={progress} isButtonDisabled={isButtonDisabled} handleStartGame={handleStartGame} />
  }

  return <StopGame handleStopGame={handleStopGame} />
}

export default StartGameFeature
