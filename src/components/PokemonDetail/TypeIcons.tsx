import { motion } from 'framer-motion'

interface Type {
  type: {
    name: string
  }
}

interface TypeIconsProps {
  types: Type[]
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

const TypeIcons = ({ types }: TypeIconsProps) => {
  return (
    <motion.div className="flex gap-4" variants={contentVariants}>
      {types?.map((typeObj, index) => (
        <motion.div
          key={index}
          className="rounded-full bg-white p-3 backdrop-blur-sm"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.4,
            ease: 'easeOut',
            delay: index * 0.1,
          }}
        >
          <img
            src={`/types/${typeObj.type.name.charAt(0).toUpperCase() +
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
  )
}

export default TypeIcons
