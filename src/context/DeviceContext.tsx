import { useMedia } from '@/utils/use-media'
import { createContext, useContext } from 'react'

export const DeviceContext = createContext({} as any)

export const DeviceProvider = ({ children }) => {
  const mobile = useMedia('(max-width: 580px)')
  const tablet = useMedia('(max-width: 991px)')
  const desktop = useMedia('(min-width: 992px)')

  return (
    <DeviceContext.Provider
      value={{
        deviceType: {
          mobile,
          tablet,
          desktop,
        },
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}
export const useDevice = (): {
  deviceType: { mobile: boolean; tablet: boolean; desktop: boolean }
} => useContext(DeviceContext)
