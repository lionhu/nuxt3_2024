import { storeToRefs } from 'pinia'
import { useShopStore } from '~~/stores/shop'

export default defineNuxtRouteMiddleware((to, _from) => {
  const storeShop = useShopStore()
  const { order } = storeToRefs(storeShop)
  if (!order.value) {
    useCookie('redirect', { path: '/mall' }).value = to.fullPath
    return navigateTo('/mall')
  }
})
