import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import EndGameFeature from '@/feature/game/end-game'

interface Props {
  open: boolean
  handleClose: () => void
}

const EndGameWidget: FC<Props> = ({ open, handleClose }) => {
  return (
    <BaseContainer>
      <EndGameFeature open={open} handleClose={handleClose} />
    </BaseContainer>
  )
}

export default EndGameWidget
