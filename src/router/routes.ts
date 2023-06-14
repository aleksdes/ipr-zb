import { RouteRecordRaw } from 'vue-router'
import { routeNames } from '@/router/RouteNames'

const routes: Array<RouteRecordRaw> = [
  {
    name: routeNames.pageNotFound,
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
]

const routesMyArray = require.context('@/views', true, /routes\.ts$/i)
routesMyArray.keys().map((key: string) => {
  routes.push(...routesMyArray(key).default)
})

export default routes
