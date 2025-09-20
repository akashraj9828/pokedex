import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TabContentContainerProps {
  title: string
  headerRight?: ReactNode
  children: ReactNode
  showEmpty?: boolean
  emptyMessage?: string
  isLoading?: boolean
  loadingMessage?: string
}

const TabContentContainer = ({
  title,
  headerRight,
  children,
  showEmpty = false,
  emptyMessage = 'No data available',
  isLoading = false,
  loadingMessage = 'Loading...',
}: TabContentContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex h-full flex-col space-y-4"
    >
      {/* Content Section with Header Inside */}
      <div className="flex-1 rounded-xl bg-white/5 p-6 backdrop-blur-sm">
        {/* Header Section Inside Card */}
        <div className="mb-6 flex items-start justify-between">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {headerRight && (
            <div className="ml-4 flex-shrink-0">{headerRight}</div>
          )}
        </div>

        {/* Content */}
        {showEmpty ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-white/70">{emptyMessage}</p>
          </div>
        ) : isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <p className="text-white/70">{loadingMessage}</p>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  )
}

export default TabContentContainer
