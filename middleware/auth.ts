import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to, from) => {
  try {
    const wavusUser = useStorage('wavus_user', null)

    // const { EnableShoppingMallAPP } = useAuth()

    // if (!EnableShoppingMallAPP.value) {
    //   return navigateTo('/')
    // }
    console.log('LoggedIn', wavusUser.value)
  } catch (error) {
    console.log('auth middleware error', error)
  }
})
