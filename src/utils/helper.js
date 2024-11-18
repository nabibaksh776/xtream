import { hash } from 'bcrypt'

export const generateRandomPassword = async (length = 8, type = 'hashed') => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:',.<>?"
  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }
  if (type == 'hashed') {
    password = await hash(password, 10)
  }
  return password
}