import Pagination from '@/components/Pagination'
import { getPrimaryTypeGradient } from '@/constants/colors'
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

  const primaryTypeGradient = getPrimaryTypeGradient(
    pokemonDetails?.types || []
  )

  useBackgroundColour(
    `bg-gradient-to-br ${primaryTypeGradient}  bg-[length:200%_200%] animate-gradient-x`
  )

  const loading = !pokemonSpecies || !pokemonDetails

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-2xl text-gray-600">Loading...</div>
        </div>
      </MainLayout>
    )
  }

  if (pokemonDetails.loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-2xl text-gray-600">Loading Pokemon data...</div>
        </div>
      </MainLayout>
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

      <div className="grid items-start flex-1 w-full h-full grid-cols-1 gap-8 px-6 py-8 mx-auto md:grid-cols-2">
        {/* Left Side - Pokemon Info */}
        <div className="relative h-full mb-6 space-y-6">
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
          <div className="text-md flex flex-col gap-2 ml-10 tracking-widest">
            {/* Japanese Name Placeholder */}
            <div className="font-bold text-8xl opacity-40 mix-blend-multiply">
              {japaneseName}
            </div>
            <div className="mt-2 mix-blend-difference">
              <div className="mb-0.5 font-medium">
                Height:{' '}
                <span className="font-normal opacity-90 text-white/80">
                  {(height / 10).toFixed(1)}m
                </span>
              </div>
            </div>
            <div>
              <div className="mb-0.5 font-medium">
                Weight:{' '}
                <span className="font-normal opacity-90 text-white/80">
                  {(weight / 10).toFixed(1)}kg
                </span>
              </div>
            </div>
          </div>

          {/* Pokemon Image */}
          <div className="flex justify-center md:justify-start">
            {primaryImage ? (
              <div className="-z-10 absolute top-[5%] right-0">
                <img
                  src={primaryImage}
                  alt={pokemonName}
                  className="object-contain w-[40vw] h-[80vh]"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-48 h-48 text-white/50">
                No image available
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Base Stats */}
        <div className="flex flex-col h-full gap-8 p-6 rounded-xl">
          {/* Type Icons */}
          <div className="flex gap-4">
            {types?.map((typeObj, index) => (
              <div
                key={index}
                className="p-3 bg-white rounded-full backdrop-blur-sm"
              >
                <img
                  src={`/types/${
                    typeObj.type.name.charAt(0).toUpperCase() +
                    typeObj.type.name.slice(1)
                  }.png`}
                  alt={typeObj.type.name}
                  className="w-8 h-8"
                  onError={(e) => {
                    // Fallback to text if image fails
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            ))}
          </div>
          <h2 className="mb-6 text-4xl font-bold">Base stats:</h2>

          <div className="flex flex-wrap gap-2 pl-6 leading-snug border-l-4 max-w-72 border-l-white/30 gap-y-4">
            {stats?.map((stat, index) => {
              const statName = stat.stat.name
              const baseStat = stat.base_stat

              return (
                <div
                  key={index}
                  className="px-3 py-1 text-base font-bold rounded-lg bg-white/95 text-black/80"
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
