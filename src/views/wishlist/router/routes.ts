import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/wishlist',
    name: routeNames.wishlist,
    component: () => import('@/views/wishlist/WishlistView.vue'),
  },
]

export default routes
