import { FC } from 'react'

import ErrorPageWidget from '@/widgets/error/error-page-widget'

const Error404Page: FC = () => {
  return <ErrorPageWidget errorCode="404" errorText="Страница не найдена" />
}

export default Error404Page
