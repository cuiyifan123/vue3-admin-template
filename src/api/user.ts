import { reuqest } from '@/utils/request'
import type { UserLogin } from '@/types/request'
// 响应接口data的类型
import { UserLoginData } from './../types/response'

export const login = (data: UserLogin) => {
  return reuqest<UserLoginData>({
    url: '/sys/login',
    method: 'post',
    data
  })
}
