import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseLink from '@/shared/components/ui/BaseLink'

import styles from './ErrorPage.module.scss'

type Props = {
  errorNumber: string
  errorText: string
}
const cssProps = {
  title: {
    fontWeight: 'var(--fw700)',
    fontSize: 'var(--fs160)'
  },
  subTitle: {
    fontWeight: 'var(--fw600)'
  },
  link: {
    mt: 'var(--m20)'
  }
}

const ErrorPageWidget = ({ errorNumber, errorText }: Props) => {
  return (
    <BaseBox className={styles.root}>
      <BaseTypography variant="h4" color="primary.dark" {...cssProps.subTitle}>
        Ууупс!
      </BaseTypography>
      <BaseTypography variant="h1" color="error.dark" {...cssProps.title}>
        {errorNumber}
      </BaseTypography>
      <BaseTypography variant="h6" color="primary.dark">
        {errorText}
      </BaseTypography>
      <BaseLink to="/" {...cssProps.link}>
        На главную
      </BaseLink>
    </BaseBox>
  )
}

export default ErrorPageWidget
