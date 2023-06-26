import moment from 'moment'
import { useCookies } from '@vueuse/integrations/useCookies'
import { defineStore } from 'pinia'
import jwt_decode from 'jwt-decode'

import useApi from '../assets/js/helpers/useApi'
import { authUrls, MIN_TIME_ACCESS_TOKEN } from '@/constants/urls/auth'
import {User} from '@/types/user'

interface ITokenStore {
  accessToken: string | null
  expires: any
}

const useTokenStore = defineStore('token', {
  getters: {
    getDataParseToken(): User {
      return jwt_decode(this.accessToken)
    },

    getAccessToken(): string | null {
      return this.accessToken
    },

    getRefreshToken() {
      return useCookies().get('refreshToken')
    },
  },

  actions: {
    async refreshToken() {
      const requestUrl = authUrls.REFRESH_URL
      const refreshTokenData = {
        refreshToken: this.getRefreshToken,
      }

      if (refreshTokenData.refreshToken) {
        const result = await useApi.post(requestUrl, refreshTokenData.refreshToken)
        this.setToken(result)
      }
    },

    setAccessToken(result: any) {
      if (result.data) {
        this.accessToken = result.data?.token || result.data?.accessToken || null
        const dataToken: any = result.data?.accessToken || result.data?.token ? jwt_decode(result.data.accessToken || result.data.token) : null
        this.expires = dataToken.exp || null

        const expiresAccessToken: any = this.expires ? moment.unix(this.expires).toDate() : null
        const dataCookies = JSON.stringify({
          value: this.accessToken,
          expires: expiresAccessToken,
        })

        const cookies = useCookies()
        cookies.set('accessToken', dataCookies)
      }
    },

    setToken(result: any) {
      if (result.data) {
        const refreshToken = result.data.refreshToken
        this.setAccessToken(result)

        if (refreshToken) {
          const cookies = useCookies()
          cookies.set('refreshToken', refreshToken)
        }
      } else {
        this.resetStore()
      }
    },

    async updateToken() {
      if (!this.accessToken) {
        const cookies = useCookies()
        const cookiesAccessToken = cookies.get('accessToken')
        if (!cookiesAccessToken) {
          this.removeToken()
          await this.refreshToken()
        } else {
          this.accessToken = cookiesAccessToken.value
          this.expires = cookiesAccessToken.expires
        }
      }

      if (this.expires && moment(this.expires).unix() - moment().unix() <= MIN_TIME_ACCESS_TOKEN) {
        this.removeToken()
        await this.refreshToken()
      }
    },

    setCookiesData(key: string, value: string) {
      useCookies().set(key, value)
    },

    getCookiesDataByKey(key: string) {
      return useCookies().get(key)
    },

    removeCookiesDataByKey(key: string) {
      useCookies().remove(key, {
        path: '/',
      })
    },

    removeToken() {
      this.accessToken = null
      this.expires = null
    },

    resetStore() {
      useCookies().remove('refreshToken', {
        path: '/',
      })
      useCookies().remove('accessToken', {
        path: '/',
      })
      this.removeToken()
    },
  },

  state: (): ITokenStore => ({
    accessToken: null,
    expires: null,
  }),
})

export default useTokenStore
