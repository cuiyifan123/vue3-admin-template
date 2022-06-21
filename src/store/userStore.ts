import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
export const userStore = defineStore('user', () => {
  // 初始化状态，reset调用时恢复的状态，并不使用
  const initState = {
    token: '1'
  }
  const token = ref(initState.token)
  
  // 重写react
  const reset = () => {
    token.value = initState.token
  }
  return { token }
})
