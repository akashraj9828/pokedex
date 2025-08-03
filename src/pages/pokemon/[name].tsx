import { fetchPokemonByName } from '@/helpers/pokedex_api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import MainLayout from '@/layout/MainLayout'
import Link from 'next/link'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import {
  getPokemonTypeColor,
  getPokemonTypeGradient,
  getPrimaryTypeGradient,
  getStatColor,
} from '@/constants/colors'

const PokemonDetail = () => {
  const {
    query: { name },
  } = useRouter()
  const dispatch = useDispatch()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    name && dispatch(fetchPokemonByName(name))
  }, [name, dispatch])

  const one_pokemon = useSelector(
    (state) => state.pokemon.pokemon_details[name as string]
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

  const primaryType = types?.[0]?.type?.name || 'normal'
  const allImages = [...(images?.front || []), ...(images?.back || [])]
  const currentImage = allImages[currentImageIndex] || null

  // Get colors using helper functions
  const primaryTypeGradient = getPrimaryTypeGradient(types || [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    )
  }

  const formatStatName = (statName: string) => {
    switch (statName) {
      case 'special-attack':
        return 'SP. ATTACK'
      case 'special-defense':
        return 'SP. DEFENSE'
      default:
        return statName.toUpperCase()
    }
  }

  const getStatBarWidth = (baseStat: number) => {
    return Math.min((baseStat / 150) * 100, 100)
  }

  return (
    <MainLayout>
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-6xl px-4">
          {/* Back Navigation */}
          <Link href="/pokedex">
            <a className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-800">
              <IoIosArrowBack className="mr-2" />
              Back to Pokedex
            </a>
          </Link>

          {/* Main Pokemon Card Layout */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Main Pokemon Card */}
            <div className="md:col-span-4">
              <div
                className={`relative h-[500px] rounded-3xl bg-gradient-to-br ${primaryTypeGradient} p-6 text-white shadow-2xl`}
              >
                {/* Pokemon ID */}
                <div className="absolute top-6 right-6">
                  <span className="font-mono text-6xl opacity-30">#{id}</span>
                </div>

                {/* Pokemon Info */}
                <div className="flex h-full flex-col">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bold capitalize">
                      {pokemonName}
                    </h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {types?.map((typeObj, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold capitalize"
                        >
                          {typeObj.type.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Height and Weight */}
                  <div className="mb-6 space-y-2 text-white/80">
                    <div>Height: {(height / 10).toFixed(1)}m</div>
                    <div>Weight: {(weight / 10).toFixed(1)}kg</div>
                  </div>

                  {/* Pokemon Image */}
                  <div className="flex flex-1 items-center justify-center">
                    {currentImage ? (
                      <div className="relative">
                        <img
                          src={currentImage}
                          alt={pokemonName}
                          className="h-64 w-64 object-contain"
                        />
                        {allImages.length > 1 && (
                          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 transform space-x-2">
                            <button
                              onClick={prevImage}
                              className="rounded-full bg-white/20 p-2 hover:bg-white/30"
                            >
                              <IoIosArrowBack className="text-white" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="rounded-full bg-white/20 p-2 hover:bg-white/30"
                            >
                              <IoIosArrowForward className="text-white" />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex h-64 w-64 items-center justify-center text-white/50">
                        No image available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="md:col-span-8">
              <div className="rounded-3xl bg-white p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                  Base Stats
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {stats?.map((stat, index) => {
                    const statName = stat.stat.name
                    const baseStat = stat.base_stat
                    const barWidth = getStatBarWidth(baseStat)

                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-semibold text-gray-600">
                            {formatStatName(statName)}
                          </span>
                          <span className="text-sm font-bold text-gray-800">
                            {baseStat}
                          </span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-gray-200">
                          <div
                            className={`h-full rounded-full ${getStatColor(
                              statName
                            )} transition-all duration-500`}
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Type Effectiveness (Placeholder) */}
                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-bold text-gray-800">
                    Types
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {types?.map((typeObj, index) => (
                      <div
                        key={index}
                        className={`flex items-center rounded-full ${getPokemonTypeColor(
                          typeObj.type.name
                        )} px-4 py-2 text-white shadow-lg`}
                      >
                        <img
                          src={`/types/${
                            typeObj.type.name.charAt(0).toUpperCase() +
                            typeObj.type.name.slice(1)
                          }.png`}
                          alt={typeObj.type.name}
                          className="mr-2 h-6 w-6"
                          onError={(e) => {
                            // Hide the image if it fails to load
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <span className="font-semibold capitalize">
                          {typeObj.type.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation to other Pokemon */}
          <div className="mt-12 flex justify-between">
            <Link href={`/pokemon/${id > 1 ? id - 1 : 898}`}>
              <a className="flex items-center rounded-lg bg-gray-100 px-6 py-3 text-gray-700 hover:bg-gray-200">
                <IoIosArrowBack className="mr-2" />
                Previous Pokemon
              </a>
            </Link>
            <Link href={`/pokemon/${id < 898 ? id + 1 : 1}`}>
              <a className="flex items-center rounded-lg bg-gray-100 px-6 py-3 text-gray-700 hover:bg-gray-200">
                Next Pokemon
                <IoIosArrowForward className="ml-2" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PokemonDetail
