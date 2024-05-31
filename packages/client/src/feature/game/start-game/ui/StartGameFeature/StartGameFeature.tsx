import { FC } from 'react'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import { useRenderClient } from '@/shared/hooks/useRenderClient'

import { useStartGame } from '../../hooks/useStartGame'
import StartGame from '../StartGame/StartGame'
import StopGame from '../StopGame'

const StartGameFeature: FC = () => {
  const isRenderClient = useRenderClient()

  const { progress, isGameStarted, isButtonDisabled, handleStartGame, handleStopGame } = useStartGame()

  if (isRenderClient && !isGameStarted) {
    return <StartGame progress={progress} isButtonDisabled={isButtonDisabled} handleStartGame={handleStartGame} />
  }

  if (isRenderClient && isGameStarted) {
    return <StopGame handleStopGame={handleStopGame} />
  }

  return !isRenderClient && <BaseLoader />
}

export default StartGameFeature
