import React, { useEffect } from 'react'
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

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute component={Login} />} />
        <Route
          path="/register"
          element={<PublicRoute component={Register} />}
        />
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
        <Route path="/game" element={<PrivateRoute component={Game} />} />
        <Route
          path="/leaderboard"
          element={<PrivateRoute component={Leaderboard} />}
        />
        <Route path="/forum" element={<PrivateRoute component={Forum} />} />
        <Route
          path="/forumTopic"
          element={<PrivateRoute component={ForumTopic} />}
        />
        <Route path="/500" element={<Page500 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
