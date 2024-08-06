import { FC } from 'react'

import { Helmet } from 'react-helmet'

import ForumWidget from '@/widgets/social/forum'

const ForumPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Форум</title>
      </Helmet>
      <ForumWidget />
    </>
  )
}

export default ForumPage
