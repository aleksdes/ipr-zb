import { defineStore } from 'pinia'
import { IBaseStore } from './baseStoreFetchData'
import { ViewedProductStorage, Product } from '@/types/products'
import moment from 'moment'

interface IViewStore {
  items: ViewedProductStorage[]
}
export type ViewStore = Pick<IBaseStore, 'loading'> & IViewStore

const useRecentlyViewedStore = defineStore('recentlyViewed', {
  getters: {
    getLoading(): boolean {
      return this.loading
    },

    getRecentlyViewed(): ViewedProductStorage[] {
      return this.items
    },
  },

  actions: {
    async initRecentlyViewed() {
      const viewedStorage: any = await localStorage.getItem('viewed')
      if (!viewedStorage) return
      const viewed: ViewedProductStorage[] = JSON.parse(viewedStorage)
      this.items = viewed.filter((view: ViewedProductStorage) => {
        return (moment().unix() - Number(view.viewed_at) <= 24 * 3600)
      })
      await localStorage.setItem('viewed', JSON.stringify(this.items))
    },

    async deleteRecentlyViewed(product: ViewedProductStorage) {
      const findView: ViewedProductStorage | undefined = this.items.find((item: ViewedProductStorage) => item.id === product.id && item.category===product.category)
      if (findView !== undefined) {
        this.items = this.items.filter((item: ViewedProductStorage) => item.id !== product.id)
        await localStorage.setItem('viewed', JSON.stringify(this.items))
      }
    },

    async addRecentlyViewed(product: Product) {
      const findView: ViewedProductStorage | undefined = this.items.find((item: ViewedProductStorage) => item.id === product.id && item.category===product.category)
      if (findView === undefined) {
        const newViewed: ViewedProductStorage = {
          ...product,
          viewed_at: moment().unix(),
        }
        this.items.unshift(newViewed)
        await localStorage.setItem('viewed', JSON.stringify(this.items))
      }
    },
  },

  state: (): ViewStore => ({
    loading: false,
    items: [],
  }),
})

export default useRecentlyViewedStore
