import Pagination from '@/components/Pagination'
import { getPrimaryTypeColor } from '@/constants/colors'
import {
  fetchPokemonByName,
  fetchPokemonSpeciesByName,
} from '@/helpers/pokedex_api'
import PersistentLayout, { NextPageWithLayout } from '@/layout/PersistentLayout'
import { usePokemonPreloader } from '@/utils/use-pokemon-preloader'
import { useBackgroundColour } from '@/utils/use-set-background-colour'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

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

// Stagger animation for stats
const statsContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const statItemVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
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
    return (
      <motion.div 
        className="flex h-full items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="text-2xl text-gray-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          Loading...
        </motion.div>
      </motion.div>
    )
  }

  if (pokemonDetails.loading) {
    return (
      <motion.div 
        className="flex h-full items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="text-2xl text-gray-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          Loading Pokemon data...
        </motion.div>
      </motion.div>
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
          {/* Pokemon Number and Name */}
          <motion.div variants={contentVariants}>
            <div className="mb-1 text-2xl font-semibold opacity-90">
              #{id.toString().padStart(3, '0')}
            </div>
            <h1 className="mb-4 text-4xl font-bold capitalize">
              {pokemonName}
            </h1>
          </motion.div>

          {/* Japanese name, Height and Weight */}
          <motion.div 
            className="text-md ml-10 flex flex-col gap-2 tracking-widest"
            variants={contentVariants}
          >
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
          </motion.div>

          {/* Pokemon Image */}
          <motion.div 
            className="flex justify-center md:justify-start"
            variants={contentVariants}
          >
            {primaryImage ? (
              <motion.div 
                className="absolute right-0 top-[5%] -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <motion.img
                  src={primaryImage}
                  alt={pokemonName}
                  className="h-[80vh] w-[40vw] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  onLoad={(e) => {
                    // Only run on client side
                    if (typeof window !== 'undefined' && e.currentTarget) {
                      // Add a subtle scale animation when image loads
                      e.currentTarget.style.transform = 'scale(1.02)'
                      setTimeout(() => {
                        if (e.currentTarget) {
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.transition = 'transform 0.3s ease-out'
                        }
                      }, 50)
                    }
                  }}
                />
              </motion.div>
            ) : (
              <motion.div 
                className="flex h-48 w-48 items-center justify-center text-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                No image available
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Right Side - Base Stats */}
        <motion.div 
          className="flex h-full flex-col gap-8 rounded-xl p-6"
          variants={contentVariants}
          layout // Smooth layout transitions
        >
          {/* Type Icons */}
          <motion.div 
            className="flex gap-4"
            variants={contentVariants}
          >
            {types?.map((typeObj, index) => (
              <motion.div
                key={index}
                className="rounded-full bg-white p-3 backdrop-blur-sm"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.4, 
                  ease: 'easeOut',
                  delay: index * 0.1 
                }}
              >
                <img
                  src={`/types/${
                    typeObj.type.name.charAt(0).toUpperCase() +
                    typeObj.type.name.slice(1)
                  }.png`}
                  alt={typeObj.type.name}
                  className="h-8 w-8"
                  onError={(e) => {
                    // Only run on client side
                    if (typeof window !== 'undefined' && e.currentTarget) {
                      // Fallback to text if image fails
                      e.currentTarget.style.display = 'none'
                    }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.h2 
            className="mb-6 text-4xl font-bold"
            variants={contentVariants}
          >
            Base stats:
          </motion.h2>

          <motion.div 
            className="flex max-w-72 flex-wrap gap-2 gap-y-4 border-l-4 border-l-white/30 pl-6 leading-snug"
            variants={statsContainerVariants}
            initial="initial"
            animate="animate"
          >
            {stats?.map((stat, index) => {
              const statName = stat.stat.name
              const baseStat = stat.base_stat

              return (
                <motion.div
                  key={index}
                  className="rounded-lg bg-white/95 px-3 py-1 text-base font-bold text-black/80"
                  variants={statItemVariants}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="">{formatStatName(statName)}:</span>
                    <span className="">{baseStat}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
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
