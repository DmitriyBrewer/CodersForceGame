import { FC } from 'react'
import { Helmet } from 'react-helmet'

import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseLink from '@/shared/components/ui/BaseLink'

import { styleMui } from '@/shared/styleMui'

import { paths } from '@/shared/config/routing'

import styles from './ErrorPageWidget.module.scss'

type Props = {
  errorCode: string
  errorText: string
}

const ErrorPageWidget: FC<Props> = ({ errorCode, errorText }) => {
  return (
    <BaseBox className={styles.root}>
      <Helmet>
        <title>Ошибка {errorCode}</title>
      </Helmet>
      <BaseTypography variant="h4" sx={styleMui.errorPageWidget.subTitle}>
        Ууупс!
      </BaseTypography>
      <BaseTypography variant="h1" sx={styleMui.errorPageWidget.title}>
        {errorCode}
      </BaseTypography>
      <BaseTypography variant="h6" color="primary.dark">
        {errorText}
      </BaseTypography>
      <BaseLink to={paths.home} sx={styleMui.errorPageWidget.link}>
        На главную
      </BaseLink>
    </BaseBox>
  )
}

export default ErrorPageWidget
