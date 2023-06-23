import productsUrls, {IProductsUrls} from './urls/products'
import authUrls, { IAuthUrls } from './urls/auth'
import commonUrls, {ICommonUrls} from '@/constants/urls/common'
interface IUrls {
  products: IProductsUrls
  authUrls: IAuthUrls
  commonUrls: ICommonUrls
}

const urls: IUrls = {
  products: productsUrls,
  authUrls,
  commonUrls,
}

export default urls
export {productsUrls, authUrls, commonUrls }
