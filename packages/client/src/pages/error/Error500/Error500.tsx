import ErrorPageWidget from '@/widgets/errorPage'

const Error500Page = () => {
  return <ErrorPageWidget errorNumber="500" errorText="Внутренняя ошибка сервера" />
}

export default Error500Page
