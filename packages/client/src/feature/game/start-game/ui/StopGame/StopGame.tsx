import { FC } from 'react'

import BasePaperPolymorphic from '@/shared/components/ui/BasePaperPolymorphic'
import BaseButton from '@/shared/components/ui/BaseButton'

import CanvasFrame from '../CanvasFrame/CanvarFrame'

interface Props {
  handleStopGame: () => void
}

const StopGame: FC<Props> = ({ handleStopGame }) => {
  return (
    <BasePaperPolymorphic elevation={4} rgap="--g28">
      <CanvasFrame />
      <BaseButton color="error" variant="contained" onClick={handleStopGame}>
        Stop game
      </BaseButton>
    </BasePaperPolymorphic>
  )
}

export default StopGame
