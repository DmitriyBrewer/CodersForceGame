import { FC } from 'react'

import GameEntities from '@/entities/game/ui/GameEntities'

import BaseBox from '@/shared/components/ui/BaseBox'

import { styleMui } from '@/shared/styleMui'

import { useStartGame } from '../../hooks/useStartGame'
import StartGame from '../StartGame/StartGame'
import EndGame from '../EndGame'

import styles from './GameEngineFeature.module.scss'

const GameEngineFeature: FC = () => {
  const { progress, isGameStarted, isButtonDisabled, handleStartGame, menuGameProps, restart } = useStartGame()

  if (!isGameStarted) {
    return <StartGame progress={progress} isButtonDisabled={isButtonDisabled} handleStartGame={handleStartGame} />
  }

  return (
    <BaseBox className={styles.root} sx={styleMui.bgColorGame}>
      <GameEntities pause={menuGameProps.openMenuGame} restart={restart} />
      <EndGame {...menuGameProps} />
    </BaseBox>
  )
}

export default GameEngineFeature
