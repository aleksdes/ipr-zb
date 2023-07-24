import useTokenStore from '@/store/token'
import useApi from '~/assets/js/helpers/useApi'
import useUserStore from '~/store/user'
import { authUrls } from '~/constants/urls'
import { X_CSRF_TOKEN } from '@/constants/urls/auth'

class Auth {
  static async registration(userCredential: any) {
    const userStore = useUserStore()
    const tokenStore = useTokenStore()
    const result = await useApi.post(authUrls.REGISTRATION_URL, userCredential)

    tokenStore.setToken(result)
    await userStore.setUser()

    return result
  }

  static async login(userCredential: any) {
    const userStore = useUserStore()
    const tokenStore = useTokenStore()

    let result: any = null
    result = await useApi.post(authUrls.LOGIN_URL, userCredential)
    if (!result.errors) {
      tokenStore.setToken(result)
      result = await userStore.setUser()
    }

    return result
  }

  static async loginBySession(userCredential: any) {
    const userStore = useUserStore()
    const tokenStore = useTokenStore()

    await tokenStore.removeCookiesDataByKey(X_CSRF_TOKEN)

    let result: any = null
    result = await useApi.post(authUrls.LOGIN_URL, userCredential)
    if (!result.errors) {
      await tokenStore.setCookiesData(X_CSRF_TOKEN, result.data.csrf_token)
      result = await userStore.setUserBySession()
    }

    return result
  }

  static async logout() {
    const userStore = useUserStore()
    const tokenStore = useTokenStore()
    const refreshToken = tokenStore.getRefreshToken

    await useApi.delete(authUrls.REFRESH_URL, {
      refresh_token: refreshToken,
    })

    tokenStore.resetStore()
    await userStore.resetStore()
  }

  static async logoutBySession() {
    const userStore = useUserStore()
    const tokenStore = useTokenStore()

    tokenStore.removeCookiesDataByKey(X_CSRF_TOKEN)
    await userStore.resetStore()
    await useApi.post(authUrls.LOGOUT_URL, {})
  }

  static confirmEmail(token: string) {
    return useApi.post(authUrls.CONFIRM_EMAIL_URL, {
      token,
    })
  }

  static confirmChangeEmail(token: string) {
    return useApi.post(authUrls.CONFIRM_CHANGE_EMAIL_URL, {
      token,
    })
  }

  static forgotPasswordSendEmail(userCredential: any) {
    return useApi.post(authUrls.FORGOT_PASSWORD_URL, userCredential)
  }

  static forgotPasswordChange(userCredential: any) {
    return useApi.post(authUrls.CHANGE_FORGOT_PASSWORD_URL, userCredential)
  }

  static sendConfirmEmail() {
    return useApi.post(authUrls.SEND_CONFIRM_EMAIL_URL, {})
  }

  static verificationPhone(userCredential: any) {
    return useApi.post(authUrls.VERIFICATION_PHONE_URL, userCredential)
  }
}

export default Auth
