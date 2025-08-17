import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import PokemonCard from '@/components/PokemonCard'
import Search from '@/components/Search'
import { fetchPokemonByName } from '@/helpers/pokedex_api'
import { useBackgroundColour } from '@/utils/use-set-background-colour'
import { useEffect, useMemo, useState } from 'react'
import PokeBallSVG from '@/assets/img/pokeball_bnw.svg'
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
    return displayablePokemon.length
  }, [displayablePokemon])

  const hasMore = loaded_count < filteredPokemonNames.length

  const dispatch = useDispatch()

  const onLoadMore = () => {
    console.log('Load more...')
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
    if (loaded_count === 0 && pokemons_name.length > 0) {
      onLoadMore()
    }
  }, [pokemons_name, loaded_count])

  const handleSearchChange = (query: string) => {
    setSearchQuery(query || '')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-2">
      {/* Header Section with Title and Search */}
      <div className="mb-6 w-full max-w-6xl px-4">
        {/* Mobile Layout - Stacked */}
        <div className="block md:hidden">
          <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">
            Pokedex {searchQuery && `- "${searchQuery}"`}
          </h1>
          <div className="w-full">
            <Search
              onChange={handleSearchChange}
              placeholder="Search Pokemon..."
              showResults={false}
              fullWidth={true}
            />
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden md:flex md:items-center md:justify-between">
          <h1 className="text-4xl font-bold text-gray-800">
            Pokedex {searchQuery && `- "${searchQuery}"`}
          </h1>
          <div className="ml-8 w-full max-w-md">
            <Search
              onChange={handleSearchChange}
              placeholder="Search Pokemon in Pokedex..."
              showResults={false}
              fullWidth={true}
            />
          </div>
        </div>
      </div>

      {/* <pre className="absolute z-50 flex text-xl bg-white top-10">
        hasMore : {String(hasMore)} | total: {filteredPokemonNames.length} |
        loaded :{loaded_count}
      </pre> */}
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
            dataLength={loaded_count}
            next={onLoadMore}
            hasMore={hasMore}
            loader={
              <div className="flex w-full items-center justify-center space-x-4 py-8">
                <img
                  src={PokeBallSVG.src}
                  alt="Loading"
                  className="h-6 w-6 animate-spin opacity-60"
                />
                <p className="font-medium text-gray-600">
                  Loading more Pokemon...
                </p>
                <img
                  src={PokeBallSVG.src}
                  alt="Loading"
                  className="h-6 w-6 animate-spin opacity-60"
                />
              </div>
            }
          >
            <div className="grid grid-cols-1 justify-items-center gap-x-3 gap-y-3 md:grid-cols-2 xl:grid-cols-4">
              {filteredPokemonNames
                .slice(0, loaded_count)
                .map(({ name, url }) => (
                  <PokemonCard pokemonName={name} key={name} />
                ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}
