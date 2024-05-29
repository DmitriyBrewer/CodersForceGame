// TODO: feature/cfg-23 удалить

import { FC, FormEvent } from 'react'

import { useRegister } from '../hooks/useRegister'
import { RegisterFormFieldProps } from '../types'

interface Props extends RegisterFormFieldProps {
  handleSubmit: (e: FormEvent<Element>) => void
}

const withRegisterProps = (Component: FC<Props>) => {
  return () => {
    const { formData, handleChange, errors, handleSubmit } = useRegister()

    return <Component formData={formData} handleChange={handleChange} errors={errors} handleSubmit={handleSubmit} />
  }
}

export default withRegisterProps
