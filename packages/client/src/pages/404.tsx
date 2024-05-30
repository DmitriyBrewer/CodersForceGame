import React from 'react'

import { GameOverScreen } from '@/widgets/gameOverScreen'

import styles from './404.module.scss'

const Page404: React.FC = () => {
  const handleRetry = () => {
    // Implement retry logic, if any
  }

  const handleReturnToMenu = () => {
    // Implement return to menu logic, if any
  }

  return (
    <div className={styles.root}>
      <GameOverScreen onRetry={handleRetry} onReturnToMenu={handleReturnToMenu} />
    </div>
  )
}

export default Page404
