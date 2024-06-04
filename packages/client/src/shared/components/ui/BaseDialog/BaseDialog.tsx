import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'

const BaseDialog = styled(Dialog)(({ theme }) => ({
  // TODO: feature/cfg-37 поставить свои padding
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default BaseDialog
