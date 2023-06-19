import productsUrls, {IProductsUrls} from './products'
interface IUrls {
  products: IProductsUrls
}

const urls: IUrls = {
  products: productsUrls,
}

export default urls
export {productsUrls }
