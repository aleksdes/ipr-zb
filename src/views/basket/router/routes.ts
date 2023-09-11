import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '~/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/basket',
    name: routeNames.basket,
    component: () => import('~/views/basket/BasketView.vue'),
  },
]

export default routes
