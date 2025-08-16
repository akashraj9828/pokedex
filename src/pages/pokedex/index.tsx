import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useEffect, useMemo, useState } from 'react'
import { fetchPokemonByName } from '@/helpers/pokedex_api'
import Link from 'next/link'
import PokemonCard from '@/components/PokemonCard'
import { useBackgroundColour } from '@/utils/use-set-background-colour'
const limit = 10
export default function Home() {
  const pokemons_name = useSelector((state) => state.pokemon.pokemon_list)
  const pokemons_detail = useSelector((state) => state.pokemon.pokemon_details)
  useBackgroundColour('bg-white')
  // const hasMore = loadedPokemonCount !== totalPokemonCount
  // const loader = <Loader key={loadedPokemonCount} />
  const loader = <>Loading...</>

  const loaded_count = useMemo(() => {
    return Object.keys(pokemons_detail).length
  }, [pokemons_detail])
  const hasMore = loaded_count < pokemons_name.length

  const dispatch = useDispatch()

  const onLoadMore = () => {
    const to_be_loaded = pokemons_name
      .slice(loaded_count, loaded_count + limit)
      .map((e) => e.name)
    console.log(to_be_loaded)
    to_be_loaded.forEach((name) => {
      dispatch(fetchPokemonByName(name))
    })
  }

  useEffect(() => {
    if (loaded_count === 0) {
      // load first set
      onLoadMore()
    }
  }, [pokemons_name, loaded_count])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {/* <pre className="absolute flex text-xl top-10">
        hasMore : {String(hasMore)} | total: {pokemons_name.length} | loaded :
        {loaded_count}
      </pre> */}
      <span className="my-5 w-full text-center text-4xl font-bold text-gray-800 md:text-left">
        Pokedex
      </span>
      <div className="flex">
        {/* <Temp /> */}
        <InfiniteScroll
          scrollableTarget="main_content"
          dataLength={loaded_count}
          next={onLoadMore}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-cols-1 justify-items-center gap-x-3 gap-y-3 md:grid-cols-2 xl:grid-cols-4">
            {pokemons_name.slice(0, loaded_count).map(({ name, url }) => (
              <PokemonCard pokemonName={name} key={name} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}
