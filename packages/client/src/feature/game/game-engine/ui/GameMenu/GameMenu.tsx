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
  togglePause: () => void
  endGame: boolean
}

const GameMenu: FC<Props> = ({
  handleCloseEndGame,
  onRetryGame,
  onReturnToMenu,
  openMenuGame,
  endGame,
  togglePause
}) => {
  const menuTitle = endGame ? 'Игра закончена' : 'Пауза'

  return (
    <BaseBox className={styles.end}>
      <BaseButton size="large" variant="contained" color="info" onClick={togglePause}>
        Пауза
      </BaseButton>

      <BaseDialog onClose={handleCloseEndGame} open={openMenuGame}>
        <BaseBox className={styles.end__wrapper}>
          <BaseDialogTitle>{menuTitle}</BaseDialogTitle>
        </BaseBox>

        <DialogContent className={styles.end__content}>
          {!endGame && (
            <BaseButton size="large" variant="contained" color="info" onClick={togglePause}>
              Продолжить
            </BaseButton>
          )}

          {endGame && <GameRestartButton onRetryGame={onRetryGame} />}
          {endGame && <GameLeaderboardButton>Таблица лидеров</GameLeaderboardButton>}
          {endGame && <EndGameButton onReturnToMenu={onReturnToMenu}>Перейти в главное меню</EndGameButton>}
        </DialogContent>
      </BaseDialog>
    </BaseBox>
  )
}

export default GameMenu
