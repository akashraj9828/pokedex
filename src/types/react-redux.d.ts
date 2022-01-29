import 'react-redux'
import { ReduxState } from '@/reducers'

declare module 'react-redux' {
  interface DefaultRootState extends ReduxState {}
}
