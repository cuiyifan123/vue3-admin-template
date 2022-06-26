import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ResponseResult } from '@/types/response'
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use(
  (response) => {
    // 与后台约定的如果success为false表示请求成功，但是处理失败(  账号密码错误，权限不够 )
    if (!response.data.success) {
      return Promise.reject(new Error(response.data.message))
    }
    return response
  },
  (error) => {
    console.log(error)
  }
)

export async function reuqest<T>(config: AxiosRequestConfig) {
  const res = await instance.request<ResponseResult<T>>(config)
  return res.data
}
