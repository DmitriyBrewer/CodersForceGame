import { FC } from 'react'

import { Helmet } from 'react-helmet'

import HomeWidget from '@/widgets/home'

const HomePage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <HomeWidget />
    </>
  )
}

export default HomePage
