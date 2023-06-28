import { defineStore } from 'pinia'
import {filterParams, IBaseStore} from './baseStoreFetchData'
import {commonUrls, productsUrls} from '@/constants/urls'
import {BasketProduct, Product} from '@/types/products'
import useApi from '@/assets/js/helpers/useApi'

interface IBasketStoreFetch {
  id: number | null
  products: BasketProduct[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}
export type BasketStore = Pick<IBaseStore, 'loading'> & IBasketStoreFetch
export type BasketMetricsStore = Pick<IBasketStoreFetch, 'total' | 'discountedTotal' | 'totalProducts' | 'totalQuantity'>

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
  },

  actions: {
    async fetchBasketUser({filter = {}, url = ''}: {filter?: any, url?: string | number}) {
      const filteredFilters = filterParams(filter)
      const result: any = await useApi.get(commonUrls.BASKET_URL + url, null, { params: filteredFilters })

      await this.parseBasketUser(result)
      return result
    },

    async parseBasketUser(result: any) {
      const { data, errors }: any = result
      console.log('parseBasketUser', data)
      if (data) {
        this.$state = {
          ...this.$state,
          ...((data?.carts && data?.carts[0]) || data),
        }
      }

      this.products = await Promise.all(this.products.map( async (product: BasketProduct) => {
        const { data }: any = await useApi.get(`${productsUrls.PRODUCTS_URL}/${product.id}`)

        return {
          ...product,
          data: data,
        }
      }))

      await localStorage.setItem('basket', JSON.stringify(this.$state))
      return {data, errors}
    },

    async updateBasket(newProducts: any[] = []) {
      let data: any = this.products
        .filter((item: BasketProduct) => item.quantity > 0)
        .map((item: BasketProduct) => {
          return {
            id: item.id,
            quantity: item.quantity,
          }
        })

      data = [
        ...data,
        ...newProducts,
      ]
      console.log('updateBasket', this.id)
      const result: any = await useApi.put(`${commonUrls.BASKET_BY_ID_URL}/${this.id}`, {
        merge: false,
        products: data,
      })

      this.parseBasketUser(result)
    },

    addToBasket(productId: string | number) {
      const product: BasketProduct | undefined = this.products.find((item: BasketProduct) => item.id === productId)
      if (product !==undefined && !!product) {
        product.quantity++
        this.updateBasket()
      } else {
        this.updateBasket([{
          id: productId,
          quantity: 1,
        }])
      }
    },

    deleteToBasket(productId: string | number) {
      const product: BasketProduct | undefined = this.products.find((item: BasketProduct) => item.id === productId)
      if (product !==undefined && !!product) {
        product.quantity--

        this.updateBasket()
      }
    },

    checkProductInBasket(productId: string | number) {
      const product: BasketProduct | undefined = this.products.find((item: BasketProduct) => item.id === productId)
      return product ?? false
    },
  },

  state: (): BasketStore => ({
    loading: false,
    id: null,
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
  }),
})

export default useBasketStore
