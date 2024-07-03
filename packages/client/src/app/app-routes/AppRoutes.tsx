import { Route, Routes } from 'react-router-dom'

import { FC } from 'react'

import { paths } from '@/shared/config/routing'

import HomePage from '@/pages'

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path={paths.home} key={paths.home} />
      <Route element={<p>После добавления роутера здесь будет LoginPage</p>} path="/test" key={paths.login} />
      <Route
        element={<p>После добавления роутера здесь будет LeaderBoardPage</p>}
        path="/test2"
        key={paths.leaderboard}
      />
    </Routes>
  )
}

export default AppRoutes
