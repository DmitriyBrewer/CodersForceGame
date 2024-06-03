import { FC } from 'react'

import { styleMui } from '@/shared/styleMui'
import BaseBox from '@/shared/components/ui/BaseBox'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BasePaper from '@/shared/components/ui/BasePaper'
// TODO  feature/cfg-61 удалить позже

const TestPage: FC = () => {
  return (
    <BaseBox sx={styleMui.testBgComponent}>
      <BaseTypography sx={styleMui.errorTypograpy}>Текст ошибки</BaseTypography>
      <BasePaper sx={styleMui.paperInfo}>информационный Paper с кастомным фоном</BasePaper>
    </BaseBox>
  )
}

export default TestPage
