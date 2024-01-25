import { storeToRefs } from 'pinia'
import {
  addAddressbook,
  deleteAddressbook,
  updateAddressbook,
  queryUserAddressbooks,
  queryUserDefaultAddressbook,
} from '../graphql/queries/addressbook'
import type {
  Addressbook,
  AddressbookEntity,
  AddressbookEntityResponse,
} from '../types/addressbook'
import { useAddressbookStore } from '~~/stores/addressbook'

export const useAddressBook = () => {
  const storeAddress = useAddressbookStore()
  const { myAddressbooks, selectedAddressbook, SelectedAddressbookID } =
    storeToRefs(storeAddress)

  async function getUserAddressbooks() {
    try {
      const { UserID } = useAuth()
      const graphql = useStrapiGraphQL()
      const variable = {
        useId: {
          eq: UserID.value,
        },
      }

      const { data } = await graphql<any>(queryUserAddressbooks, variable)

      storeAddress.setMyAddressBook(data.addressbooks)
    } catch (error) {
      console.log('getUserAddressbooks', error)
      return []
    }
  }
  async function getUserDefaultAddressbook() {
    try {
      const { UserID } = useAuth()
      const graphql = useStrapiGraphQL()
      const variable = {
        useId: {
          eq: UserID.value,
        },
      }
      const { data } = await graphql<any>(queryUserDefaultAddressbook, variable)
      return data
    } catch (error) {
      console.log('getUserDefaultAddressbook', error)
      return null
    }
  }

  async function optDeleteAddressbook(_id: string) {
    try {
      const graphql = useStrapiGraphQL()
      const { data } = await graphql<any>(deleteAddressbook, {
        id: _id,
      })
      if (_id === (data.deleteAddressbook as Addressbook).id)
        storeAddress.deleteAddressBook(_id)
    } catch (error) {
      console.log('optDeleteAddressbook', error)
    }
  }

  async function optUpdateAddressbook(_id: string, _data: any) {
    try {
      const graphql = useStrapiGraphQL()
      const { data } = await graphql<any>(updateAddressbook, {
        id: _id,
        data: _data,
      })
      return data
    } catch (error) {
      console.log('optUpdateAddressbook', error)
      return null
    }
  }

  async function optAddAddressbook(_addressbook: any) {
    try {
      const graphql = useStrapiGraphQL()
      const { data } = await graphql<any>(addAddressbook, {
        data: _addressbook,
      })
      if (data.createAddressbook?.id) {
        delete data.createAddressbook.__typename
        storeAddress.setSelectedAddressBook(data.createAddressbook)
      }
    } catch (error) {
      console.log('optAddAddressbook', error)
      throw new Error('Fail to add address')
    }
  }

  function selectAddressbookID(_id: string) {
    storeAddress.setSelectedAddressBookID(_id)
  }
  return {
    myAddressbooks,
    selectedAddressbook,
    SelectedAddressbookID,

    getUserAddressbooks,
    getUserDefaultAddressbook,
    optAddAddressbook,
    optUpdateAddressbook,
    optDeleteAddressbook,
    selectAddressbookID,
  }
}
