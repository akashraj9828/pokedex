import { motion } from 'framer-motion'

interface Stat {
  stat: {
    name: string
  }
  base_stat: number
}

interface BaseStatsProps {
  stats: Stat[]
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

const BaseStats = ({ stats }: BaseStatsProps) => {
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
    <>
      <motion.h2 className="mb-6 text-4xl font-bold" variants={contentVariants}>
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
    </>
  )
}

export default BaseStats
