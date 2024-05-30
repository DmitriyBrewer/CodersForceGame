import { FC, useEffect, useState } from 'react'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseLinearProgress from '@/shared/components/ui/BaseLinearProgress'

import styles from './StartGameFeature.module.scss'
import CanvasFrame from '../../CanvasFrame/CanvarFrame'

const StartGameFeature: FC = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleStopGame = () => {
    setGameStarted(false)
    setButtonDisabled(false)
  }

  const handleStartGame = () => {
    setButtonDisabled(true)
    setProgress(0)

    const timer = setInterval(() => {
      if (progress >= 100) {
        clearInterval(timer)
        setGameStarted(true)
      } else {
        const diff = Math.random() * 10
        setProgress(prevProgress => {
          const newProgress = prevProgress + diff
          return newProgress >= 100 ? 100 : newProgress
        })
      }
    }, 200)
  }

  console.log(progress)
  console.log(isGameStarted)

  useEffect(() => {
    if (progress >= 100) {
      setGameStarted(true)
    }
  }, [progress])

  return (
    <BasePaperPolymorphic elevation={4} rgap="--g28">
      {!isGameStarted && (
        <>
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
        </>
      )}
      {isGameStarted && <CanvasFrame />}
      {isGameStarted && (
        <BaseButton color="error" variant="contained" onClick={handleStopGame}>
          Stop game
        </BaseButton>
      )}
    </BasePaperPolymorphic>
  )
}

export default StartGameFeature
