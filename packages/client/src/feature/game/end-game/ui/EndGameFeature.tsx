import React, { FC } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'

import BaseTypography from '@/shared/components/ui/BaseTypography'

import { BaseModalWindow } from '@/shared/components/ui/BaseModalWindow'

import styles from './EndGameFeature.module.scss'
import useEndGame from '../hooks/useEndGame'

interface Props {
  open: boolean
  handleClose: () => void
}
const EndGameFeature: FC<Props> = ({ open, handleClose }) => {
  const { onRetry, onReturnToMenu } = useEndGame()

  return (
    <BaseModalWindow open={open} handleClose={handleClose}>
      <div className={styles.root}>
        <BaseTypography variant="h4" component="h1" gutterBottom color="info">
          Игра закончена
        </BaseTypography>
        <div className={styles.container}>
          <BaseButton onClick={onRetry} variant="contained" color="secondary">
            Попробовать снова
          </BaseButton>
          <BaseButton onClick={onReturnToMenu} variant="contained">
            Вернуться в главное меню
          </BaseButton>
        </div>
      </div>
    </BaseModalWindow>
  )
}

export default EndGameFeature
