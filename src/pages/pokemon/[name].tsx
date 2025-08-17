import {
  BaseStats,
  EvolutionChainDetail,
  LoadingState,
  PokemonHeader,
  PokemonImage,
  PokemonInfo,
} from '@/components/PokemonDetail'
import { getPrimaryTypeColor } from '@/constants/colors'
import {
  fetchPokemonByName,
  fetchPokemonSpeciesByName,
} from '@/helpers/pokedex_api'
import PersistentLayout, { NextPageWithLayout } from '@/layout/PersistentLayout'
import { usePokemonPreloader } from '@/utils/use-pokemon-preloader'
import { useBackgroundColour } from '@/utils/use-set-background-colour'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    x: 10, // Reduced from 20 to minimize layout shift
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -10, // Reduced from -20 to minimize layout shift
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Animation variants for content elements
const contentVariants = {
  initial: {
    opacity: 0,
    y: 0,
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

const PokemonDetail: NextPageWithLayout = () => {
  const {
    query: { name },
  } = useRouter()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<'stats' | 'evolution' | 'moves'>(
    'stats'
  )

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

  // Initialize preloader hook for the current Pokemon ID
  const currentId = pokemonDetails?.id || parseInt(name as string) || 0
  const { isPokemonLoaded, getPreloadIds } = usePokemonPreloader(currentId, {
    preloadCount: 4, // Preload 4 Pokemon in each direction
    preloadImages: true,
    delay: 300, // Start preloading after 300ms
  })

  const primaryTypeGradient = getPrimaryTypeColor(pokemonDetails?.types || [])

  // Set background immediately, even while loading
  useBackgroundColour(
    primaryTypeGradient ? `${primaryTypeGradient} ` : 'bg-gray-400'
  )

  const loading = !pokemonSpecies || !pokemonDetails

  if (loading) {
    return <LoadingState />
  }

  if (pokemonDetails.loading) {
    return <LoadingState message="Loading Pokemon data..." />
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

  return (
    <div className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={Array.isArray(name) ? name[0] : name} // This ensures re-animation when Pokemon changes
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          layout // This helps with layout transitions
          className="mx-auto grid h-full w-full flex-1 grid-cols-1 items-start gap-8 px-6 py-8 md:grid-cols-2"
          style={{ minHeight: 'calc(100vh - 50px)' }} // Ensure consistent minimum height
        >
          {/* Left Side - Pokemon Info */}
          <motion.div
            className="relative mb-6 h-full space-y-6"
            variants={contentVariants}
            layout // Smooth layout transitions
          >
            <PokemonHeader id={id} name={pokemonName} types={types} />
            <PokemonInfo
              japaneseName={japaneseName}
              height={height}
              weight={weight}
            />
            {/* <TypeIcons types={types} /> */}
            <PokemonImage imageUrl={primaryImage} name={pokemonName} />
          </motion.div>

          {/* Right Side - Tabs and Content */}
          <motion.div
            className="flex h-full flex-col gap-6 rounded-xl p-6"
            variants={contentVariants}
            layout // Smooth layout transitions
          >
            {/* Tab Navigation */}
            <div className="flex space-x-1 rounded-lg bg-white/10 p-1 backdrop-blur-sm">
              {[
                { id: 'stats', label: 'Base Stats' },
                { id: 'evolution', label: 'Evolution' },
                { id: 'moves', label: 'Moves' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1">
              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <BaseStats stats={stats} />
                </motion.div>
              )}

              {activeTab === 'evolution' && (
                <motion.div
                  key="evolution"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <EvolutionChainDetail
                    evolutionId={pokemonSpecies?.evolutionId}
                    currentPokemonName={pokemonName}
                  />
                </motion.div>
              )}

              {activeTab === 'moves' && (
                <motion.div
                  key="moves"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
                >
                  <p className="text-center text-white/70">
                    Moves information coming soon...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Define the layout for this page
PokemonDetail.getLayout = function getLayout(page: ReactElement) {
  return <PersistentLayout showPagination={true}>{page}</PersistentLayout>
}

export default PokemonDetail
