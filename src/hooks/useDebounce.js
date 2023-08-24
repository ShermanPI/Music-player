export const useDebounce = (callback, delay) => {
  let timeoutId

  return function () {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback()
    }, delay)
  }
}
