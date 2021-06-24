const debounce = (callback: () => void, limit: number) => {
  let wait = false
  return function () {
    if (!wait) {
      callback()
      wait = true
      setTimeout(function () {
        wait = false
      }, limit)
    }
  }
}

export default debounce
