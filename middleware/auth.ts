export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  const { LoggedIn } = useAuth()
  if (!LoggedIn.value) {
    return navigateTo('/')
  }
})
