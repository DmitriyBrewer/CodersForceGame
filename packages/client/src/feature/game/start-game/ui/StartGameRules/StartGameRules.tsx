import * as React from 'react'

import BaseDialog from '@/shared/components/ui/BaseDialog'
import BaseDialogTitle from '@/shared/components/ui/BaseDialogTitle'
import BaseIconButton from '@/shared/components/ui/BaseIconButton'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseButton from '@/shared/components/ui/BaseButton'
import { IconClose } from '@/shared/components/icons/iconsMui'
import BaseDialogContent from '@/shared/components/ui/BaseDialogContent'
import BaseDialogActions from '@/shared/components/ui/BaseDialogActions'

import BaseBox from '@/shared/components/ui/BaseBox'

import styles from './StartGameRules.module.scss'

const StartGameRules: React.FC = () => {
  const [open, setOpen] = React.useState(false)

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
          <BaseTypography gutterBottom>
            Цель игры - проеахать большее растояние, обгоняя другие машинки и избегая столкновений.
          </BaseTypography>
          <BaseTypography gutterBottom>
            Игрок управляет машиной с помощью стрелок на клавиатуре: вверх - ускорение, вниз - торможение, вправо и
            влево - повороты.
          </BaseTypography>
          <BaseTypography gutterBottom>
            На трассе есть 3 полосы движения: правая, центральная и левая. Игрок может переключаться между ними, чтобы
            избегать препятствий и обгонять другие машины.
          </BaseTypography>
        </BaseDialogContent>
        <BaseDialogActions>
          <BaseButton autoFocus onClick={handleClose}>
            Окей, понятно
          </BaseButton>
        </BaseDialogActions>
      </BaseDialog>
    </BaseBox>
  )
}

export default StartGameRules
