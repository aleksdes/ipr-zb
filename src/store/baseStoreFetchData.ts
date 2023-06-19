import useApi from '@/assets/js/helpers/useApi'

export interface IMetaBaseStore {
  current_page: number
  per_page: number
  total: number
}

export interface IBaseStore {
  loading: boolean
  meta: IMetaBaseStore
  filter: any
  [key: string]: any
}

export interface IBaseStoreGetters {
  getLoading: (state: IBaseStore) => boolean
  getItems: (state: IBaseStore) => any
  getPage: (state: IBaseStore) => number
  getMeta: (state: IBaseStore) => IMetaBaseStore
  getPerPage: (state: IBaseStore) => number
  getTotal: (state: IBaseStore) => number
  getFilter: (state: IBaseStore) => any
  getItemsForOptions: (state: IBaseStore) => any
  [key: string]: any
}

export interface IBaseStoreActions {
  setData: (data: any) => void
  setMeta: (meta: IMetaBaseStore) => void
  setItems: (items: any[]) => void
  setFilter: (filters: any) => void
  fetchData: (filter?: any, url?: string) => Promise<any>
  deleteData: (id: string | number) => Promise<any>
  resetStore: () => void
  fetchDataWithoutStore: (filter?: any) => Promise<any>
  [key: string]: any
}

const filterParams = (params: any) => {
  if (!params) return null
  return Object.keys(params).reduce((acc: any, curr) => {
    if (params[curr] !== null && params[curr] !== undefined) {
      acc[curr] = params[curr]
    }
    return acc
  }, {})
}

const getters: IBaseStoreGetters = {
  getLoading(state: IBaseStore): boolean {
    return state.loading
  },
  getItems(state: IBaseStore): any {
    return state.items
  },
  getMeta(state: IBaseStore): IMetaBaseStore {
    return state.meta || {}
  },
  getItemsForOptions(state: IBaseStore): any {
    return state.items.map((item: any) => {
      return {
        ...item,
        label: item.name,
        code: item.extid || item.id,
      }
    })
  },
  getPage(state: IBaseStore): number {
    return state.meta.current_page || 0
  },
  getPerPage(state: IBaseStore): number {
    return state.meta.per_page || 0
  },
  getTotal(state: IBaseStore): number {
    return state.meta.total || 0
  },
  getFilter(state: IBaseStore): any {
    return state.filter
  },
}

const actions: (apiUrl?: string | '') => IBaseStoreActions = (apiUrl: string | '' =''): IBaseStoreActions => {
  return {
    resetStore() {
      this.items = []
      this.meta = {
        ...this.meta,
        current_page: 0,
        total: 0,
      }
    },
    setData(data: any) {
      if (data.data) {
        this.items = data.data

        this.meta = {
          ...this.meta,
          current_page: 0,
          total: data?.data?.total,
        }
      }
    },
    setMeta(meta: IMetaBaseStore) {
      this.meta = meta
    },
    setItems(items: any[]) {
      this.items = items
    },
    setFilter(filters: any = {}) {
      const currentFilters: any = {
        ...this.filter,
        ...filters,
      }

      this.filter = currentFilters
      this.fetchData(this.filter)
    },
    delFilter() {
      this.filter = {}
    },
    async fetchData(filter: any = {}, url='') {
      const filteredFilters = filterParams(filter)
      this.loading = true
      const result: any = await useApi.get(apiUrl+url, null, { params: filteredFilters })
      this.loading = false
      console.log('result', result)
      this.setData(result.data)
      return result
    },
    async fetchDataWithoutStore(filter: any = {}, url='') {
      const filteredFilters = filterParams(filter)
      const result: any = await useApi.get(apiUrl+url, null, { params: filteredFilters })
      return result
    },
    async deleteData(id: string | number) {
      const result: any = await useApi.delete(id ? `${apiUrl}/${id}` : `${apiUrl}`, null)
      if (!result.errors) {
        await this.fetchData()
      }

      return result
    },
  }
}

const state: IBaseStore = {
  filter: {},
  meta: {
    current_page: 0,
    per_page: 1000,
    total: 0,
  },
  items: [],
  loading: false,
}
export default { state, getters, actions }
