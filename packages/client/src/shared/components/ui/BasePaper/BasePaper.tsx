import styled from '@emotion/styled'
import { Paper } from '@mui/material'

interface Props {
  rgap?: string
}

const BasePaper = styled(Paper)<Props>(({ rgap }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: `var(${rgap})`,
  padding: 'var(--s28)',
  textAlign: 'center'
}))

export default BasePaper
