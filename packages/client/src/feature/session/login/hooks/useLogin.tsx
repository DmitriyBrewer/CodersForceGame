import { ChangeEvent, FormEvent, useState } from 'react'

export const useLogin = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO:feature/cfg-23 удалить console.log и добавить api backend
    console.log(`Отправка формы... ${formData}`)
  }

  const inputProps = { formData, handleChange }

  return {
    inputProps,
    handleSubmit
  }
}
