import { WavusUserProfile } from '~/graphql/types/user'
import { Category } from './shop'

export const statusStyles = reactive<{
  [key: string]: string
}>({
  NEW: 'bg-primary-500 text-white uppercase',
  RECRUITING: 'badge-warning text-white uppercase',
  PROCESSING: 'badge-info uppercase',
  COMPLETED: 'badge-success uppercase',
  CANCELED: ' bg-gray-300 text-gray-600 uppercase',
})
export const drivershipStyles = reactive<{
  [key: string]: string
}>({
  FREE: 'bg-primary-500 text-white uppercase',
  PREMIUM: 'badge-warning text-white uppercase',
  SILVER: 'badge-info uppercase',
})

export interface Image {
  id: string
  url: string
}
export interface Driver {
  id: string | number
  sex: string
  [key: string]: any
}
export interface Application {
  id: string | number
  price: number
  untilAt: Date
  status: string
  memo: string
  driver: Driver
  [key: string]: any
}
export type Deposite = {
  id: string
  in_out: string
  memo: any
  amount: number
  driver: {
    id: string
  }
}
export type Balance = {
  id: string
  inout: string
  amount: number
  strEventDate: string
  model: string
  model_id: string
  memo: any
  createdAt: Date
}
export type Ticket = {
  id: string
  users_permissions_user: {
    id: string
    profile: WavusUserProfile
    [key: string]: any
  }
  location_from: {
    type: string
    value: {
      [key: string]: string
    }
  }
  location_to: {
    type: string
    value: {
      [key: string]: string
    }
  }
  untilAt: Date
  eventAt: Date
  createdAt: Date
  notify_me: boolean
  memo: string
  people_num: number
  suitcase_num: number
  status: string
  paid: boolean
  paid_info: {
    paidAt: Date
    method: string
  }
  tripType: string
  images: Array<Image> | null
  applications: Array<Application> | null
  selected_application: Application | null
  [key: string]: any
}

export type Faq = {
  question: string
  answer: string
  category: Category
  for_role: Object
}
