export default defineNuxtRouteMiddleware((to, _from) => {
  if (process.server) return

  const { EnableShoppingMallAPP } = useAuth()

  if (!EnableShoppingMallAPP.value) {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return abortNavigation()
  }
})
