import { defineStore } from 'pinia'
import baseStore, { IBaseStore } from './baseStoreFetchData'
import {productsUrls} from '@/constants/urls'
import {Product} from '@/types/products'
import {computed} from 'vue'

const useLikeProductsStore = defineStore('likeProducts', {
  getters: {
    ...baseStore.getters,
  },

  actions: {
    async initLikes() {
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

export default useLikeProductsStore
