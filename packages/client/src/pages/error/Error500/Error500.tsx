import ErrorPageWidget from '@/widgets/error'

const Error500Page = () => {
  return <ErrorPageWidget errorNumber="500" errorText="Внутренняя ошибка сервера" />
}

export default Error500Page
