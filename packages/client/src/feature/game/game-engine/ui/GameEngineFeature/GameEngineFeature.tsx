import { FC } from 'react'

import GameEntities from '@/entities/game/ui/GameEntities'

import BaseBox from '@/shared/components/ui/BaseBox'

import { styleMui } from '@/shared/styleMui'

import { useStartGame } from '../../hooks/useStartGame'
import StartGame from '../StartGame/StartGame'

import styles from './GameEngineFeature.module.scss'
import GameMenu from '../GameMenu'

const GameEngineFeature: FC = () => {
  const { progress, isGameStarted, isButtonDisabled, handleStartGame, menuGameProps, restart, endGame, setEndGame } =
    useStartGame()

  if (!isGameStarted) {
    return <StartGame progress={progress} isButtonDisabled={isButtonDisabled} handleStartGame={handleStartGame} />
  }

  return (
    <BaseBox className={styles.root} sx={styleMui.bgColorGame}>
      <GameEntities pause={menuGameProps.openMenuGame} restart={restart} stop={endGame} setEndGame={setEndGame} />
      <GameMenu {...menuGameProps} endGame={endGame} />
    </BaseBox>
  )
}

export default GameEngineFeature
