import { defineStore } from 'pinia'
import { User, UserRoles } from '@/types/user'
import useTokenStore from '@/store/token'
import { authUrls } from '~/constants/urls'
import useApi from '~/assets/js/helpers/useApi'

const useUserStore = defineStore('user', {
  getters: {
    getUserData(): User {
      return this.user
    },
  },

  actions: {
    resetStore() {
      this.user = {
        id: null,
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        gender: '',
        image: '',
        phone: '',
        roles: [],
      }
    },

    async setUser() {
      const tokenStore = useTokenStore()

      if (tokenStore.accessToken) {
        const { id: userId }: User = tokenStore.getDataParseToken
        const response: any = await useApi.get(authUrls.USER_URL + '/' + userId)
        if (response.data) {
          this.user = { ...this.user, ...response.data }
          return {
            data: this.user,
          }
        } else {
          return response
        }
      }

      await this.resetStore()
      return {
        data: this.user,
      }
    },

    async setUserBySession(params: any = { useErrorHandler: true }) {
      const response: any = await useApi.get(authUrls.USER_URL, null, { useErrorHandler: params.useErrorHandler })
      if (response.data) {
        this.user = { ...this.user, ...response.data }
        return {
          data: this.user,
        }
      } else {
        return response
      }
    },
  },

  state: (): { user: User } => ({
    user: {
      id: null,
      roles: [UserRoles.ROLE_GUEST],
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      gender: '',
      image: '',
      phone: '',
    },
  }),
})

export default useUserStore
