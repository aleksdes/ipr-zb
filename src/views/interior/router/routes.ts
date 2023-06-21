import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/interior/furniture',
    name: routeNames.interior.furniture,
    component: () => import('@/views/interior/furniture/FurnitureView.vue'),
  },
  {
    path: '/interior/homeDecoration',
    name: routeNames.interior.homeDecoration,
    component: () => import('@/views/interior/homeDecoration/HomeDecorationView.vue'),
  },
  {
    path: '/interior/lighting',
    name: routeNames.interior.lighting,
    component: () => import('@/views/interior/lighting/LightingView.vue'),
  },
]

export default routes
