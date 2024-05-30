import { FC } from 'react'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import { useStartGame } from '../../hooks/useStartGame'
import StartGame from '../StartGame/StartGame'
import StopGame from '../StopGame'

const StartGameFeature: FC = () => {
  const { progress, isGameStarted, isButtonDisabled, handleStartGame, handleStopGame } = useStartGame()

  if (!isGameStarted) {
    return <StartGame progress={progress} isButtonDisabled={isButtonDisabled} handleStartGame={handleStartGame} />
  }

  if (isGameStarted) {
    return <StopGame handleStopGame={handleStopGame} />
  }

  return <BaseLoader />
}

export default StartGameFeature
