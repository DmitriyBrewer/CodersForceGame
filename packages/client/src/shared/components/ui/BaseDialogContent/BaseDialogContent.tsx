import styled from '@emotion/styled'
import { DialogContent } from '@mui/material'

const BaseDialogContent = styled(DialogContent)(() => ({
  '&.MuiDialogContent-root': {
    padding: 'var(--s16) var(--s20)'
  }
}))

export default BaseDialogContent
