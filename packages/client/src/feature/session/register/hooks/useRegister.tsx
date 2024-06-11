import { FormEvent } from 'react'

import { useFormData } from '@/shared/components/core/FormData/hooks/useFormData'
import { FormDataPayload } from '@/shared/components/core/FormData/types'

export const useRegister = () => {
  const initialState = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
    password_repeat: ''
  }

  const { inputProps, handleSubmit, isError } = useFormData(initialState)

  const submitRegister = (data: FormDataPayload) => {
    console.log(`Отправка формы... \n ${JSON.stringify(data, null, 2)}`)
  }

  return {
    inputProps,
    handleSubmit: (e: FormEvent) => handleSubmit(e, submitRegister),
    isError
  }
}
