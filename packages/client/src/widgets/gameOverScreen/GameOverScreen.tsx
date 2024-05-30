import React from 'react'

import { Typography } from '@mui/material'

import { useTheme } from '@mui/material/styles'

import BaseButton from '@/shared/components/ui/BaseButton'

import styles from './GameOverScreen.module.scss'

interface GameOverScreenProps {
  onRetry: () => void
  onReturnToMenu: () => void
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRetry, onReturnToMenu }) => {
  const theme = useTheme()
  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h1" gutterBottom color="info">
        Game Over
      </Typography>
      <div className={styles.buttonContainer}>
        <BaseButton onClick={onRetry} variant="contained" color="secondary">
          Retry
        </BaseButton>
        <BaseButton
          onClick={onReturnToMenu}
          variant="contained"
          //   style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
        >
          Return to Main Menu
        </BaseButton>
      </div>
    </div>
  )
}

export default GameOverScreen
