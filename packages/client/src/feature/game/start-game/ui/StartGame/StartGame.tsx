import { FC } from 'react'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'
import BaseLinearProgress from '@/shared/components/ui/BaseLinearProgress'

import StartGameRules from '../StartGameRules'
import StartGameHeader from '../StartGameHeader'
import StartGameButton from '../StartGameButton'

interface Props {
  isButtonDisabled: boolean
  handleStartGame: () => void
  progress: number
}

const StartGame: FC<Props> = ({ isButtonDisabled, handleStartGame, progress }) => {
  return (
    <BasePaperPolymorphic elevation={4} rgap="--g28">
      <StartGameHeader>Начало игры</StartGameHeader>

      <StartGameButton disabled={isButtonDisabled} onClick={handleStartGame}>
        Start
      </StartGameButton>

      {isButtonDisabled && <BaseLinearProgress color="secondary" variant="determinate" value={progress} />}

      <StartGameRules />
    </BasePaperPolymorphic>
  )
}

export default StartGame
