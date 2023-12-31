import axios from 'axios'
import errorHandler from '@/assets/js/helpers/useErrorHandler'
import useTokenStore from '@/store/token'
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

interface IOptionsUseResponse {
  url: string
  method: 'delete' | 'get' | 'patch' | 'post' | 'put'
  [key: string]: any
}

interface IUseResponse {
  (data: any | null, options: IOptionsUseResponse): Promise<IResponseReturn>
}
export interface IResponseReturn {
  data?: any,
  errors?: any
}
const useResponse: IUseResponse = async (data = null, options: IOptionsUseResponse): Promise<IResponseReturn> => {
  let response: IResponseReturn = {}

  const isUseErrorHandler = options.useErrorHandler !== undefined ? options.useErrorHandler : true

  const tokenStore = useTokenStore()
  options.token = tokenStore.accessToken

  let headers = options?.headers || {}
  headers = {
    ...headers,
    'Content-Type': 'application/json; charset=utf-8',
    ...(options.token && {
      Authorization: `Bearer ${options.token}`,
    }),
    ...(options.userAgent && {
      'User-Agent': options.userAgent,
    }),
    ...(options.cookies && {
      Cookie: options.cookies,
    }),
  }

  if (options.method !== 'get' && data) {
    if (typeof FormData !== 'undefined' && data instanceof FormData) {
      headers = { ...headers, 'Content-Type': 'multipart/form-data' }
    }
  }

  try {
    response = await api({
      ...options,
      headers: headers,
      data,
    })
  } catch (error) {
    console.error(error)

    if (isUseErrorHandler) await errorHandler(error)

    response.errors = error
  }

  return response
}

interface IBaseApi {
  delete(url: string, data: any | null, opts?: any): Promise<IResponseReturn>
  get(url: string, data?: null, opts?: any): Promise<IResponseReturn>
  patch(url: string, data: any | null, opts?: any): Promise<IResponseReturn>
  post(url: string, data: any | null, opts?: any): Promise<IResponseReturn>
  put(url: string, data: any | null, opts?: any): Promise<IResponseReturn>
}

const useApi: IBaseApi = {
  delete(url: string, data = null, opts = {}) {
    return useResponse(data, {
      method: 'delete',
      url,
      ...opts,
    })
  },

  get(url: string, data = null, opts = {}) {
    return useResponse(data, {
      method: 'get',
      url,
      ...opts,
    })
  },

  patch(url: string, data = null, opts = {}) {
    return useResponse(data, {
      method: 'patch',
      url,
      ...opts,
    })
  },

  post(url: string, data = null, opts = {}) {
    return useResponse(data, {
      method: 'post',
      url,
      ...opts,
    })
  },

  put(url: string, data = null, opts = {}) {
    return useResponse(data, {
      method: 'put',
      url,
      ...opts,
    })
  },
}

export default useApi
export { api }
