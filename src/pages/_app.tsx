import '@/assets/styles/globals.css'
import Meta from '@/components/seo/Meta'
import { STRING } from '@/constants/string'
import { DeviceProvider } from '@/context/DeviceContext'
import { fetchPokemonList, fetchPokemonTypesList } from '@/helpers/pokedex_api'
import MainLayout from '@/layout/MainLayout'
import { useStore } from '@/reducers/store'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore()
  useEffect(() => {
    store.dispatch(fetchPokemonTypesList() as any)
    store.dispatch(fetchPokemonList() as any)
  }, [])

  return (
    <>
      <Meta title={`${STRING.POKEDEX} | Home`} />
      <DeviceProvider>
        <ReduxProvider store={store}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ReduxProvider>
      </DeviceProvider>
    </>
  )
}

export default MyApp
