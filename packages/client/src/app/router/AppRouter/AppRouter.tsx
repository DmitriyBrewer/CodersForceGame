import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { paths } from '@/shared/config/routing'

import RegisterPage from '@/pages/session/register'
import ProfilePage from '@/pages/profile'

import LoginPage from '@/pages/session/login'

import Error500Page from '@/pages/error/500'

import StartGamePage from '@/pages/game/game-engine'

import ForumPage from '@/pages/social/forum'

import ForumTopicPage from '@/pages/social/forum-topic'

import LeaderboardPage from '@/pages/leaderboard'

import Error404Page from '@/pages/error/404'

import BaseLayout from '@/layouts/BaseLayout'
import HomePage from '@/pages'
import PublicRoute from '../PublicRouter'
import SessionRoute from '../SessionRoute'
import PrivateRoute from '../PrivateRouter'

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: paths.home,
        element: <PublicRoute component={HomePage} />
      },
      {
        path: paths.login,
        element: <SessionRoute component={LoginPage} />
      },
      {
        path: paths.register,
        element: <SessionRoute component={RegisterPage} />
      },
      {
        path: paths.profile,
        element: <PrivateRoute component={ProfilePage} />
      },
      {
        path: paths.game,
        element: <PrivateRoute component={StartGamePage} />
      },
      {
        path: paths.leaderboard,
        element: <PrivateRoute component={LeaderboardPage} />
      },
      {
        path: paths.forum,
        element: <PrivateRoute component={ForumPage} />
      },
      {
        path: paths.forumTopic,
        element: <PrivateRoute component={ForumTopicPage} />
      },
      {
        path: paths.page500,
        element: <Error500Page />
      },
      {
        path: paths.page404,
        element: <Error404Page />
      }
    ]
  }
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
