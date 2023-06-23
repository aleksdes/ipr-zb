import { defineStore } from 'pinia'
import baseStore, { IBaseStore } from './baseStoreFetchData'
import {commonUrls} from '@/constants/urls'
import {INotificationMessages} from '@/types/common'

const useNotificationsStore = defineStore('notifications', {
  getters: {
    ...baseStore.getters,
  },

  actions: {
    ...baseStore.actions(commonUrls.NOTIFICATIONS_URL),

    readNotification(id: number) {
      const findElement = this.items.find((item: INotificationMessages) => item.id === id)
      findElement.active = false
    },
  },

  state: (): IBaseStore => ({
    ...baseStore.state,

    items: [
      {
        title: 'Скидки',
        text: 'Сезон скидок продолжается! 5% на весь ассортимент',
        date: 1687535638,
        active: true,
      },
      {
        title: 'Новые поступления',
        text: 'В категории электроника поступили новые товары',
        date: 1687535638,
        active: false,
      },
    ],
  }),
})

export default useNotificationsStore
