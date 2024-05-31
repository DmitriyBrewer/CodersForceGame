import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import GameEngineFeature from '@/feature/game/game-engine'

const GameEngineWidget: FC = () => {
  return (
    <BaseContainer>
      <GameEngineFeature />
    </BaseContainer>
  )
}

export default GameEngineWidget
