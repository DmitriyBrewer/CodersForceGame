import { FC } from 'react'

import EndGameWidget from '@/widgets/game/end-game/ui/EndGameWidget/EndGameWidget'
import BaseButton from '@/shared/components/ui/BaseButton'
import { useModal } from '@/shared/hooks/useModal'

const GamePage: FC = () => {
  const { open, handleOpen, handleClose } = useModal()
  return (
    <>
      <EndGameWidget open={open} handleClose={handleClose} />
      <BaseButton onClick={handleOpen} variant="contained" color="secondary">
        Открыть модальное окно
      </BaseButton>
    </>
  )
}

export default GamePage
