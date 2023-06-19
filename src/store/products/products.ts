import { defineStore } from 'pinia'
import baseStore, { IBaseStore } from '../baseStoreFetchData'
import {productsUrls} from '@/constants/urls'

const useProductsStore = defineStore('products', {
  getters: {
    ...baseStore.getters,
  },

  actions: {
    ...baseStore.actions(productsUrls.PRODUCTS_URL),
    setData(data: any) {
      if (data.products) {
        this.items = data.products

        this.meta = {
          ...this.meta,
          current_page: 0,
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

export default useProductsStore
