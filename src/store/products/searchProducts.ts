import { defineStore } from 'pinia'
import baseStore, { IBaseStore } from '../baseStoreFetchData'
import {productsUrls} from '~/constants/urls'

const useSearchProductsStore = defineStore('searchProducts', {
  getters: {
    ...baseStore.getters,
  },

  actions: {
    ...baseStore.actions(productsUrls.PRODUCTS_SEARCH_URL),
    setData(data: any) {
      if (data.products) {
        this.items = data.products

        this.meta = {
          ...this.meta,
          total: data?.total,
        }
      }
    },
  },

  state: (): IBaseStore => ({
    ...baseStore.state,

    items: [],
  }),
})

export default useSearchProductsStore
