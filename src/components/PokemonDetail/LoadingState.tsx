import { motion } from 'framer-motion'

interface LoadingStateProps {
  message?: string
}

const LoadingState = ({
  message = 'Loading...',
}: LoadingStateProps) => {
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
        {message}
      </motion.div>
    </motion.div>
  )
}

export default LoadingState
