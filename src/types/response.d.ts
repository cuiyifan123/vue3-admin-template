export interface ResponseResult<T> {
  success: boolean
  code: number
  message: string
  data: T
}

export type UserLoginData = string
