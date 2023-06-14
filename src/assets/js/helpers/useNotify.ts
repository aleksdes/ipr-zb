import { useNotification, NotificationsOptions } from '@kyvg/vue3-notification'

const notification = useNotification()

export const notify = (options: NotificationsOptions) => {
  notification.notify({
    group: 'app-front',
    title: 'Error',
    type: 'error',
    ...options,
  })
}
