export interface User {
  id?: string
  username: string
  email: string
  password?: string
  firstName: string
  lastName: string
  designation?: string
  department?: string
  roles: string[]
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface LoginRequest {
  username: string
  password: string
}

export interface SignupRequest {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  designation?: string
  department?: string
  roles?: string[]
}

export interface JwtResponse {
  token: string
  type: string
  id: string
  username: string
  email: string
  roles: string[]
}
