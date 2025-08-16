import Pagination from '@/components/Pagination'
import { getPrimaryTypeColor } from '@/constants/colors'
import {
  fetchPokemonByName,
  fetchPokemonSpeciesByName,
} from '@/helpers/pokedex_api'
import MainLayout from '@/layout/MainLayout'
import { useBackgroundColour } from '@/utils/use-set-background-colour'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PokemonDetail = () => {
  const {
    query: { name },
  } = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    name && dispatch(fetchPokemonByName(name))
    name && dispatch(fetchPokemonSpeciesByName(name))
  }, [name, dispatch])

  const pokemonDetails = useSelector(
    (state) => state.pokemon.pokemon_details[name as string]
  )
  const pokemonSpecies = useSelector(
    (state) => state.pokemon.pokemon_species[name as string]
  )

  const primaryTypeGradient = getPrimaryTypeColor(pokemonDetails?.types || [])

  // Set background immediately, even while loading
  useBackgroundColour(
    primaryTypeGradient ? `${primaryTypeGradient} ` : 'bg-gray-400'
  )

  const loading = !pokemonSpecies || !pokemonDetails

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (pokemonDetails.loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-2xl text-gray-600">Loading Pokemon data...</div>
      </div>
    )
  }

  const japaneseName = pokemonSpecies?.names?.find((name) =>
    name?.language?.name.startsWith('ja')
  )?.name

  const {
    id,
    name: pokemonName,
    weight,
    height,
    stats,
    types,
    images,
  } = pokemonDetails

  const primaryImage = images?.front?.[0] || images?.back?.[0] || null
  const formatStatName = (statName: string) => {
    switch (statName) {
      case 'hp':
        return 'HP'
      case 'attack':
        return 'ATTACK'
      case 'defense':
        return 'DEFENSE'
      case 'special-attack':
        return 'SP. ATTACK'
      case 'special-defense':
        return 'SP. DEFENSE'
      case 'speed':
        return 'SPEED'
      default:
        return statName.toUpperCase()
    }
  }

  return (
    <div className={`flex flex-col text-white`}>
      {/* Pokemon ID Navigation Header */}
      <div className=" flex-0">
        <Pagination currentId={id} range={4} />
      </div>

      {/* Main Content */}

      <div className="mx-auto grid h-full w-full flex-1 grid-cols-1 items-start gap-8 px-6 py-8 md:grid-cols-2">
        {/* Left Side - Pokemon Info */}
        <div className="relative mb-6 h-full space-y-6">
          {/* Pokemon Number and Name */}
          <div>
            <div className="mb-1 text-2xl font-semibold opacity-90">
              #{id.toString().padStart(3, '0')}
            </div>
            <h1 className="mb-4 text-4xl font-bold capitalize">
              {pokemonName}
            </h1>
          </div>

          {/* Japanese name, Height and Weight */}
          <div className="text-md ml-10 flex flex-col gap-2 tracking-widest">
            {/* Japanese Name Placeholder */}
            <div className="text-8xl font-bold opacity-40 mix-blend-multiply">
              {japaneseName}
            </div>
            <div className="mt-2 mix-blend-difference">
              <div className="mb-0.5 font-medium">
                Height:{' '}
                <span className="font-normal text-white/80 opacity-90">
                  {(height / 10).toFixed(1)}m
                </span>
              </div>
            </div>
            <div>
              <div className="mb-0.5 font-medium">
                Weight:{' '}
                <span className="font-normal text-white/80 opacity-90">
                  {(weight / 10).toFixed(1)}kg
                </span>
              </div>
            </div>
          </div>

          {/* Pokemon Image */}
          <div className="flex justify-center md:justify-start">
            {primaryImage ? (
              <div className="absolute right-0 top-[5%] -z-10">
                <img
                  src={primaryImage}
                  alt={pokemonName}
                  className="h-[80vh] w-[40vw] object-contain"
                />
              </div>
            ) : (
              <div className="flex h-48 w-48 items-center justify-center text-white/50">
                No image available
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Base Stats */}
        <div className="flex h-full flex-col gap-8 rounded-xl p-6">
          {/* Type Icons */}
          <div className="flex gap-4">
            {types?.map((typeObj, index) => (
              <div
                key={index}
                className="rounded-full bg-white p-3 backdrop-blur-sm"
              >
                <img
                  src={`/types/${
                    typeObj.type.name.charAt(0).toUpperCase() +
                    typeObj.type.name.slice(1)
                  }.png`}
                  alt={typeObj.type.name}
                  className="h-8 w-8"
                  onError={(e) => {
                    // Fallback to text if image fails
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            ))}
          </div>
          <h2 className="mb-6 text-4xl font-bold">Base stats:</h2>

          <div className="flex max-w-72 flex-wrap gap-2 gap-y-4 border-l-4 border-l-white/30 pl-6 leading-snug">
            {stats?.map((stat, index) => {
              const statName = stat.stat.name
              const baseStat = stat.base_stat

              return (
                <div
                  key={index}
                  className="rounded-lg bg-white/95 px-3 py-1 text-base font-bold text-black/80"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="">{formatStatName(statName)}:</span>
                    <span className="">{baseStat}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
