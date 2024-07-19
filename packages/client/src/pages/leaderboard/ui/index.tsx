import { FC } from 'react'

import { Helmet } from 'react-helmet'

import LeaderBoardWidget from '@/widgets/leaderboard'

const LeaderBoardPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Таблица рекордов</title>
      </Helmet>
      <LeaderBoardWidget />
    </>
  )
}

export default LeaderBoardPage
