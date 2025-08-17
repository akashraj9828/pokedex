import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { IoChevronBack } from 'react-icons/io5'

interface PokemonHeaderProps {
  id: number
  name: string
  types?: Array<{ type: { name: string } }>
}

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

const PokemonHeader = ({ id, name, types }: PokemonHeaderProps) => {
  const router = useRouter()

  return (
    <motion.div variants={contentVariants}>
      <div className="mb-4 flex items-center">
        <button
          onClick={() => router.push('/pokedex')}
          className="mr-3 rounded-lg bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
          aria-label="Back to Pokedex"
        >
          <IoChevronBack className="h-5 w-5" />
        </button>
        <div>
          <div className="text-2xl font-semibold opacity-90">
            #{id.toString().padStart(3, '0')}
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold capitalize">{name}</h1>
            {/* Type Icons */}
            {types && types.length > 0 && (
              <div className="flex gap-2">
                {types.map((typeObj, typeIndex) => (
                  <div
                    key={typeIndex}
                    className="rounded-full bg-white/20 p-2 backdrop-blur-sm"
                  >
                    <img
                      src={`/types/${
                        typeObj.type.name.charAt(0).toUpperCase() +
                        typeObj.type.name.slice(1)
                      }.png`}
                      alt={typeObj.type.name}
                      className="h-6 w-6"
                      onError={(e) => {
                        // Only run on client side
                        if (typeof window !== 'undefined' && e.currentTarget) {
                          // Hide the image if it fails to load
                          e.currentTarget.style.display = 'none'
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PokemonHeader
