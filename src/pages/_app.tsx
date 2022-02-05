import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DeviceProvider } from '@/context/DeviceContext'
import MainLayout from '@/layout/MainLayout'
import { Provider } from 'react-redux'
import { useStore } from '@/reducers/store'
import { useEffect } from 'react'
import {
  fetchPokemonByName,
  fetchPokemonEvolutionById,
  fetchPokemonList,
  fetchPokemonSpeciesByName,
  fetchPokemonTypesList,
} from '@/helpers/pokedex_api'
import Meta from '@/components/seo/Meta'
import { STRING } from '@/constants/string'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore()
  useEffect(() => {
    store.dispatch(fetchPokemonTypesList() as any)
    store.dispatch(fetchPokemonList() as any)
    // store.dispatch(fetchPokemonByName('eevee') as any)
    // store.dispatch(fetchPokemonEvolutionById(133) as any)
    // store.dispatch(fetchPokemonSpeciesByName('eevee') as any)
  }, [])

  return (
    <>
      <Meta title={`${STRING.POKEDEX} | Home`} />
      <DeviceProvider>
        <Provider store={store}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Provider>
      </DeviceProvider>
    </>
  )
}

export default MyApp
