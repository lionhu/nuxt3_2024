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

export const useAddressBook = () => {
  async function getUserAddressbooks() {
    try {
      const graphql = useStrapiGraphQL()
      const { data } = await graphql<any>(queryUserAddressbooks)
      return data.userAddressbooks
    } catch (error) {
      console.log('getUserAddressbooks', error)
      return []
    }
  }
  async function getUserDefaultAddressbook() {
    try {
      const graphql = useStrapiGraphQL()
      const { data } = await graphql<any>(queryUserDefaultAddressbook)
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
      return data
    } catch (error) {
      console.log('optDeleteAddressbook', error)
      return null
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
      return data
    } catch (error) {
      console.log('optAddAddressbook', error)
      return null
    }
  }

  return {
    getUserAddressbooks,
    getUserDefaultAddressbook,
    optAddAddressbook,
    optUpdateAddressbook,
    optDeleteAddressbook,
  }
}
