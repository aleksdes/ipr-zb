import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: routeNames.login,
    component: () => import('@/views/auth/AuthView.vue'),
    meta: {
      layout: 'AuthLayout',
      useComponent: 'LoginForm',
    },
  },
]
export default routes
