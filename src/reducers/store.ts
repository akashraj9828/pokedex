import { configureStore } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import rootReducer from '@/reducers'

let store

function initStore(initialState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState = null) {
  const store = useMemo(() => {
    return initializeStore(initialState || {})
  }, [initialState])
  return store
}

export type AppStore = ReturnType<typeof initStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
