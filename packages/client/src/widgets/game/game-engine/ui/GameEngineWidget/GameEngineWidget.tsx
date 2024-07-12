import { FC } from 'react'

import BaseContainer from '@/shared/components/ui/BaseContainer'

import BaseBox from '@/shared/components/ui/BaseBox'

import BackgroundWrapper from '@/shared/components/core/BackgroundWrapper'

import GameEngineFeature from '@/feature/game/game-engine'
import backgroundImage from '@/assets/images/bg.png'

import styles from './GameEngineWidget.module.scss'

const GameEngineWidget: FC = () => {
  return (
    <BackgroundWrapper backgroundUrl={backgroundImage} filter="blur(0.5px)">
      <BaseBox className={styles.root}>
        <BaseContainer maxWidth="sm">
          <GameEngineFeature />
        </BaseContainer>
      </BaseBox>
    </BackgroundWrapper>
  )
}

export default GameEngineWidget
