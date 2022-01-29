import reducers from '@/reducers'
import { useMemo } from 'react'
import { applyMiddleware, compose, createStore, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]

let store

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

// not using redux dev tools because data is too big and it crashes
// const composeEnhancers = compose
function initStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  return store
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
  const store: Store = useMemo(() => {
    return initializeStore(initialState || {})
  }, [initialState])
  return store
}
