import { getPrimaryTypeGradient } from '@/constants/colors'
import { fetchPokemonByName } from '@/helpers/pokedex_api'
import MainLayout from '@/layout/MainLayout'
import { useBackgroundColour } from '@/utils/use-set-background-colour'
import Link from 'next/link'
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
  }, [name, dispatch])

  const one_pokemon = useSelector(
    (state) => state.pokemon.pokemon_details[name as string]
  )

  const primaryTypeGradient = getPrimaryTypeGradient(one_pokemon?.types || [])

  useBackgroundColour(
    `bg-gradient-to-br ${primaryTypeGradient}  bg-[length:200%_200%] animate-gradient-x`
  )

  if (!one_pokemon) {
    return (
      <MainLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="text-2xl text-gray-600">Loading...</div>
        </div>
      </MainLayout>
    )
  }

  if (one_pokemon.loading) {
    return (
      <MainLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="text-2xl text-gray-600">Loading Pokemon data...</div>
        </div>
      </MainLayout>
    )
  }

  const {
    id,
    name: pokemonName,
    weight,
    height,
    stats,
    types,
    images,
  } = one_pokemon

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

  const getStatBarWidth = (baseStat: number) => {
    return Math.min((baseStat / 200) * 100, 100)
  }

  // Generate Pokemon ID navigation array (shows current and surrounding IDs)
  const generateNavIds = (currentId: number) => {
    const navIds = []
    for (let i = currentId - 4; i <= currentId + 4; i++) {
      if (i >= 1 && i <= 1010) {
        navIds.push(i)
      }
    }
    return navIds
  }

  const navIds = generateNavIds(id)
  console.log({ navIds, id })
  return (
    <div className={`min-h-screen `}>
      {/* Pokemon ID Navigation Header */}
      <div className="shadow-sm">
        <div className="mx-auto flex w-full items-center justify-center px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between space-x-2">
              {navIds.map((navId) => (
                <Link key={navId} href={`/pokemon/${navId}`}>
                  <a
                    className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                      navId === id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    {navId}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div
          className={`rounded-2xl bg-gradient-to-br p-8 text-white shadow-lg`}
        >
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            {/* Left Side - Pokemon Info */}
            <div className="space-y-6">
              {/* Pokemon Number and Name */}
              <div>
                <div className="mb-1 text-sm font-medium opacity-80">
                  #{id.toString().padStart(3, '0')}
                </div>
                <h1 className="mb-4 text-4xl font-bold capitalize">
                  {pokemonName}
                </h1>

                {/* Japanese Name Placeholder */}
                <div className="mb-6 text-lg opacity-70">アマルルガ</div>
              </div>

              {/* Height and Weight */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="mb-1 opacity-70">Height:</div>
                  <div className="font-semibold">
                    {(height / 10).toFixed(1)}m
                  </div>
                </div>
                <div>
                  <div className="mb-1 opacity-70">Weight:</div>
                  <div className="font-semibold">
                    {(weight / 10).toFixed(1)}kg
                  </div>
                </div>
              </div>

              {/* Pokemon Image */}
              <div className="flex justify-center md:justify-start">
                {primaryImage ? (
                  <div className="relative">
                    <img
                      src={primaryImage}
                      alt={pokemonName}
                      className="h-48 w-48 object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 w-48 items-center justify-center text-white/50">
                    No image available
                  </div>
                )}
              </div>

              {/* Type Icons */}
              <div className="flex space-x-3">
                {types?.map((typeObj, index) => (
                  <div
                    key={index}
                    className="rounded-full bg-white/20 p-3 backdrop-blur-sm"
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
            </div>

            {/* Right Side - Base Stats */}
            <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-bold">Base stats:</h2>

              <div className="space-y-4">
                {stats?.map((stat, index) => {
                  const statName = stat.stat.name
                  const baseStat = stat.base_stat
                  const barWidth = getStatBarWidth(baseStat)

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {formatStatName(statName)}:
                        </span>
                        <span className="rounded bg-white/20 px-2 py-1 text-sm font-bold">
                          {baseStat}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/20">
                        <div
                          className="h-full rounded-full bg-white/80 transition-all duration-700 ease-out"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
