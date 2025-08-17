import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { IoChevronBack } from 'react-icons/io5'

interface PokemonHeaderProps {
  id: number
  name: string
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

const PokemonHeader = ({ id, name }: PokemonHeaderProps) => {
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
          <h1 className="text-4xl font-bold capitalize">{name}</h1>
        </div>
      </div>
    </motion.div>
  )
}

export default PokemonHeader
