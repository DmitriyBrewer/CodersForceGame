import { FC, useState } from 'react'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseLinearProgress from '@/shared/components/ui/BaseLinearProgress'

import styles from './StartGameFeature.module.scss'

const StartGameFeature: FC = () => {
  const [isGameStarted, setGameStarted] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [progress, setProgress] = useState(0)

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
    }, 20)
  }

  console.log(progress)
  console.log(isGameStarted)

  return (
    <BasePaperPolymorphic elevation={4} rgap="--g28">
      <BaseTypography component="h1" variant="h3">
        Начало игры
      </BaseTypography>
      <BaseButton color="secondary" variant="contained" disabled={isButtonDisabled} onClick={handleStartGame}>
        Start
      </BaseButton>
      {isButtonDisabled && !isGameStarted && (
        <BaseLinearProgress color="secondary" variant="determinate" value={progress} />
      )}
      {isGameStarted && <p>canvas</p>}
      <BaseTypography variant="subtitle1" component="p" className={styles.rules}>
        Правила игры
      </BaseTypography>
    </BasePaperPolymorphic>
  )
}

export default StartGameFeature
