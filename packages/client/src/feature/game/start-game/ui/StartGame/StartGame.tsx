import { FC } from 'react'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseLinearProgress from '@/shared/components/ui/BaseLinearProgress'

import StartGameRules from '../StartGameRules'

interface Props {
  isButtonDisabled: boolean
  handleStartGame: () => void
  progress: number
}

const StartGame: FC<Props> = ({ isButtonDisabled, handleStartGame, progress }) => {
  return (
    <BasePaperPolymorphic elevation={4} rgap="--g28">
      <BaseTypography component="h1" variant="h3">
        Начало игры
      </BaseTypography>

      <BaseButton color="secondary" variant="contained" disabled={isButtonDisabled} onClick={handleStartGame}>
        Start
      </BaseButton>

      {isButtonDisabled && <BaseLinearProgress color="secondary" variant="determinate" value={progress} />}

      <StartGameRules />
    </BasePaperPolymorphic>
  )
}

export default StartGame
