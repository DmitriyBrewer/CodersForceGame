import { FC } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'

interface Props {
  handleStopGame: () => void
}

const StopGame: FC<Props> = ({ handleStopGame }) => {
  return (
    <BaseButton color="error" variant="contained" onClick={handleStopGame}>
      Остановить
    </BaseButton>
  )
}

export default StopGame
