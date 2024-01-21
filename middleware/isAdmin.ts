export default defineNuxtRouteMiddleware(async (to, _from) => {
  const rolename = useCookie('backup.rolename')

  console.error('isAdmin middleware rolename: ', rolename.value)
  if (rolename.value?.toLowerCase() !== 'staff') {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo('/auth/login')
  }
})
