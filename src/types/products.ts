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

export type BasketProduct = {
  quantity: number
  data: Product
}

export type BasketProductStorage = {
  quantity: number
  id: number
}
