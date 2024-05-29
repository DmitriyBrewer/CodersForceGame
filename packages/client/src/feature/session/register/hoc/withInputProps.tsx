// TODO: feature/cfg-23 удалить
import { FC } from 'react'

import { useRegister } from '../hooks/useRegister'
import { TextFieldProps } from '../types'

const withInputProps = <P extends TextFieldProps>(Component: FC<P>) => {
  return (props: Omit<P, keyof TextFieldProps>) => {
    const { formData, handleChange, errors, handleSubmit } = useRegister()

    return (
      <Component
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        handleSubmit={handleSubmit}
        {...(props as P)}
      />
    )
  }
}

export default withInputProps
