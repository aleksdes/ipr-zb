import productsUrls, {IProductsUrls} from './urls/products'
import authUrls, { IAuthUrls } from './urls/auth'
interface IUrls {
  products: IProductsUrls
  authUrls: IAuthUrls
}

const urls: IUrls = {
  products: productsUrls,
  authUrls,
}

export default urls
export {productsUrls, authUrls }
