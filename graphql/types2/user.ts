export interface WavusUserProfile {
  sex: string
  avatar: {
    url: string
  }
  [key: string]: any
}
export interface UserRole {
  id: number
  name: string
  [key: string]: any
}
export interface WavusActiveUser {
  id: number
  username: string
  email: string
  role?: UserRole
  profile?: WavusUserProfile
  pingAt: Date
  client: {
    id: string
    name: string
  }
}
export interface WavusDriverShip {
  id: number
  name: string
  privilege: any
  [key: string]: any
}
export interface WavusDriver {
  id: string
  balance: number
  balanceAt: Date
  sex: string
  phone: string
  memberUntilAt: Date | null
  drivership: WavusDriverShip | null | string
  images: {
    url: string
  }
  [key: string]: any
}

export interface WavusUser extends WavusActiveUser {
  provider?: string
  confirmed?: boolean
  blocked?: boolean
  createdAt?: string
  updatedAt?: string
  token?: string
  slug?: string
  driver: WavusDriver | null
}

export interface WavusClient {
  id: string
  name: string
  admin?: {
    id: string
    username: string
    avatar?: {
      url?: string
    }
  }
  extra_info?: any
}
