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
  },

  // actions -> 状態を変更するaction(methodsに相当)
  actions: {
    reset(): void {
      this.myAddressbooks = []
      this.selectedAddressbook = null
    },
    setMyAddressBook(addressbooks: Addressbook[]) {

      this.reset()
      if (addressbooks.length) {
        this.myAddressbooks = addressbooks
        addressbooks.forEach((address: any) => {
          if (address.as_default) this.selectedAddressbook = address
        })
      }
    },
    async deleteAddressBook(uid: string) {
      if (
        this.selectedAddressbook &&
        (this.selectedAddressbook as Addressbook).id === uid
      ) {
        this.selectedAddressbook = null
      }
      try {
        const response = await optDeleteAddressbook(uid)
        // console.log(`deleteAddressBook response:`, response.deleteAddressbook)
        if (response.deleteAddressbook && response.deleteAddressbook.id) {
          const index = this.myAddressbooks.findIndex(
            (item) => item.id === response.deleteAddressbook.id,
          )
          if (index > -1) {
            this.myAddressbooks.splice(index, 1)
          }
        }
      } catch (error) {
        console.log(error)
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
