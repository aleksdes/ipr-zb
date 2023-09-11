import { defineStore } from 'pinia'
import baseStore, { IBaseStore } from './baseStoreFetchData'
import {commonUrls} from '~/constants/urls'
import {INotificationMessages} from '~/types/common'

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
        id: 1,
        title: 'Скидки',
        text: 'Сезон скидок продолжается! 5% на весь ассортимент',
        date: 1687535638000,
        active: true,
      },
      {
        id: 2,
        title: 'Новые поступления',
        text: 'В категории электроника поступили новые товары',
        date: 1687535638000,
        active: false,
      },
      {
        id: 3,
        title: 'Скидки',
        text: 'Сезон скидок продолжается! 5% на весь ассортимент',
        date: 1687535638000,
        active: true,
      },
      {
        id: 4,
        title: 'Новые поступления',
        text: 'В категории электроника поступили новые товары',
        date: 1687535638000,
        active: false,
      },
      {
        id: 5,
        title: 'Скидки',
        text: 'Сезон скидок продолжается! 5% на весь ассортимент',
        date: 1687535638000,
        active: true,
      },
      {
        id: 6,
        title: 'Новые поступления',
        text: 'В категории электроника поступили новые товары',
        date: 1687535638000,
        active: false,
      },
    ],
  }),
})

export default useNotificationsStore
