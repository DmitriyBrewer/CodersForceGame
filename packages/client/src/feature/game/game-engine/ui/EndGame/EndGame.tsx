import { FC } from 'react'

import { DialogContent } from '@mui/material'

import BaseButton from '@/shared/components/ui/BaseButton'

import BaseBox from '@/shared/components/ui/BaseBox'

import BaseDialog from '@/shared/components/ui/BaseDialog'
import BaseDialogTitle from '@/shared/components/ui/BaseDialogTitle'

import { IconReplay } from '@/shared/components/icons/iconsMui'

import styles from './EndGame.module.scss'

interface Props {
  onRetryGame: () => void
  onReturnToMenu: () => void
  openMenuGame: boolean
  handleCloseEndGame: () => void
  handleClickOpenEndGame: () => void
}

const EndGame: FC<Props> = ({
  handleClickOpenEndGame,
  handleCloseEndGame,
  onRetryGame,
  onReturnToMenu,
  openMenuGame
}) => {
  return (
    <BaseBox className={styles.end}>
      <BaseButton variant="text" color="info" onClick={handleClickOpenEndGame}>
        Меню
      </BaseButton>

      <BaseDialog onClose={handleCloseEndGame} open={openMenuGame}>
        <BaseBox className={styles.end__wrapper}>
          <BaseDialogTitle>Игра закончена</BaseDialogTitle>
        </BaseBox>

        <DialogContent className={styles.end__content}>
          <BaseButton onClick={onRetryGame} variant="contained" color="secondary">
            <IconReplay />
          </BaseButton>

          <BaseButton onClick={onReturnToMenu} variant="contained">
            Закончить игру
          </BaseButton>
        </DialogContent>
      </BaseDialog>
    </BaseBox>
  )
}

export default EndGame
