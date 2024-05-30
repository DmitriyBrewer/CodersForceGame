import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import StartGameFeature from '@/feature/game/start-game'

const StartGameWidget: FC = () => {
  return (
    <BaseContainer>
      <StartGameFeature />
    </BaseContainer>
  )
}

export default StartGameWidget
