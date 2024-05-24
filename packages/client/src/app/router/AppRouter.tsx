import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Profile from '../../pages/Profile'
import Game from '../../pages/Game'
import Leaderboard from '../../pages/Leaderboard'
import Page404 from '../../pages/404'
import Page500 from '../../pages/500'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import Forum from '../../pages/Forum'
import ForumTopic from '../../pages/ForumTopic'
import { paths } from '../../shared/config/routing'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.login} element={<PublicRoute component={Login} />} />
        <Route path={paths.register} element={<PublicRoute component={Register} />} />
        <Route path={paths.profile} element={<PrivateRoute component={Profile} />} />
        <Route path={paths.game} element={<PrivateRoute component={Game} />} />
        <Route path={paths.leaderboard} element={<PrivateRoute component={Leaderboard} />} />
        <Route path={paths.forum} element={<PrivateRoute component={Forum} />} />
        <Route path={paths.forumTopic} element={<PrivateRoute component={ForumTopic} />} />
        <Route path={paths.page500} element={<Page500 />} />
        <Route path={paths.page404} element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
