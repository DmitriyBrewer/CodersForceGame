import { FC } from 'react'

import { DialogContent } from '@mui/material'

import BaseButton from '@/shared/components/ui/BaseButton'

import BaseBox from '@/shared/components/ui/BaseBox'

import BaseDialog from '@/shared/components/ui/BaseDialog'
import BaseDialogTitle from '@/shared/components/ui/BaseDialogTitle'

import styles from './EndGame.module.scss'

interface Props {
  onRetryGame: () => void
  onReturnToMenu: () => void
  openGame: boolean
  handleCloseEndGame: () => void
  handleClickOpenEndGame: () => void
}

const EndGame: FC<Props> = ({ handleClickOpenEndGame, handleCloseEndGame, onRetryGame, onReturnToMenu, openGame }) => {
  return (
    <BaseBox className={styles.end}>
      <BaseButton variant="text" color="info" onClick={handleClickOpenEndGame}>
        Завершить игру
      </BaseButton>

      <BaseDialog onClose={handleCloseEndGame} open={openGame}>
        <BaseBox className={styles.end__wrapper}>
          <BaseDialogTitle>Игра закончена</BaseDialogTitle>
        </BaseBox>

        <DialogContent className={styles.end__content}>
          <BaseButton onClick={onRetryGame} variant="contained" color="secondary">
            Попробовать снова
          </BaseButton>
          <BaseButton onClick={onReturnToMenu} variant="contained">
            Вернуться в главное меню
          </BaseButton>
        </DialogContent>
      </BaseDialog>
    </BaseBox>
  )
}

export default EndGame
