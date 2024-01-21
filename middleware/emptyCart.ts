import { storeToRefs } from 'pinia'
import { useShopStore } from '~~/stores/shop'

export default defineNuxtRouteMiddleware((to, _from) => {
  const storeShop = useShopStore()
  const { Qty, Total, ValidCart, cartitems } =storeToRefs(storeShop)
  if (Total.value === 0) {
    useCookie('redirect', { path: '/mall' }).value = to.fullPath
    return navigateTo('/mall')
  }
})
