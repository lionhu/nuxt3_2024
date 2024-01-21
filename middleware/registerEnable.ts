const { loadSystemSettings, ENABLE_REGISTER } = useSystem()

export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    const settings = await loadSystemSettings(true)
    if (to.fullPath === '/auth/register' && !ENABLE_REGISTER.value) {
      useCookie('redirect', { path: '/' }).value = to.fullPath
      return navigateTo('/auth/login')
    }
  } catch (error) {
    return navigateTo('/auth/login')
  }
})
