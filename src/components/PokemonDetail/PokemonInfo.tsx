import { motion } from 'framer-motion'

interface PokemonInfoProps {
  japaneseName?: string
  height: number
  weight: number
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

const PokemonInfo = ({
  japaneseName,
  height,
  weight,
}: PokemonInfoProps) => {
  return (
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
  )
}

export default PokemonInfo
