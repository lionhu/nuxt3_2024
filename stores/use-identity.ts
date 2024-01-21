import { defineStore, acceptHMRUpdate } from 'pinia'
import type { WavusUser, WavusClient, WavusUserProfile } from '../types/user'

export interface IIdentityState {
  user: WavusUser | null
  strapiToken: string
}

export const useIdentity = defineStore('identity', {
  persist: true,
  state: (): IIdentityState => ({
    user: null,
    strapiToken: '',
  }),
  actions: {
    restoreDate(data: IIdentityState) {
      this.user = data.user
    },
    setUser(user: WavusUser) {
      this.user = user
      const token = useStrapiToken()
      console.log('strapi token', token)
      this.strapiToken = token.value
      // if (user && user.role) {
      //   const rolename = useCookie('backup.rolename')
      //   rolename.value = user.role?.name.toLowerCase()
      // }
    },
    reset() {
      this.user = null
      this.strapiToken = ''
    },
  },
  getters: {
    LoggedIn: (state): boolean => state.strapiToken !== '',
    UserProfile: (state): WavusUserProfile | null =>
      state.user?.profile as WavusUserProfile,
    UserAvatar: (state): string => {
      return state.user?.avatar?.url || '/images/etaxi/airport.jpg'
    },
    rolename: (state): string => {
      if (!state.user) return 'public'
      return state.user?.role?.name?.toLowerCase() as string
    },
    IsStaff: (state): boolean => {
      return state.user?.role?.name?.toLowerCase() === 'staff'
    },
    UserClient: (state): WavusClient | null =>
      state.user?.client as WavusClient,
    ClientID: (state): number =>
      state.user?.client ? parseInt(state.user.client.id) : 0,
    UserID: (state): number => (state.user ? state.user.id : 0),
    UserQR: (state): string => {
      if (state.user && state.user.slug) {
        const runtimeConfig = useRuntimeConfig()
        return `${runtimeConfig.public.FRONT_URL}/auth/register?slug=${state.user?.slug}`
      }
      return ''
    },
    EnableShoppingMallAPP: (state): boolean => {
      if (state.user && state.user.client) {
        return (state.user?.client as WavusClient).extra_info.sections
          .shopping_mall
          ? (state.user?.client as WavusClient).extra_info.sections
              .shopping_mall.enable
          : false
      }
      return false
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useIdentity, import.meta.hot))
