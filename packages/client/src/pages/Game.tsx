import React from 'react'

import { ModalWindow, useModal } from '@/shared/components/ui/ModalWindow'
import BaseButton from '@/shared/components/ui/BaseButton'
import { GameOverScreen } from '@/widgets/gameOverScreen'

const Game: React.FC = () => {
  const { open, handleOpen, handleClose } = useModal()
  const mockFunction = () => {
    // TODO по готовности логики сделать функцию возврата к игре и меню
  }
  return (
    <div>
      GAME SCREEN
      <BaseButton variant="contained" color="primary" onClick={handleOpen}>
        Open Modal
      </BaseButton>
      <ModalWindow open={open} handleClose={handleClose}>
        <GameOverScreen onRetry={mockFunction} onReturnToMenu={mockFunction} />
      </ModalWindow>
    </div>
  )
}

export default Game
