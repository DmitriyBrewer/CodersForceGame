import { Route, Routes } from 'react-router-dom'
import React, { FC } from 'react'

import { paths } from '@/shared/config/routing'

import LoginPage from '@/pages/session/login'
import StartGamePage from '@/pages/game/game-engine'
import RegisterPage from '@/pages/session/register'

import LeaderBoardPage from '@/pages/leaderboard'
import ForumPage from '@/pages/social/forum'
import ForumTopicPage from '@/pages/social/forum-topic'
import ProfilePage from '@/pages/profile'
import Error404Page from '@/pages/error/404'
import Error500Page from '@/pages/error/500'

import HomePage from '@/pages'
import MainLayout from '@/layouts/main-layout'

import PublicRoute from '@/app/router/PublicRouter'
import SessionRoute from '@/app/router/SessionRoute'
import PrivateRoute from '@/app/router/PrivateRouter'

const AppRoutes: FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route element={<PublicRoute component={HomePage} />} path={paths.home} key={paths.home} />
        <Route element={<SessionRoute component={LoginPage} />} path={paths.login} key={paths.login} />
        <Route element={<SessionRoute component={RegisterPage} />} path={paths.register} key={paths.register} />
        <Route element={<PrivateRoute component={StartGamePage} />} path={paths.game} key={paths.game} />
        <Route
          element={<PrivateRoute component={LeaderBoardPage} />}
          path={paths.leaderboard}
          key={paths.leaderboard}
        />
        <Route element={<PrivateRoute component={ProfilePage} />} path={paths.profile} key={paths.profile} />
        <Route element={<PrivateRoute component={ForumPage} />} path={paths.forum} key={paths.forum} />
        <Route element={<PrivateRoute component={ForumTopicPage} />} path={paths.forumTopic} key={paths.forumTopic} />
        <Route element={<Error404Page />} path={paths.page404} key={paths.page404} />
        <Route element={<Error500Page />} path={paths.page500} key={paths.page500} />
      </Routes>
    </MainLayout>
  )
}

export default AppRoutes
