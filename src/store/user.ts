import { defineStore } from 'pinia'
import { User, UserRoles } from '@/types/user'

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
      }
    },

    async setUser() {

      return {
        data: this.user,
      }
    },
  },

  state: (): { user: User } => ({
    user: {
      id: null,
      roles: [UserRoles.ROLE_GUEST],
    },
  }),
})

export default useUserStore
