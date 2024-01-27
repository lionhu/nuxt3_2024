export default defineNuxtRouteMiddleware((to, _from) => {
  if (process.client) {
    const { Total } = useShop()

    if (Total.value === 0) {
      useCookie('redirect', { path: '/mall' }).value = to.fullPath
      return abortNavigation()
      return navigateTo('/mall')
    }
  }
})
