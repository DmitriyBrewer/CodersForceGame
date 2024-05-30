import React, { FC } from 'react'

import { Typography } from '@mui/material'

import BaseButton from '@/shared/components/ui/BaseButton'

import styles from './GameOverScreen.module.scss'

interface GameOverScreenProps {
  onRetry: () => void
  onReturnToMenu: () => void
}

const GameOverScreen: FC<GameOverScreenProps> = ({ onRetry, onReturnToMenu }) => {
  return (
    <div className={styles.root}>
      <Typography variant="h2" component="h1" gutterBottom color="info">
        Game Over
      </Typography>
      <div className={styles.container}>
        <BaseButton onClick={onRetry} variant="contained" color="secondary">
          Retry
        </BaseButton>
        <BaseButton onClick={onReturnToMenu} variant="contained">
          Return to Main Menu
        </BaseButton>
      </div>
    </div>
  )
}

export default GameOverScreen
