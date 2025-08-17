import '@/assets/styles/globals.css'
import Meta from '@/components/seo/Meta'
import { STRING } from '@/constants/string'
import { DeviceProvider } from '@/context/DeviceContext'
import { fetchPokemonList, fetchPokemonTypesList } from '@/helpers/pokedex_api'
import MainLayout from '@/layout/MainLayout'
import { NextPageWithLayout } from '@/layout/PersistentLayout'
import { useStore } from '@/reducers/store'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const store = useStore()

  useEffect(() => {
    store.dispatch(fetchPokemonTypesList() as any)
    store.dispatch(fetchPokemonList() as any)
  }, [])

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement): ReactNode => {
      return <MainLayout>{page}</MainLayout>
    })

  return (
    <>
      <Meta title={`${STRING.POKEDEX} | Home`} />
      <DeviceProvider>
        <ReduxProvider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </ReduxProvider>
      </DeviceProvider>
    </>
  )
}

export default MyApp
