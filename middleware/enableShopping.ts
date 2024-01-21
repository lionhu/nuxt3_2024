// import { useShopStore } from '~~/stores/shop'
import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, _from) => {
  const { EnableShoppingMallAPP } = useAuth()

  console.log(
    'EnableShoppingMallAPP',
    EnableShoppingMallAPP.value,
    !EnableShoppingMallAPP.value,
  )

  if (!EnableShoppingMallAPP.value) {
    console.log('why')
    useCookie('redirect', { path: '/' }).value = to.fullPath
    console.log('why  ds')
    return abortNavigation()
    return navigateTo('/')
  }
})
