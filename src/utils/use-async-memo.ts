import { useEffect, useState } from 'react'

// credit : https://github.com/awmleer/use-async-memo

export function useAsyncMemo(factory, deps, initial) {
  const [val, setVal] = useState(initial)
  useEffect(() => {
    let cancel = false
    const promise = factory()
    if (promise === undefined || promise === null) return
    promise.then((val) => {
      if (!cancel) {
        setVal(val)
      }
    })
    return () => {
      cancel = true
    }
  }, deps)
  return val
}
