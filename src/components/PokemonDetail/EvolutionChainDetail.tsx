import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  fetchPokemonEvolutionById,
  fetchPokemonByName,
} from '@/helpers/pokedex_api'
import { Chain } from 'pokeapi-js-wrapper'

interface EvolutionChainDetailProps {
  evolutionId: string | null
  currentPokemonName?: string
}

const contentVariants = {
  initial: {
    opacity: 1,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

interface EvolutionStep {
  id: number
  name: string
  image: string
  level?: number
  trigger?: string
  item?: string
}

const EvolutionChainDetail = ({
  evolutionId,
  currentPokemonName,
}: EvolutionChainDetailProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [evolutionSteps, setEvolutionSteps] = useState<EvolutionStep[]>([])
  const [megaEvolutions, setMegaEvolutions] = useState<EvolutionStep[]>([])

  const evolutionChain = useSelector(
    (state: any) => state.pokemon.pokemon_evolutions[evolutionId as string]
  )

  const pokemonDetails = useSelector(
    (state: any) => state.pokemon.pokemon_details
  )

  useEffect(() => {
    if (evolutionId) {
      if (!evolutionChain) {
        dispatch(fetchPokemonEvolutionById(evolutionId))
      }
    }
  }, [evolutionId, evolutionChain, dispatch])

  // Parse evolution chain and extract Pokemon details
  useEffect(() => {
    if (evolutionChain) {
      const parseEvolutionChain = (chain: Chain): EvolutionStep[] => {
        const steps: EvolutionStep[] = []

        const addPokemonStep = (species: any, evolutionDetails?: any) => {
          const pokemonId = parseInt(species.url.split('/').slice(-2, -1)[0])
          const pokemonName = species.name

          // Dispatch to fetch Pokemon details using ID if not already loaded
          if (!pokemonDetails[pokemonId]) {
            dispatch(fetchPokemonByName(pokemonId))
          }

          const pokemonData = pokemonDetails[pokemonId]
          const image = pokemonData?.images?.front?.[0] || ''

          steps.push({
            id: pokemonId,
            name: pokemonData?.name || pokemonName, // Use API response name if available, fallback to species name
            image,
            level: evolutionDetails?.min_level || undefined,
            trigger: evolutionDetails?.trigger?.name || undefined,
            item: evolutionDetails?.item?.name || undefined,
          })
        }

        // Add base Pokemon
        addPokemonStep(chain.species)

        // Process evolutions recursively
        const processEvolutions = (evolutions: any[]) => {
          evolutions.forEach((evolution) => {
            addPokemonStep(evolution.species, evolution.evolution_details?.[0])
            if (evolution.evolves_to && evolution.evolves_to.length > 0) {
              processEvolutions(evolution.evolves_to)
            }
          })
        }

        if (chain.evolves_to && chain.evolves_to.length > 0) {
          processEvolutions(chain.evolves_to)
        }

        return steps
      }

      const steps = parseEvolutionChain(evolutionChain)
      setEvolutionSteps(steps)

      // For now, we'll simulate mega evolutions (you can extend this based on actual data)
      // This would need to be implemented based on how mega evolution data is structured
      setMegaEvolutions([])
    }
  }, [evolutionChain, pokemonDetails, dispatch])

  if (!evolutionId) {
    return null
  }

  if (!evolutionChain) {
    return (
      <motion.div
        variants={contentVariants}
        className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span className="ml-3 text-white">Loading evolution chain...</span>
        </div>
      </motion.div>
    )
  }

  const renderEvolutionArrow = (index: number) => {
    if (index === evolutionSteps.length - 1) return null

    const currentStep = evolutionSteps[index + 1]
    if (!currentStep) return null

    return (
      <div className="flex flex-col items-center justify-center px-4">
        <div className="mb-2 text-xs font-medium text-white/80">
          {currentStep.level && `Lvl ${currentStep.level}`}
        </div>
        <svg
          className="h-6 w-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    )
  }

  const renderPokemonStep = (step: EvolutionStep, index: number) => {
    const isCurrentPokemon = step.name === currentPokemonName

    return (
      <div key={step.id} className="flex flex-col items-center">
        <button
          onClick={() => router.push(`/pokemon/${step.id}`)}
          className="group relative cursor-pointer"
        >
          <div
            className={`h-20 w-20 overflow-hidden rounded-full backdrop-blur-sm transition-all group-hover:scale-105 ${
              isCurrentPokemon
                ? 'bg-white/40 shadow-lg ring-2 ring-white/60'
                : 'bg-white/20 group-hover:bg-white/30'
            }`}
          >
            {step.image ? (
              <img
                src={step.image}
                alt={step.name}
                className="h-full w-full object-contain p-2"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </div>
            )}
          </div>
        </button>
        <p
          className={`mt-2 text-center text-sm font-medium capitalize ${
            isCurrentPokemon ? 'font-bold text-white' : 'text-white'
          }`}
        >
          {step.name}
        </p>
      </div>
    )
  }

  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-6 text-xl font-bold text-white">Evolution Chain</h3>

      {evolutionSteps.length === 0 ? (
        // Still loading Pokemon data for evolution steps
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span className="ml-3 text-white">Loading Pokemon data...</span>
        </div>
      ) : evolutionSteps.length > 1 ? (
        <div className="space-y-8">
          {/* Regular Evolution Chain */}
          <div className="flex items-center justify-center">
            {evolutionSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {renderPokemonStep(step, index)}
                {renderEvolutionArrow(index)}
              </div>
            ))}
          </div>

          {/* Mega Evolution Section (if any) */}
          {megaEvolutions.length > 0 && (
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Mega Evolution
              </h4>
              <div className="flex items-center justify-center space-x-8">
                {megaEvolutions.map((mega, index) => (
                  <div key={mega.id} className="flex items-center">
                    {index > 0 && (
                      <div className="flex flex-col items-center justify-center px-4">
                        <div className="mb-2 text-xs font-medium text-white/80">
                          Mega Stone
                        </div>
                        <svg
                          className="h-6 w-6 text-white/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    )}
                    {renderPokemonStep(mega, index)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-white/80">This Pokémon does not evolve.</p>
        </div>
      )}
    </motion.div>
  )
}

export default EvolutionChainDetail
