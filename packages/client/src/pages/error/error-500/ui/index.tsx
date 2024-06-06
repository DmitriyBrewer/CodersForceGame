import { FC } from 'react'

import ErrorPageWidget from '@/widgets/error/error-page-widget'

const Error500Page: FC = () => {
  return <ErrorPageWidget errorCode="500" errorText="Внутренняя ошибка сервера" />
}

export default Error500Page
