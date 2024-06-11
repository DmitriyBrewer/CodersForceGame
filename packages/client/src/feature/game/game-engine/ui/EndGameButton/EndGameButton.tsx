import { FC, PropsWithChildren } from 'react'

import BaseButton from '@/shared/components/ui/BaseButton'

interface Props {
  onReturnToMenu: () => void
}

const EndGameButton: FC<PropsWithChildren<Props>> = ({ children, onReturnToMenu }) => {
  return (
    <BaseButton onClick={onReturnToMenu} variant="contained">
      {children}
    </BaseButton>
  )
}

export default EndGameButton
