import * as React from 'react'

import BaseDialog from '@/shared/components/ui/BaseDialog'
import BaseDialogTitle from '@/shared/components/ui/BaseDialogTitle'
import BaseIconButton from '@/shared/components/ui/BaseIconButton'
import BaseTypography from '@/shared/components/ui/BaseTypography'
import BaseButton from '@/shared/components/ui/BaseButton'
import { IconClose } from '@/shared/components/icons/iconsMui'
import BaseDialogContent from '@/shared/components/ui/BaseDialogContent'
import BaseDialogActions from '@/shared/components/ui/BaseDialogActions'

const StartGameRules: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <BaseButton variant="text" color="info" onClick={handleClickOpen}>
        Правила игры
      </BaseButton>
      <BaseDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BaseDialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </BaseDialogTitle>
        <BaseIconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}>
          <IconClose />
        </BaseIconButton>
        <BaseDialogContent dividers>
          <BaseTypography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </BaseTypography>
          <BaseTypography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet
            rutrum faucibus dolor auctor.
          </BaseTypography>
          <BaseTypography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
          </BaseTypography>
        </BaseDialogContent>
        <BaseDialogActions>
          <BaseButton autoFocus onClick={handleClose}>
            Save changes
          </BaseButton>
        </BaseDialogActions>
      </BaseDialog>
    </>
  )
}

export default StartGameRules
