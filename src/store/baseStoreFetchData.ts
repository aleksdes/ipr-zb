import useApi from '@/assets/js/helpers/useApi'

export interface IMetaBaseStore {
  current_page: number
  per_page: number
  total: number
}
export interface IBaseStore {
  meta: IMetaBaseStore
  loading: boolean
  filter: any
  [key: string]: any
}

export interface IBaseStoreGetters {
  getLoading: (state: IBaseStore) => boolean
  getItems: (state: IBaseStore) => any
  getMeta: (state: IBaseStore) => IMetaBaseStore
  getPage: (state: IBaseStore) => number
  getPerPage: (state: IBaseStore) => number
  getTotal: (state: IBaseStore) => number
  getFilter: (state: IBaseStore) => any
  getItemsForOptions: (state: IBaseStore) => any
  [key: string]: any
}

export interface IBaseStoreActions {
  setData: (data: any) => void
  setItems: (items: any[]) => void
  setMeta: (meta: IMetaBaseStore) => void
  setFilter: (filters: any) => void
  fetchData: (filter?: any) => Promise<any>
  deleteData: (id: string | number) => Promise<any>
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
  getItemsForOptions(state: IBaseStore): any {
    return state.items.map((item: any) => {
      return {
        ...item,
        label: item.name,
        code: item.extid || item.id,
      }
    })
  },
  getMeta(state: IBaseStore): IMetaBaseStore {
    return state.meta || {}
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
    setData(data: any) {
      if (data.data) {
        this.items = data.data
      }
      if (data.meta) {
        this.meta = data.meta
      }
    },
    setItems(items: any[]) {
      this.items = items
    },
    setMeta(meta: IMetaBaseStore) {
      this.meta = meta
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
    async fetchData(filter: any = {}) {
      const filteredFilters = filterParams(filter)
      this.loading = true
      const result: any = await useApi.get(apiUrl, null, { params: filteredFilters })
      this.loading = false

      if (
        result.errors ||
        (result.data && Array.isArray(result.data) && !result.data.length) ||
        (result.data && !result.data.data)
      )
        return result

      this.setData(result.data)
      return result.data
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
  meta: {
    current_page: 0,
    per_page: 1000,
    total: 0,
  },
  filter: {},
  items: [],
  loading: false,
}
export default { state, getters, actions }
