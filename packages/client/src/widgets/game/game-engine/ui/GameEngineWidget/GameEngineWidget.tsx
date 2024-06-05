import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import BaseBox from '@/shared/components/ui/BaseBox'

import GameEngineFeature from '@/feature/game/game-engine'

import styles from './GameEngineWidget.module.scss'

const GameEngineWidget: FC = () => {
  return (
    <BaseBox className={styles.root}>
      <BaseContainer maxWidth="sm">
        <GameEngineFeature />
      </BaseContainer>
    </BaseBox>
  )
}

export default GameEngineWidget
