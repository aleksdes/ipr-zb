import { defineStore } from 'pinia'
import {IBaseStore} from './baseStoreFetchData'
import {productsUrls} from '@/constants/urls'
import {BasketProduct, BasketProductStorage, Product} from '@/types/products'
import useApi from '@/assets/js/helpers/useApi'

interface IBasketStore {
  id: number | null
  products: BasketProduct[]
  total: number
  discountedTotal: number
  totalProducts: number
  totalQuantity: number
}
export type BasketStore = Pick<IBaseStore, 'loading'> & IBasketStore
export type BasketMetricsStore = Pick<IBasketStore, 'total' | 'discountedTotal' | 'totalProducts' | 'totalQuantity'>

const useBasketStore = defineStore('basket', {
  getters: {
    getLoading(state: BasketStore): boolean {
      return state.loading
    },

    getBasketMetrics(state: BasketStore): BasketMetricsStore {
      return {
        total: this.total,
        discountedTotal: this.discountedTotal,
        totalProducts: this.totalProducts,
        totalQuantity: this.totalQuantity,
      }
    },

    getBasketProducts(): BasketProduct[] {
      return this.products
    },
  },

  actions: {
    resetBasketMetrics() {
      this.total = 0
      this.discountedTotal = 0
      this.totalProducts = 0
      this.totalQuantity = 0
    },

    async fetchBasketUser() {
      this.loading = true
      const storageProducts = await localStorage.getItem('basket')
      if (!storageProducts) {
        await localStorage.setItem('basket', JSON.stringify([]))
        return
      }
      const result: BasketProductStorage[] = JSON.parse(storageProducts)
      await this.fetchBasketProducts(result)
      await this.parseBasketProducts()
      this.loading = false
    },

    async fetchBasketProducts(result: BasketProductStorage[]) {
      this.products = await Promise.all(result.map( async (product: BasketProductStorage): Promise<BasketProduct> => {
        const { data }: any = await useApi.get(`${productsUrls.PRODUCTS_URL}/${product.id}`)

        return {
          quantity: product.quantity,
          data: data,
        }
      }))
    },

    async parseBasketProducts() {
      this.resetBasketMetrics()

      this.products.forEach((product: BasketProduct) => {
        const price = product.data.price
        const totalPriceProduct = price * product.quantity
        const totalPriceProductWitchDiscount = totalPriceProduct * product.data.discountPercentage

        this.totalProducts++
        this.totalQuantity = this.totalQuantity + product.quantity
        this.total = this.total + totalPriceProduct
        this.discountedTotal = this.discountedTotal + totalPriceProductWitchDiscount
      })
    },

    async addToBasket(productId: number) {
      this.loading = true
      const storageProducts = await localStorage.getItem('basket')
      if (!storageProducts) {
        this.loading = false
        return
      }
      const result: BasketProductStorage[] = JSON.parse(storageProducts)
      const productFind: BasketProductStorage | undefined = result.find((item: BasketProductStorage) => item.id === productId)

      if (productFind !== undefined) {
        productFind.quantity++
      } else {
        result.push({
          id: productId,
          quantity: 1,
        })
      }

      await localStorage.setItem('basket', JSON.stringify(result))
      await this.fetchBasketUser()
      this.loading = false
    },

    async deleteToBasket(productId: string | number) {
      const storageProducts = await localStorage.getItem('basket')
      if (!storageProducts) return
      let result: BasketProductStorage[] = JSON.parse(storageProducts)
      const productFind: BasketProductStorage | undefined  = result.find((item: any) => item.id === productId)

      if (productFind !== undefined) {
        productFind.quantity--
        if (productFind.quantity === 0) {
          result = result.filter((item: BasketProductStorage) => item.id !== productId)
        }
      } else {
        return false
      }

      await localStorage.setItem('basket', JSON.stringify(result))
      await this.fetchBasketUser()
    },

    checkProductInBasket(productId: number) {
      const product: BasketProduct | undefined = this.products.find((item: BasketProduct) => item.data.id === productId)
      return product !== undefined
    },

    async clearBasket() {
      await localStorage.setItem('basket', JSON.stringify([]))
      this.fetchBasketUser()
    },
  },

  state: (): BasketStore => ({
    loading: false,
    id: null,
    products: [],
    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0,
  }),
})

export default useBasketStore
