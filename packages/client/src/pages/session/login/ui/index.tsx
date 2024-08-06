import { FC } from 'react'

import { Helmet } from 'react-helmet'

import LoginWidget from '@/widgets/session/login/ui'

const LoginPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Вход в аккаунт</title>
      </Helmet>
      <LoginWidget />
    </>
  )
}

export default LoginPage
