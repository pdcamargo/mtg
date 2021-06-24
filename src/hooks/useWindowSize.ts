import { useEffect, useState } from 'react'

const isClient = typeof window !== 'undefined'

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: isClient ? window.innerWidth : 1380,
    height: isClient ? window.innerHeight : 750,
  })

  useEffect(() => {
    const handler = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handler()

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return size
}

export default useWindowSize
