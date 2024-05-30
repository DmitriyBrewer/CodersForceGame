import React, { FC, ReactNode } from 'react'
import { Modal, Box } from '@mui/material'

interface ModalWindowProps {
  open: boolean
  handleClose: () => void
  children: ReactNode
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '240px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 'var(--s28)'
}

export const ModalWindow: FC<ModalWindowProps> = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}
