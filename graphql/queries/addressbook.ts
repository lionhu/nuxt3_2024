export const addAddressbook = `
  mutation addAddressbook($data: AddressbookInput!) {
    createAddressbook(data: $data) {
      data {
        id
        attributes {
          name
          address_last
          address_first
          phone
          email
          postcode
          as_default
        }
      }
    }
  }
`

// mutationDeleteAddressbook
// const variables = {
//   id: 5,
// }
export const deleteAddressbook = `
  mutation deleteAddressbook($id: ID!) {
    deleteAddressbook(id: $id) {
      data {
        id
      }
    }
  }
`

// mutationDeleteAddressbook
// const variables = {
//   "id": 1,
//   "data": {
//     "phone": "11111111111"
//   }
// }
export const updateAddressbook = `
  mutation updateAddressbook($id: ID!, $data: AddressbookInput!) {
    updateAddressbook(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`

// {
//   "useId": {
//     "eq": 1
//   }
// }
export const queryUserAddressbooks = `
query userAddressbooks($useId:IDFilterInput!) {
  addressbooks(filters:{user:{id:$useId}}) {
    data {
      id
      attributes {
        name
        address_last
        address_first
        phone
        email
        postcode
        as_default
      }
    }
  }
}
`
export const queryUserDefaultAddressbook = `
query userAddressbooks($useId:IDFilterInput!) {
  addressbooks(filters:{user:{id:$useId},as_default:true}) {
    data {
      id
      attributes {
        name
        address_last
        address_first
        phone
        email
        postcode
        as_default
      }
    }
  }
}
`
