import useTokenStore from '@/store/token'
import useUserStore from '@/store/user'
import { routeNames } from '@/router/RouteNames'

const JWTMiddlewares = (context: any) => {
  context.router.beforeEach(async (to: any, _: any, next: any ) => {
    const tokenStore = useTokenStore()
    const userStore = useUserStore()

    await tokenStore.updateToken()
    await userStore.setUser()

    return next()
  })
}

export default JWTMiddlewares
