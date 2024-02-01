import { storeToRefs } from 'pinia'
import { useSystemStore } from '~~/stores/system'
import { useIdentity } from '~~/stores/use-identity'

export default defineNuxtRouteMiddleware((to, _from) => {
  const storeUser = useIdentity()
  const storeSystem = useSystemStore()
  const { settings } = storeToRefs(storeSystem)
  const { rolename } = storeToRefs(storeUser)

  console.log('has no settings:', settings.value, rolename.value)

  if (!settings.value || settings.value.title !== rolename.value) {
    console.log('has no settings or wrong setting for fole')
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo('/auth/login')
  }

  console.log('has correct settings:')
})
