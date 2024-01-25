import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Addressbook } from '~~/types/addressbook'

// const { getUserAddressbooks, optDeleteAddressbook } = useAddressBook()

export interface stateAddressbook {
  myAddressbooks: Addressbook[]
  selectedAddressbook: Addressbook | null
}

export const useAddressbookStore = defineStore('addressbooks', {
  persist: true,
  state: (): stateAddressbook => ({
    myAddressbooks: [],
    selectedAddressbook: null,
  }),

  getters: {
    getterSelectAddressbook(): any {
      return this.selectedAddressbook || {}
    },
    SelectedAddressbookID(): string {
      return this.selectedAddressbook ? this.selectedAddressbook.id : ''
    },
  },

  // actions -> 状態を変更するaction(methodsに相当)
  actions: {
    reset(): void {
      this.myAddressbooks = []
      this.selectedAddressbook = null
    },
    setMyAddressBook(addressbooks: Addressbook[]) {
      this.reset()
      if (addressbooks && addressbooks.length) {
        this.myAddressbooks = addressbooks
        addressbooks.forEach((address: any) => {
          if (address.as_default) this.selectedAddressbook = address
        })
      }
    },
    deleteAddressBook(uid: string) {
      const index = this.myAddressbooks.findIndex((item) => item.id === uid)
      if (index > -1) {
        this.myAddressbooks.splice(index, 1)
      }
    },
    setSelectedAddressBookID(uid: string) {
      const index = this.myAddressbooks.findIndex(
        (item: Addressbook) => item.id === uid,
      )
      if (index > -1) {
        this.selectedAddressbook = this.myAddressbooks[index]
      }
    },
    setSelectedAddressBook(_addressbook: Addressbook) {
      this.myAddressbooks.unshift(_addressbook)
      this.selectedAddressbook = _addressbook
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAddressbookStore, import.meta.hot))
