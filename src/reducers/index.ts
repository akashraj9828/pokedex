import { combineReducers } from 'redux'
import pokemon from '@/reducers/pokemon'

const rootReducer = combineReducers({
  pokemon,
})
export type ReduxState = ReturnType<typeof rootReducer>

export default rootReducer
