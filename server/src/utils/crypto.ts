import { createHash } from 'crypto'
import { env } from 'process'

export function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

export function hashPassword(password: string) {
  return sha256(password + env.PASSWORD_SECRET)
}
