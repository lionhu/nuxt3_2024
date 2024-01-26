import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, _from) => {
  const { order } = useShop()
  if (!order.value) {
    useCookie('redirect', { path: '/mall' }).value = to.fullPath
    return navigateTo('/mall')
  }
})
