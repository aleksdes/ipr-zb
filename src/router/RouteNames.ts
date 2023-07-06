import { IRouteNames } from '@/types/router'

export const routeNames: IRouteNames = {
  home: 'home',
  electronics: {
    smartphones: 'smartphones',
    laptops: 'laptops',
  },
  clothing: {
    mens: {
      shirts: 'mens-shirts',
      shoes: 'mens-shoes',
      watches: 'mens-watches',
    },
    woman: {
      dresses: 'woman-dresses',
      shoes: 'woman-shoes',
      bags: 'woman-bags',
      watches: 'woman-watches',
    },
  },
  beauty: {
    fragrances: 'fragrances',
    skincare: 'skincare',
    sunglasses: 'sunglasses',
  },
  jewelry: 'jewelry',
  interior: {
    furniture: 'furniture',
    homeDecoration: 'homeDecoration',
    lighting: 'lighting',
  },
  basket: 'basket',
  wishlist: 'wishlist',
  profile: 'profile',
  pageNotFound: '404',
}
