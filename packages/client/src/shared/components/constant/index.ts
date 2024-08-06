export const conditions = {
  email: {
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    errorText: 'Некорректный email. Ожидается формат example@mail.com'
  },
  login: {
    pattern: '^(?=.*[a-zA-Z])(?=.*\\d?)[a-zA-Z\\d_\\-]{3,20}$',
    errorText: 'Логин введен неверно, от 3 до 20 символов'
  },
  password: {
    pattern: '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,40}$',
    errorText: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
  },
  passwordRepeat: {
    errorText: 'Пароли не совпадают'
  },
  name: {
    pattern: '^([А-ЯЁA-Z][а-яёa-z]*-?[А-ЯЁA-Z]?[а-яёa-z]*)$',
    errorText: 'Первая буква должна быть заглавной'
  },
  phone: {
    pattern: '^\\+?\\d{10,15}$',
    errorText: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса'
  }
}
