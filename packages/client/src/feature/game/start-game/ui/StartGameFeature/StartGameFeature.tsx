import { FC } from 'react'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseLinearProgress from '@/shared/components/ui/BaseLinearProgress'

import BaseLoader from '@/shared/components/ui/BaseLoader'

import CanvasFrame from '../CanvasFrame/CanvarFrame'
import StartGameRules from '../StartGameRules'
import { useStartGame } from '../../hooks/useStartGame'
import styles from './StartGameFeature.module.scss'

const StartGameFeature: FC = () => {
  const { progress, isGameStarted, isButtonDisabled, handleStartGame, handleStopGame } = useStartGame()

  if (!isGameStarted) {
    return (
      <BasePaperPolymorphic elevation={4} rgap="--g28">
        <BaseTypography component="h1" variant="h3">
          Начало игры
        </BaseTypography>
        <BaseButton color="secondary" variant="contained" disabled={isButtonDisabled} onClick={handleStartGame}>
          Start
        </BaseButton>
        {isButtonDisabled && <BaseLinearProgress color="secondary" variant="determinate" value={progress} />}
        <BaseTypography variant="subtitle1" component="p" className={styles.rules}>
          Правила игры
        </BaseTypography>
        <StartGameRules />
      </BasePaperPolymorphic>
    )
  }

  if (isGameStarted) {
    return (
      <BasePaperPolymorphic elevation={4} rgap="--g28">
        <CanvasFrame />
        <BaseButton color="error" variant="contained" onClick={handleStopGame}>
          Stop game
        </BaseButton>
      </BasePaperPolymorphic>
    )
  }

  return <BaseLoader />
}

export default StartGameFeature
