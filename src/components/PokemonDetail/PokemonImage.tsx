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

const PokemonImage: React.FC<PokemonImageProps> = ({ imageUrl, name }) => {
    return (
        <motion.div
            className="flex justify-center md:justify-start"
            variants={contentVariants}
        >
            {imageUrl ? (
                <motion.div
                    className="absolute right-0 top-[5%] -z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
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