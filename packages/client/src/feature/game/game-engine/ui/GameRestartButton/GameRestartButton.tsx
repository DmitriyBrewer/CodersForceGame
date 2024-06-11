import { FC } from 'react'

import { IconReplay } from '@/shared/components/icons/iconsMui'
import BaseButton from '@/shared/components/ui/BaseButton'

interface Props {
  onRetryGame: () => void
}

const GameRestartButton: FC<Props> = ({ onRetryGame }) => {
  return (
    <BaseButton onClick={onRetryGame} variant="contained" color="secondary">
      <IconReplay />
    </BaseButton>
  )
}

export default GameRestartButton
