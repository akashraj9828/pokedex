import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DeviceProvider } from '@/context/DeviceContext'
import MainLayout from '@/layout/MainLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DeviceProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </DeviceProvider>
    </>
  )
}

export default MyApp
