import styled from '@emotion/styled'
import { Paper } from '@mui/material'

interface Props {
  rgap?: string
}

// TODO: feature/cfg-23 позже объеденить в один компонент с BasePaper
const BasePaperPolymorphic = styled(Paper)<Props>(({ rgap }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: `var(${rgap})`,
  padding: 'var(--s28)',
  textAlign: 'center'
}))

export default BasePaperPolymorphic
