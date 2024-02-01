import { storeToRefs } from 'pinia'
import { useIdentity } from '~~/stores/use-identity'

export default defineNuxtRouteMiddleware((to, _from) => {
  const { setUser, setToken } = useStrapiAuth()
  const storeUser = useIdentity()
  const { user, rolename } = storeToRefs(storeUser)

  if (user.value) {
    setUser(user.value)
    setToken(user.value.token as string)
  }

  if (!user.value || rolename.value?.toLowerCase() !== 'supplier') {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo('/auth/login')
  }
})
