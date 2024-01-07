export interface Avatar {
  id: number
  url: string
}
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
  pingAt?: Date
  avatar?: Avatar
  client?: {
    id: string
    name: string
  }
}

export interface WavusUser extends WavusActiveUser {
  provider?: string
  confirmed?: boolean
  blocked?: boolean
  createdAt?: string
  updatedAt?: string
  token?: string
  slug?: string
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
