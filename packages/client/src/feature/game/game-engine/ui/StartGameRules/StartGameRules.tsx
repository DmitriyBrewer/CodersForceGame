import { FC, useState } from 'react'

import BaseDialog from '@/shared/components/ui/BaseDialog'
import BaseDialogTitle from '@/shared/components/ui/BaseDialogTitle'
import BaseIconButton from '@/shared/components/ui/BaseIconButton'
import BaseButton from '@/shared/components/ui/BaseButton'
import { IconClose } from '@/shared/components/icons/iconsMui'
import BaseDialogContent from '@/shared/components/ui/BaseDialogContent'
import BaseDialogActions from '@/shared/components/ui/BaseDialogActions'

import BaseBox from '@/shared/components/ui/BaseBox'

import StartGameDescription from '../StartGameDescription'

import styles from './StartGameRules.module.scss'

const StartGameRules: FC = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <BaseBox className={styles.rules}>
      <BaseButton variant="text" color="info" onClick={handleClickOpen}>
        Правила игры
      </BaseButton>

      <BaseDialog onClose={handleClose} open={open}>
        <BaseBox className={styles.rules__box}>
          <BaseDialogTitle>Правила игры</BaseDialogTitle>
          <BaseIconButton aria-label="close" onClick={handleClose}>
            <IconClose />
          </BaseIconButton>
        </BaseBox>

        <BaseDialogContent dividers>
          <StartGameDescription>
            Цель игры - проехать большее растояние, обгоняя другие машинки и избегая столкновений.
          </StartGameDescription>
          <StartGameDescription>
            Игрок управляет машиной с&nbsp;помощью стрелок на&nbsp;клавиатуре: вверх&nbsp;&mdash; ускорение,
            вниз&nbsp;&mdash; торможение, вправо и влево&nbsp;&mdash; повороты.
          </StartGameDescription>
          <StartGameDescription>
            На&nbsp;трассе есть 3&nbsp;полосы движения: правая, центральная и&nbsp;левая. Игрок может переключаться
            между ними, чтобы избегать препятствий и&nbsp;обгонять другие машины.
          </StartGameDescription>
        </BaseDialogContent>
        <BaseDialogActions>
          <BaseButton variant="contained" autoFocus onClick={handleClose}>
            Окей, понятно
          </BaseButton>
        </BaseDialogActions>
      </BaseDialog>
    </BaseBox>
  )
}

export default StartGameRules
