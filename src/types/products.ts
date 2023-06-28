export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

type PartBasketProduct = Pick<Product, 'id' | 'title' | 'price'>
export type BasketProduct = PartBasketProduct & {
  quantity: number
  total: number
  discountPercentage: number
  discountedPrice: number
  data?: Product
}

