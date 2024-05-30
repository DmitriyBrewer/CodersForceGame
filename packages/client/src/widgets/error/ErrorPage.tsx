import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseLink from '@/shared/components/ui/BaseLink'

type Props = {
  errorNumber: string
  errorText: string
}

const ErrorPageWidget = ({ errorNumber, errorText }: Props) => {
  return (
    <BaseBox display="flex" alignItems="center" justifyContent="center" height="100vh" flexDirection="column">
      <BaseTypography variant="h4" fontWeight="600" color="primary.dark">
        Ууупс!
      </BaseTypography>
      <BaseTypography variant="h1" fontWeight="700" fontSize="160px" color="error.dark">
        {errorNumber}
      </BaseTypography>
      <BaseTypography variant="h6" color="primary.dark">
        {errorText}
      </BaseTypography>
      <BaseLink to="/" mt="100px">
        На главную
      </BaseLink>
    </BaseBox>
  )
}

export default ErrorPageWidget
