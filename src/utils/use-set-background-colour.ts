import { setBackgroundColour } from '@/reducers/config'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useBackgroundColour = (colour: string) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBackgroundColour(colour))
    return () => {
      dispatch(setBackgroundColour('bg-white')) // Reset to default on unmount
    }
  }, [colour, dispatch])
}
