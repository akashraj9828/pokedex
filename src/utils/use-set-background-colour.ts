import { setBackgroundColour } from '@/reducers/config'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useBackgroundColour = (colour: string) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBackgroundColour(colour))
    // Remove the reset on unmount to prevent background flashing during page transitions
    // The new page will set its own background color
  }, [colour, dispatch])
}
