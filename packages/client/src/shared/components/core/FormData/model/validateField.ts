import { conditions } from '../constant'

const isValidName = (name: string) => {
  const nameRegExp = conditions.name.pattern
  return new RegExp(nameRegExp).test(name)
}

const isValidLogin = (login: string) => {
  const loginRegExp = conditions.login.pattern
  return new RegExp(loginRegExp).test(login)
}

const isValidEmail = (email: string) => {
  const emailRegExp = conditions.email.pattern
  return new RegExp(emailRegExp).test(email)
}

const isValidPhone = (phone: string) => {
  const phoneRegExp = conditions.phone.pattern
  return new RegExp(phoneRegExp).test(phone)
}

const isValidPassword = (password: string) => {
  const passwordRegExp = conditions.password.pattern
  return new RegExp(passwordRegExp).test(password)
}

const isValidPasswordRepeat = (passwordRepeat: string, password: string) => {
  return passwordRepeat === password
}

export const validateField = (name: string, value: string, password: string) => {
  switch (name) {
    case 'first_name':
      return isValidName(value) ? '' : conditions.name.errorText
    case 'second_name':
      return isValidName(value) ? '' : conditions.name.errorText
    case 'login':
      return isValidLogin(value) ? '' : conditions.login.errorText
    case 'email':
      return isValidEmail(value) ? '' : conditions.email.errorText
    case 'phone':
      return isValidPhone(value) ? '' : conditions.phone.errorText
    case 'password':
      return isValidPassword(value) ? '' : conditions.password.errorText
    case 'password_repeat':
      return isValidPasswordRepeat(value, password) ? '' : conditions.passwordRepeat.errorText
    default:
      return ''
  }
}
