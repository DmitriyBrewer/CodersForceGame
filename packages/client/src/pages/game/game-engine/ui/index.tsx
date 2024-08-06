import { FC } from 'react'

import { Helmet } from 'react-helmet'

import GameEngineWidget from '@/widgets/game/game-engine'

const StartGamePage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Игра</title>
      </Helmet>
      <GameEngineWidget />
    </>
  )
}

export default StartGamePage
