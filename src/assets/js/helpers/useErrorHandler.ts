import { notify } from '@/assets/js/helpers/useNotify'
import { NotificationsOptions } from '@kyvg/vue3-notification'
import useTokenStore from '@/store/token'
import useUserStore from '@/store/user'
import { TYPE_AUTH } from '@/constants/urls/auth'
import Auth from '@/assets/js/helpers/auth'

const errorHandler = async (errors: any) => {
  const status = errors?.response?.status || null
  let notifySettings: NotificationsOptions | null = null

  if (status) {
    switch (status) {
      case 401: {
        const tokenStore = useTokenStore()
        const userStore = useUserStore()

        if (TYPE_AUTH === 'jwt') {
          await tokenStore.updateToken()
          if (!tokenStore.getAccessToken) {
            userStore.resetStore()
            tokenStore.resetStore()

            return
          }
        }

        if (TYPE_AUTH === 'session') {
          await Auth.logoutBySession()

          return
        }

        notifySettings = {
          title: 'Действие не может быть выполнено',
          text: 'Ошибка аутентификации. Попробуйте снова',
        }
        break
      }
      case 403: {
        notifySettings = {
          title: 'Действие не может быть выполнено',
          text: 'Не хватает прав. Обратитесь к администратору',
        }
        break
      }
      case 504: {
        notifySettings = {
          title: 'Действие не может быть выполнено',
          text: 'Превышено время ожидания',
        }
        break
      }
      default:
        break
    }
  }

  notifySettings ? notify(notifySettings) : ''
}

export default errorHandler
