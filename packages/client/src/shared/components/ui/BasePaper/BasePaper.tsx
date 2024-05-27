import styled from '@emotion/styled'
import { Paper } from '@mui/material'

const BasePaper = styled(Paper)(() => ({
  display: 'flex',
  'flex-direction': 'column',
  'row-gap': 'var(--g20)',
  'justify-content': 'center',
  padding: 'var(--s28)',
  'text-align': 'center'
}))

export default BasePaper
