import React, { FC, PropsWithChildren } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BaseAlert from '@/shared/components/ui/BaseAlert'
import { clearError } from '@/entities/error'

export const GlobalErrorWrapper: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch()
  // TODO: add globalerrorwrapper можнож здесь избавиться от any ?
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isError, message } = useSelector((state: any) => state.error)

  const handleClose = () => {
    dispatch(clearError())
  }

  return (
    <>
      {isError && (
        <BaseAlert variant="filled" severity="error" onClose={handleClose}>
          {message}
        </BaseAlert>
      )}
      {children}
    </>
  )
}

export default GlobalErrorWrapper
