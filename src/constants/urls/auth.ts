import { TypeAuth } from '@/types/common'

export interface IAuthUrls {
  REFRESH_URL: string
  ACCESS_URL: string
  USER_URL: string
  REGISTRATION_URL: string
  LOGIN_URL: string
  LOGOUT_URL: string
  CONFIRM_EMAIL_URL: string
  CONFIRM_CHANGE_EMAIL_URL: string
  FORGOT_PASSWORD_URL: string
  CHANGE_FORGOT_PASSWORD_URL: string
  SEND_CONFIRM_EMAIL_URL: string
  VERIFICATION_PHONE_URL: string
  USER_AGREEMENT_URL: string
}

const MIN_TIME_ACCESS_TOKEN = 60
const TYPE_AUTH: TypeAuth = 'jwt'
const X_CSRF_TOKEN = '_token'

const authUrls: IAuthUrls = {
  USER_URL: '/users',
  REFRESH_URL: '',
  ACCESS_URL: '',
  REGISTRATION_URL: '',
  LOGIN_URL: '/auth/login',
  LOGOUT_URL: '',
  CONFIRM_EMAIL_URL: '',
  CONFIRM_CHANGE_EMAIL_URL: '',
  FORGOT_PASSWORD_URL: '',
  CHANGE_FORGOT_PASSWORD_URL: '',
  SEND_CONFIRM_EMAIL_URL: '',
  VERIFICATION_PHONE_URL: '',
  USER_AGREEMENT_URL: '',
}

export default authUrls
export { MIN_TIME_ACCESS_TOKEN, authUrls, TYPE_AUTH, X_CSRF_TOKEN }
