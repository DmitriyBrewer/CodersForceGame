import { FormEvent } from 'react'

import { useFormData } from '@/shared/components/core/FormData/hooks/useFormData'
import { FormDataPayload } from '@/shared/components/core/FormData/types'

export const useLogin = () => {
  const initialState = {
    login: '',
    password: ''
  }

  const { inputProps, handleSubmit, isError } = useFormData(initialState)

  const submitLogin = (data: FormDataPayload) => {
    console.log(`Отправка формы... \n ${JSON.stringify(data, null, 2)}`)
  }

  return {
    inputProps,
    handleSubmit: (e: FormEvent) => handleSubmit(e, submitLogin),
    isError
  }
}
