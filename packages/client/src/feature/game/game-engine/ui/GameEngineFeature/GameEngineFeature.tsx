import { FC } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import { styleMui } from '@/shared/styleMui'

import GameEntities from '@/entities/game/ui/GameEntities'

import StartGame from '../StartGame/StartGame'
import styles from './GameEngineFeature.module.scss'
import { useGame } from '../../hooks/useGame'
import GameMenu from '../GameMenu'

const GameEngineFeature: FC = () => {
  const { menuGameProps, progress, isGameStarted, isButtonDisabled, handleStartGame, restart, endGame, setEndGame } =
    useGame()

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
