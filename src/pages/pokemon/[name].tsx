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
import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  PokemonHeader,
  PokemonInfo,
  PokemonImage,
  TypeIcons,
  BaseStats,
  LoadingState,
} from '@/components/PokemonDetail'

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
            <PokemonHeader id={id} name={pokemonName} />
            <PokemonInfo
              japaneseName={japaneseName}
              height={height}
              weight={weight}
            />
            <PokemonImage imageUrl={primaryImage} name={pokemonName} />
          </motion.div>

          {/* Right Side - Base Stats */}
          <motion.div
            className="flex h-full flex-col gap-8 rounded-xl p-6"
            variants={contentVariants}
            layout // Smooth layout transitions
          >
            <TypeIcons types={types} />
            <BaseStats stats={stats} />
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
