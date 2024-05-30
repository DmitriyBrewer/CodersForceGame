import { FC, useEffect, useRef, useState } from 'react'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseButton from '@/shared/components/ui/BaseButton'
import BaseLinearProgress from '@/shared/components/ui/BaseLinearProgress'

import styles from './StartGameFeature.module.scss'

const StartGameFeature: FC = () => {
  const [progress, setProgress] = useState(0)
  const [buffer, setBuffer] = useState(10)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const progressRef = useRef(() => {})
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0)
        setBuffer(10)
      } else {
        const diff = Math.random() * 10
        const diff2 = Math.random() * 10
        setProgress(progress + diff)
        setBuffer(progress + diff + diff2)
      }
    }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current()
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <BasePaperPolymorphic elevation={4} rgap="--g28">
      <BaseTypography component="h1" variant="h3">
        Начало игры
      </BaseTypography>
      <BaseButton color="secondary" variant="contained">
        Start
      </BaseButton>
      <BaseLinearProgress color="secondary" variant="determinate" value={progress} valueBuffer={buffer} />

      <BaseTypography variant="subtitle1" component="p" className={styles.rules}>
        Правила игры
      </BaseTypography>
    </BasePaperPolymorphic>
  )
}

export default StartGameFeature
