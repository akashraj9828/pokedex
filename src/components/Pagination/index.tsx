import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, memo } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

interface PaginationProps {
  currentId: number
  range: number
}

const Pagination: React.FC<PaginationProps> = ({ currentId, range }) => {
  useEffect(() => {
    console.log('Remount')

    return () => {
      console.log('Unmount')
    }
  }, [])

  const router = useRouter()
  const totalIds = useSelector((state) => state.pokemon.pokemon_list.length)

  const generateNavIds = (currentId: number) => {
    const navIds = []
    for (let i = currentId - range; i <= currentId + range; i++) {
      if (i >= 1 && i <= totalIds) {
        navIds.push(i)
      }
    }
    return navIds
  }

  const navIds = generateNavIds(currentId)

  // Calculate the offset to center the active page
  const currentIndex = navIds.indexOf(currentId)
  const itemWidth = 48 // Approximate width including margins
  const containerWidth = 320 // w-80 = 320px
  const centerPosition = containerWidth / 2

  // Calculate total width of all items
  const totalItemsWidth = navIds.length * itemWidth

  // Calculate offset to center the active item
  const activeItemPosition = currentIndex * itemWidth + itemWidth / 2
  const centerOffset = activeItemPosition - centerPosition

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && currentId > 1) {
      event.preventDefault()
      router.push(`/pokemon/${currentId - 1}`, undefined, { shallow: true })
    } else if (event.key === 'ArrowRight' && currentId < totalIds) {
      event.preventDefault()
      router.push(`/pokemon/${currentId + 1}`, undefined, { shallow: true })
    }
  }

  useEffect(() => {
    const handleKeyDownWrapper = (event: KeyboardEvent) => handleKeyDown(event)
    window.addEventListener('keydown', handleKeyDownWrapper)
    return () => {
      window.removeEventListener('keydown', handleKeyDownWrapper)
    }
  }, [currentId, totalIds, router])

  return (
    <div className="text-md mx-auto flex w-full items-center justify-center px-6 py-4">
      <div className="flex items-center justify-between">
        <motion.button
          disabled={currentId <= 1}
          onClick={() =>
            router.push(`/pokemon/${currentId - 1}`, undefined, {
              shallow: true,
            })
          }
          className="rounded-md px-3 py-1 font-bold opacity-70 transition-all duration-200 hover:scale-110 hover:opacity-100 disabled:opacity-30 disabled:hover:scale-100"
          whileHover={{ scale: currentId > 1 ? 1.1 : 1 }}
          whileTap={{ scale: currentId > 1 ? 0.95 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <FaChevronLeft />
        </motion.button>

        <div className="relative flex w-80 justify-center overflow-hidden">
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={false}
            animate={{
              x: -centerOffset,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.6,
            }}
          >
            <AnimatePresence mode="popLayout">
              {navIds.map((navId) => {
                const isCurrent = navId === currentId

                return (
                  <motion.div
                    key={navId}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: isCurrent ? 1.1 : 1,
                      y: isCurrent ? -2 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                      duration: 0.3,
                    }}
                    whileHover={{
                      scale: isCurrent ? 1.15 : 1.05,
                      y: isCurrent ? -4 : -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/pokemon/${navId}`}
                      className={`relative block rounded-md px-3 py-1 font-bold transition-all duration-200 ${
                        isCurrent
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                          : 'opacity-70 hover:bg-gray-100 hover:opacity-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {navId}
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-400 to-blue-600"
                          layoutId="activeBackground"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }}
                          style={{ zIndex: -1 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.button
          disabled={currentId >= totalIds}
          onClick={() =>
            router.push(`/pokemon/${currentId + 1}`, undefined, {
              shallow: true,
            })
          }
          className="rounded-md px-3 py-1 font-bold opacity-70 transition-all duration-200 hover:scale-110 hover:opacity-100 disabled:opacity-30 disabled:hover:scale-100"
          whileHover={{ scale: currentId < totalIds ? 1.1 : 1 }}
          whileTap={{ scale: currentId < totalIds ? 0.95 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <FaChevronRight />
        </motion.button>
      </div>
    </div>
  )
}

export default memo(Pagination)
