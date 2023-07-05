import { defineStore } from 'pinia'
import { IBaseStore } from './baseStoreFetchData'
import { Product } from '@/types/products'

interface ILikeStore {
  items: Product[]
  total: number
  totalProducts: number
}
export type LikeStore = Pick<IBaseStore, 'loading'> & ILikeStore
export type LikeMetricsStore = Pick<ILikeStore, 'total' | 'totalProducts'>

const useLikeProductsStore = defineStore('likeProducts', {
  getters: {
    getLoading(): boolean {
      return this.loading
    },

    getLikesMetrics(): LikeMetricsStore  {
      return {
        total: this.total,
        totalProducts: this.totalProducts,
      }
    },

    getLikeProducts(): Product[] {
      return this.items
    },
  },

  actions: {
    resetLikeMetrics() {
      this.total = 0
      this.totalProducts = 0
    },

    async initLikes() {
      const likes: any = await localStorage.getItem('likes')
      if (!likes) return
      this.items = JSON.parse(likes)
      this.parseLickedProducts()
    },

    async parseLickedProducts() {
      this.resetLikeMetrics()

      this.items.forEach((product: Product) => {
        const price = product.price

        this.totalProducts++
        this.total = this.total + price
      })
    },

    isLicked(product: Product){
      return !!this.items.find((item: Product) => item.id === product.id && item.category===product.category)
    },

    async deleteAllLikes() {
      this.items = []
      await localStorage.setItem('likes', JSON.stringify(this.items))
      this.parseLickedProducts()
    },

    async deleteGroupLikes(productIds: number[]) {
      let products: Product[] = this.items
      productIds.map((item: number) => {
        products = products.filter((product: Product) => product.id !== item)
      })
      this.items = products

      await localStorage.setItem('likes', JSON.stringify(this.items))
      this.parseLickedProducts()
    },

    async updateLikes(product: Product) {
      const findLike: Product | undefined = this.items.find((item: Product) => item.id === product.id && item.category===product.category)
      if (findLike === undefined) {
        this.items = [
          ...this.items,
          product,
        ]
        await localStorage.setItem('likes', JSON.stringify(this.items))
      } else {
        this.items = this.items.filter((item: Product) => item.id !== product.id)
        await localStorage.setItem('likes', JSON.stringify(this.items))
      }

      this.parseLickedProducts()
    },
  },

  state: (): LikeStore => ({
    loading: false,
    items: [],
    total: 0,
    totalProducts: 0,
  }),
})

export default useLikeProductsStore
