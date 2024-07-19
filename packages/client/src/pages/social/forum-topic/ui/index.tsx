import { FC } from 'react'

import { Helmet } from 'react-helmet'

import ForumTopicWidget from '@/widgets/social/forum-topic'

const ForumTopicPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Форум</title>
      </Helmet>
      <ForumTopicWidget />
    </>
  )
}

export default ForumTopicPage
