import { FC } from 'react'

import BaseBox from '@/shared/components/ui/BaseBox'
import { styleMui } from '@/shared/styleMui'
import BaseTypography from '@/shared/components/ui/BaseTypography'

import styles from './FooterWidget.module.scss'

const FooterWidget: FC = () => {
  return (
    <BaseBox component="footer" sx={styleMui.footer} className={styles.footer}>
      <BaseTypography variant="caption" sx={styleMui.footerText}>
        Совместный проект: CodersForceGame & Яндекс Практикум
      </BaseTypography>
      <BaseTypography variant="caption" sx={styleMui.footerText}>
        version 0.0.1
      </BaseTypography>
    </BaseBox>
  )
}

export default FooterWidget
