import { FC } from 'react'

import { Helmet } from 'react-helmet'

import RegisterWidget from '@/widgets/session/register/ui'

const RegisterPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <RegisterWidget />
    </>
  )
}

export default RegisterPage
