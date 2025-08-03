import { combineReducers } from '@reduxjs/toolkit'
import pokemon from '@/reducers/pokemon'
import config from '@/reducers/config'

const rootReducer = combineReducers({
  pokemon,
  config,
})

export type ReduxState = ReturnType<typeof rootReducer>
export default rootReducer
