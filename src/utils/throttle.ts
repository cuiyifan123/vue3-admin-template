type callback = (...args: any) => any
export function throttle(callback: callback, wait: number) {
  let timer: any = false
  return function (this: any, ...rest: any) {
    const now = !timer
    if (now) {
      callback.apply(this, rest)
      timer = setTimeout(() => {
        timer = null
      }, wait)
    }
  }
}
