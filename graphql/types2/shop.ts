import { Addressbook } from './addressbook'
import { Faq } from './etaxi'

export type Category = {
  id: number
  name: string
  model: string
  products: Product[]
  faqs: Faq[]
  count?: number
}
export type Product = {
  id: number
  name: string
  category: Category
  description?: string
  [key: string]: any
}

export type Variation = {
  id: number
  name: string
  price: number
  buy_price: number
  description?: string
  [key: string]: any
}

export type Cartitem = {
  qty: number
  total: number
  product: Product
  variation: Variation
}

export type SimpleCartItem = {
  qty: number
  total: number
  price: number
  product: number
  variation: number
  obj_product?: Product
  obj_variation?: Variation
}
export type DisplayCartItem = {
  qty: number
  total: number
  price: number
  product: number
  variation: number
  obj_product: Product
  obj_variation: Variation
}

export type Shoppingcart = {
  addressbook: string
  cartitems: SimpleCartItem[]
  Total: number
  Qty: number
}

export type OrderItem = {
  id: string
  qty: number
  total: number
  total_buy: number
  variation: Variation
  product: Product
  detail_json: Record<string, any>
}

export interface CommonOrder {
  [key: string]: any
}
export type Order = {
  id: string
  Qty: number
  Total: number
  Total_buy: number
  status: string
  paid: boolean
  paid_at: Date
  paid_supplier: boolean
  paid_supplier_at: Date
  payment_info: Record<string, any>
  payment_supplier_info: Record<string, any>
  delivered: boolean
  delivered_at: Date
  delivery_info: Record<string, any>
  createdAt: Date
  addressbook: Addressbook
  address_json: Record<string, any>
  users_permissions_user: Record<string, any>
  orderitems: Array<OrderItem>
}

export interface OrderFilter {
  fromDateTime?: Date | String
  endDatetime?: Date | String
  byStatus?: String
  userId?: String
}

export interface PaymentInfo {
  memo?: string
  amount?: number
  method: string
  status: string
  selectDay?: Date
  paymentId?: string
}

export interface Setting {
  [key: string]: any
}
