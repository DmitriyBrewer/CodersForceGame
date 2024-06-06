import { FC } from 'react'

import ErrorPageWidget from '@/widgets/errorPageWidget'

const Error404: FC = () => {
  return <ErrorPageWidget errorCode="404" errorText="Страница не найдена" />
}

export default Error404
