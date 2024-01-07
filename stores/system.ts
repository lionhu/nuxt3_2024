/* eslint-disable no-console */
import { acceptHMRUpdate, storeToRefs } from 'pinia'
// import type { Setting } from '@/graphql/types/shop'
// import { querySettings } from '@/graphql/queries/system'
export interface stateShop {
  settings: any
}

export const useSystemStore = defineStore('system', {
  persist: {
    storage: persistedState.localStorage,
  },
  state: (): stateShop => ({
    settings: null,
  }),

  getters: {
    //   ENABLE_SHOPPING(): boolean {
    //     if (this.settings && this.settings.sections.mall) return true
    //     return false
    //   },
    //   ENABLE_SETTINGS(): boolean {
    //     if (this.settings && this.settings.sections.settings) return true
    //     return false
    //   },
    // ENABLE_REGISTER(): boolean {
    //   if (this.settings && this.settings.register_enable) return true
    //   return false
    // },
    //   SETTINGS_FOR_ROLENAME(): string {
    //     return this.settings && this.settings.title ? this.settings.title : ''
    //   },
  },

  // actions -> 状態を変更するaction(methodsに相当)
  actions: {
    empty() {
      this.settings = null
    },
    set() {
      this.settings = 'hello'
    },
    // async initShopSetting(forceEmpty = false, key = 'system') {
    //   await this.load_SYSTEM_Setting(forceEmpty, key)
    // },
    // async load_SYSTEM_Setting(
    //   forceEmpty = false,
    //   key = 'system',
    //   _rolename = '',
    // ) {
    //   try {
    //     const role = 'public'
    //     if (_rolename === '' && !forceEmpty) {
    //       // const storeUser = useIdentity()
    //       // const { rolename } = storeToRefs(storeUser)
    //       // role = rolename.value !== '' ? rolename.value : 'public'
    //     }

    //     const graphql = useStrapiGraphQL()
    //     const variable = {
    //       rolename: {
    //         eq: role,
    //       },
    //       key: {
    //         eq: key,
    //       },
    //     }
    //     await graphql<{
    //       data: { settings: Array<Setting> }
    //     }>(querySettings, variable)
    //       .then((response: any) => {
    //         const { data } = response
    //         console.log('data', data)
    //         this.settings = data.settings[0].setting
    //       })
    //       .catch((_error) => {
    //         this.settings = null
    //       })
    //   } catch (error) {
    //     console.log('load_SYSTEM_Setting error', error)
    //     this.empty()
    //   }
    // },
    // async upload(formData: any) {
    //   const client = useStrapiClient()
    //   return await client<any>(`/upload`, {
    //     method: 'POST',
    //     body: formData,
    //   })
    // },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSystemStore, import.meta.hot))
