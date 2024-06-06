import { FC } from 'react'

import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseLink from '@/shared/components/ui/BaseLink'

import { styleMui } from '@/shared/styleMui'

import styles from './ErrorPageWidget.module.scss'

type Props = {
  errorCode: string
  errorText: string
}

const ErrorPageWidget: FC<Props> = ({ errorCode, errorText }) => {
  return (
    <BaseBox className={styles.root}>
      <BaseTypography variant="h4" sx={styleMui.errorPageWidget.subTitle}>
        Ууупс!
      </BaseTypography>
      <BaseTypography variant="h1" sx={styleMui.errorPageWidget.title}>
        {errorCode}
      </BaseTypography>
      <BaseTypography variant="h6" color="primary.dark">
        {errorText}
      </BaseTypography>
      <BaseLink to="/" sx={styleMui.errorPageWidget.link}>
        На главную
      </BaseLink>
    </BaseBox>
  )
}

export default ErrorPageWidget