import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
import type { UserLogin } from '@/types/request'

export const userStore = defineStore('user', () => {
  // 初始化状态，reset调用时恢复的状态，并不使用
  const initState = {
    // 如果本地没有token，则默认使用 '' 空字符串
    token: getToken() || ''
  }
  const token = ref(initState.token)

  const userLogin = async (data: UserLogin) => {
    const res = await login(data)
    // 成功后在 全局(pinia) 和 本地 保存token
    token.value = res.data
    setToken(res.data)
    return res
  }

  // 重写react
  const reset = () => {
    token.value = initState.token
  }
  return { token, userLogin, reset }
})
