import { defineStore } from 'pinia'
import baseStore, { IBaseStore } from '../baseStoreFetchData'
import {productsUrls} from '~/constants/urls'

const useProductsCategoriesStore = defineStore('productsCategories', {
  getters: {
    ...baseStore.getters,
  },

  actions: {
    ...baseStore.actions(productsUrls.PRODUCTS_CATEGORIES_URL),
    setData(data: any) {
      if (data) {
        this.items = data
      }
    },
  },

  state: (): IBaseStore => ({
    ...baseStore.state,

    items: [],
  }),
})

export default useProductsCategoriesStore
