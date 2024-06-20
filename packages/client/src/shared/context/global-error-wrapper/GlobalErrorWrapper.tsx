import React, { FC, PropsWithChildren } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BaseAlert from '@/shared/components/ui/BaseAlert'
import { clearError } from '@/entities/error'

export const GlobalErrorWrapper: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch()
  const { isError, message } = useSelector((state: any) => state.error)

  return (
    <>
      {isError && (
        <BaseAlert variant="filled" severity="error" onClose={() => dispatch(clearError())}>
          {message}
        </BaseAlert>
      )}
      {children}
    </>
  )
}

export default GlobalErrorWrapper
