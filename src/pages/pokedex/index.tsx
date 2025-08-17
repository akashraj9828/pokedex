import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import PokemonCard from '@/components/PokemonCard'
import Search from '@/components/Search'
import { fetchPokemonByName } from '@/helpers/pokedex_api'
import { useBackgroundColour } from '@/utils/use-set-background-colour'
import { useEffect, useMemo, useState } from 'react'
const limit = 50
export default function Home() {
  const pokemons_name = useSelector((state) => state.pokemon.pokemon_list)
  const pokemons_detail = useSelector((state) => state.pokemon.pokemon_details)
  const [searchQuery, setSearchQuery] = useState('')
  useBackgroundColour('bg-slate-100')
  // Filter Pokemon based on search query
  const filteredPokemonNames = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return pokemons_name
    }
    return pokemons_name.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [pokemons_name, searchQuery])

  // Get Pokemon that are both filtered and have loaded details
  const displayablePokemon = useMemo(() => {
    return filteredPokemonNames.filter((pokemon) => {
      const details = pokemons_detail[pokemon.name]
      return details && !details.loading
    })
  }, [filteredPokemonNames, pokemons_detail])

  const loaded_count = useMemo(() => {
    return Object.keys(pokemons_detail).length
  }, [pokemons_detail])

  const hasMore = displayablePokemon.length < filteredPokemonNames.length

  const dispatch = useDispatch()

  const onLoadMore = () => {
    // Find Pokemon in filtered list that haven't been loaded yet
    const unloadedPokemon = filteredPokemonNames.filter((pokemon) => {
      const details = pokemons_detail[pokemon.name]
      return !details || details.loading
    })

    const to_be_loaded = unloadedPokemon.slice(0, limit).map((e) => e.name)

    console.log('Loading Pokemon:', to_be_loaded)
    to_be_loaded.forEach((name) => {
      dispatch(fetchPokemonByName(name))
    })
  }

  useEffect(() => {
    // Load Pokemon when filtered list changes or when we have no loaded Pokemon
    if (filteredPokemonNames.length > 0 && displayablePokemon.length === 0) {
      onLoadMore()
    }
  }, [filteredPokemonNames, displayablePokemon.length])

  // Initial load effect
  useEffect(() => {
    if (loaded_count === 0 && pokemons_name.length > 0) {
      onLoadMore()
    }
  }, [pokemons_name, loaded_count])

  // Handle search change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query || '')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-2">
      {/* <pre className="absolute flex text-xl top-10">
        hasMore : {String(hasMore)} | total: {filteredPokemonNames.length} |
        loaded :{loaded_count}
      </pre> */}

      {/* Search Section */}
      <div className="mb-6 w-full max-w-4xl px-4">
        <Search
          onChange={handleSearchChange}
          placeholder="Search Pokemon in Pokedex..."
          showResults={false}
          fullWidth={true}
        />
      </div>

      <span className="my-5 w-full text-center text-4xl font-bold text-gray-800 md:text-left">
        Pokedex {searchQuery && `- "${searchQuery}"`}
      </span>
      <div className="flex">
        {/* <Temp /> */}
        {filteredPokemonNames.length === 0 && searchQuery ? (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-600">
              No Pokemon found matching "{searchQuery}"
            </p>
            <p className="mt-2 text-gray-500">
              Try searching with a different term
            </p>
          </div>
        ) : (
          <InfiniteScroll
            scrollableTarget="main_content"
            dataLength={displayablePokemon.length}
            next={onLoadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <div className="grid grid-cols-1 justify-items-center gap-x-3 gap-y-3 md:grid-cols-2 xl:grid-cols-4">
              {displayablePokemon.map(({ name, url }) => (
                <PokemonCard pokemonName={name} key={name} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}
