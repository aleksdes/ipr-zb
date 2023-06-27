import { defineStore } from 'pinia'
import baseStore, { IBaseStore } from './baseStoreFetchData'
import {commonUrls} from '@/constants/urls'
import {Product} from '@/types/products'

const useBasketStore = defineStore('basket', {
  getters: {
    ...baseStore.getters,
  },

  actions: {
    ...baseStore.actions(commonUrls.BASKET_URL),

    async initBasket() {
      const likes: any = await localStorage.getItem('likes')
      this.items = JSON.parse(likes)
    },

    isLicked(product: Product){
      return !!this.items.find((item: Product) => item.id === product.id && item.category===product.category)
    },

    async updateLikes(product: Product) {
      const findLike:Product = this.items.find((item: Product) => item.id === product.id && item.category===product.category)
      if (!findLike) {
        this.items = [
          ...this.items,
          product,
        ]

        await localStorage.setItem('likes', JSON.stringify(this.items))
      } else {
        this.items = this.items.filter((item: Product) => item.id !== product.id)
        await localStorage.setItem('likes', JSON.stringify(this.items))
      }
    },
  },

  state: (): IBaseStore => ({
    ...baseStore.state,

    items: [],
  }),
})

export default useBasketStore
