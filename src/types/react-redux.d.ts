import 'react-redux'
import type { RootState, AppDispatch } from '@/reducers/store'

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
  export function useDispatch<TDispatch = AppDispatch>(): TDispatch
  export function useSelector<TSelected = unknown>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected
}
