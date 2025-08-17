import { motion } from 'framer-motion'

interface PokemonImageProps {
  imageUrl?: string
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

const PokemonImage = ({ imageUrl, name }: PokemonImageProps) => {
  return (
    <motion.div
      className="flex justify-center md:justify-start "
      variants={contentVariants}
    >
      {imageUrl ? (
        <motion.div
          className="absolute right-0 top-[5%] -z-10 "
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div
            className="h-[80vh] w-[40vw] object-contain"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPositionY: 'center',
              backgroundSize: 'contain',
              backgroundOrigin: 'border-box',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0% 0%',
              display: 'block',
              position: 'absolute',
              right: 0,
              scale: 1,
              top: 0,
              opacity: 0.07,
              filter: 'brightness(0) invert(0)',
              // transform: 'rotateY(180deg)',
            }}
          />

          <motion.img
            src={imageUrl}
            alt={name}
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
  )
}

export default PokemonImage
