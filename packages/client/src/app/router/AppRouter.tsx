import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { paths } from '@/shared/config/routing'

import RegisterPage from '@/pages/session/register'
import Profile from '@/pages/Profile'
import Forum from '@/pages/Forum'
import ForumTopic from '@/pages/ForumTopic'
import LoginPage from '@/pages/session/login'

import Error500Page from '@/pages/error/error-500'

import StartGamePage from '@/pages/game/game-engine'

import Error404Page from '@/pages/error/error-404'

import LeaderboardPage from '@/pages/leaderboard'

import PrivateRoute from '@/app/router/PrivateRoute'
import PublicRoute from '@/app/router/PublicRoute'
import BaseLayout from '@/layouts/BaseLayout'

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: paths.home,
        element: (
          <>
            <Navigate to={paths.game} />
            <PrivateRoute component={StartGamePage} />
          </>
        )
      },
      {
        path: paths.login,
        element: <PublicRoute component={LoginPage} />
      },
      {
        path: paths.register,
        element: <PublicRoute component={RegisterPage} />
      },
      {
        path: paths.profile,
        element: <PrivateRoute component={Profile} />
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
        element: <PrivateRoute component={Forum} />
      },
      {
        path: paths.forumTopic,
        element: <PrivateRoute component={ForumTopic} />
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
