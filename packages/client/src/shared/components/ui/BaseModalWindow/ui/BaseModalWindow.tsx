import React, { FC, ReactNode } from 'react'
import { Modal } from '@mui/material'

import BaseBox from '../../BaseBox'
import styles from './BaseModalWindow.module.scss'

interface Props {
  open: boolean
  handleClose: () => void
  children: ReactNode
}

export const BaseModalWindow: FC<Props> = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <BaseBox className={styles.box}>{children}</BaseBox>
    </Modal>
  )
}
