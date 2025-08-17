import { motion } from 'framer-motion'

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
  return (
    <motion.div variants={contentVariants}>
      <div className="mb-1 text-2xl font-semibold opacity-90">
        #{id.toString().padStart(3, '0')}
      </div>
      <h1 className="mb-4 text-4xl font-bold capitalize">{name}</h1>
    </motion.div>
  )
}

export default PokemonHeader
