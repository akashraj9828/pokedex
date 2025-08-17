import { setBackgroundColour } from '@/reducers/config'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useBackgroundColour = (colour: string) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined' && document) {
      // Add smooth transition to body element
      document.body.style.transition = 'background 0.4s ease-out'
    }

    dispatch(setBackgroundColour(colour))

    // Remove the reset on unmount to prevent background flashing during page transitions
    // The new page will set its own background color
  }, [colour, dispatch])
}
