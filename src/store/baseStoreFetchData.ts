import useApi, {IResponseReturn} from '~/assets/js/helpers/useApi'

export interface IMetaBaseStore {
  limit: number
  skip: number
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
  getSkip: (state: IBaseStore) => number
  getMeta: (state: IBaseStore) => IMetaBaseStore
  getLimit: (state: IBaseStore) => number
  getTotal: (state: IBaseStore) => number
  getFilter: (state: IBaseStore) => any
  getItemsForOptions: (state: IBaseStore) => any
  [key: string]: any
}

export interface IBaseStoreActions {
  setData: (data: any) => void
  setMeta: (meta: IMetaBaseStore) => void
  setItems: (items: any[]) => void
  setFilter: (filters: { [key: string]: any }) => void
  fetchData: (filter?: { [key: string]: any }, url?: string) => Promise<IResponseReturn>
  deleteData: (id: string | number) => Promise<IResponseReturn>
  resetStore: () => void
  fetchDataWithoutStore: (filter?: { [key: string]: any }) => Promise<IResponseReturn>
  [key: string]: any
}

export const filterParams = (params: {[key: string]: any} | null) => {
  if (!params) return null
  return Object.keys(params).reduce((acc: { [key: string]: any }, curr) => {
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
  getItems(state: IBaseStore): Partial<IBaseStore> {
    return state.items
  },
  getMeta(state: IBaseStore): IMetaBaseStore {
    return state.meta || {}
  },
  getItemsForOptions(state: IBaseStore): Partial<IBaseStore> {
    return state.items.map((item: any) => {
      return {
        ...item,
        label: item.name,
        code: item.id,
      }
    })
  },
  getSkip(state: IBaseStore): number {
    return state.meta.skip || 0
  },
  getLimit(state: IBaseStore): number {
    return state.meta.limit || 1000
  },
  getTotal(state: IBaseStore): number {
    return state.meta.total || 0
  },
  getFilter(state: IBaseStore): Partial<IBaseStore> {
    return state.filter
  },
}

const actions: (apiUrl?: string | '') => IBaseStoreActions = (apiUrl: string | '' =''): IBaseStoreActions => {
  return {
    resetStore() {
      this.items = []
      this.meta = {
        limit: 1000,
        skip: 0,
        total: 0,
      }
    },
    setData(data: IResponseReturn) {
      if (data.data) {
        this.items = data.data

        this.meta = {
          ...this.meta,
          limit: data?.data?.limit,
          skip: data?.data?.skip,
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
    async setFilter(filters: { [key: string]: any } = {}) {
      const currentFilters: any = {
        ...this.filter,
        ...filters,
      }

      this.filter = currentFilters
      await this.fetchData(this.filter)
    },
    delFilter() {
      this.filter = {}
    },
    async fetchData(filter: { [key: string]: any } = {}, url = '') {
      const filteredFilters = filterParams(filter)
      this.loading = true
      const result: IResponseReturn = await useApi.get(apiUrl + url, null, { params: filteredFilters })
      this.loading = false

      if (result.data) this.setData(result.data)
      return result
    },
    async fetchDataWithoutStore(filter: { [key: string]: any } = {}, url = '') {
      const filteredFilters = filterParams(filter)
      const result: IResponseReturn = await useApi.get(apiUrl + url, null, { params: filteredFilters })
      return result
    },
    async deleteData(id: string | number = '') {
      const result: IResponseReturn = await useApi.delete(id ? `${apiUrl}/${id}` : `${apiUrl}`, null)

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
    limit: 1000,
    skip: 0,
    total: 0,
  },
  items: [],
  loading: false,
}
export default { state, getters, actions }
