export interface DeliveryInfo {
  memo?: string
  method: string
  status: string
  track_no: string
  selectDay: Date
}

export type Addressbook = {
  id?: string
  receiver: string
  postcode: string
  address_first: string
  address_last: string
  email: string
  phone: string
  as_default?: boolean
  seed?: string
}

export type AddressbookEntity = {
  id: string
  attributes: Addressbook
}

export type AddressbookEntityResponse = {
  data: AddressbookEntity
}
