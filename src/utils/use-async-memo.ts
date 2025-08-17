import { DependencyList, useEffect, useState } from 'react'

// credit : https://github.com/awmleer/use-async-memo

export function useAsyncMemo(
  factory: () => any,
  deps: DependencyList | undefined,
  initial: any
) {
  const [val, setVal] = useState(initial)
  useEffect(() => {
    let cancel = false
    const promise = factory()
    if (promise === undefined || promise === null) return
    promise.then((val: any) => {
      if (!cancel) {
        setVal(val)
      }
    })
    return () => {
      cancel = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return val
}
