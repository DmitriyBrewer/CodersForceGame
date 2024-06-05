import { FC } from 'react'

import ErrorPageWidget from '@/widgets/errorPageWidget'

const Error500: FC = () => {
  return <ErrorPageWidget errorCode="500" errorText="Внутренняя ошибка сервера" />
}

export default Error500
