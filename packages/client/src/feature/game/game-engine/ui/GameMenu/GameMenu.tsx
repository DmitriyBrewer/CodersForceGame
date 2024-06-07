import { FC } from 'react'

import { DialogContent } from '@mui/material'

import BaseButton from '@/shared/components/ui/BaseButton'

import BaseBox from '@/shared/components/ui/BaseBox'

import BaseDialog from '@/shared/components/ui/BaseDialog'
import BaseDialogTitle from '@/shared/components/ui/BaseDialogTitle'

import styles from './GameMenu.module.scss'
import GameLeaderboardButton from '../GameLeaderboardButton'
import GameRestartButton from '../GameRestartButton/GameRestartButton'
import EndGameButton from '../EndGameButton'

interface Props {
  onRetryGame: () => void
  onReturnToMenu: () => void
  openMenuGame: boolean
  handleCloseEndGame: () => void
  handleClickOpenEndGame: () => void
  endGame: boolean
}

const GameMenu: FC<Props> = ({
  handleClickOpenEndGame,
  handleCloseEndGame,
  onRetryGame,
  onReturnToMenu,
  openMenuGame,
  endGame
}) => {
  const menuTitle = endGame ? 'Игра закончена' : 'Пауза'
  const menuEndGame = endGame ? 'Перейти в главное меню' : 'Закончить игру'

  return (
    <BaseBox className={styles.end}>
      <BaseButton variant="text" color="info" onClick={handleClickOpenEndGame}>
        Меню
      </BaseButton>

      <BaseDialog onClose={handleCloseEndGame} open={openMenuGame}>
        <BaseBox className={styles.end__wrapper}>
          <BaseDialogTitle>{menuTitle}</BaseDialogTitle>
        </BaseBox>

        <DialogContent className={styles.end__content}>
          <GameRestartButton onRetryGame={onRetryGame} />

          <GameLeaderboardButton>Таблица лидеров</GameLeaderboardButton>

          <EndGameButton onReturnToMenu={onReturnToMenu}>{menuEndGame}</EndGameButton>
        </DialogContent>
      </BaseDialog>
    </BaseBox>
  )
}

export default GameMenu
