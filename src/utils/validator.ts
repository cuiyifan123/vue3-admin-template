// 自定义校验

// 手机号校验
export function validMobile(mobile: string) {
  return /^1[3-9]\d{9}/.test(mobile)
}

// 密码校验
export function validPassword(password: string) {
  return /^\d{6,16}$/.test(password)
}
