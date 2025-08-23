import { motion } from 'framer-motion'
import { MoveElement, Pokemon } from 'pokeapi-js-wrapper'
import { useState, useMemo } from 'react'

interface MovesDetailProps {
  moves: Pokemon['moves']
}

const MovesDetail = ({ moves }: MovesDetailProps) => {
  const [selectedLearnMethod, setSelectedLearnMethod] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique learn methods
  const learnMethods = useMemo(() => {
    const methods = new Set<string>()
    moves?.forEach((moveEntry) => {
      moveEntry.version_group_details.forEach((detail) => {
        methods.add(detail.move_learn_method.name)
      })
    })
    return Array.from(methods).sort()
  }, [moves])

  // Filter and process moves
  const filteredMoves = useMemo(() => {
    if (!moves) return []

    let filtered = moves.filter((moveEntry) => {
      // Filter by search query
      if (
        searchQuery &&
        !moveEntry.move.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Filter by learn method
      if (selectedLearnMethod !== 'all') {
        return moveEntry.version_group_details.some(
          (detail) => detail.move_learn_method.name === selectedLearnMethod
        )
      }

      return true
    })

    // Sort moves: level-up moves by level, others alphabetically
    return filtered.sort((a, b) => {
      if (selectedLearnMethod === 'level-up') {
        const aLevel =
          a.version_group_details.find(
            (d) => d.move_learn_method.name === 'level-up'
          )?.level_learned_at ?? 999
        const bLevel =
          b.version_group_details.find(
            (d) => d.move_learn_method.name === 'level-up'
          )?.level_learned_at ?? 999
        return aLevel - bLevel
      }
      return a.move.name.localeCompare(b.move.name)
    })
  }, [moves, selectedLearnMethod, searchQuery])

  const formatMoveName = (name: string) => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const formatLearnMethod = (method: string) => {
    switch (method) {
      case 'level-up':
        return 'Level Up'
      case 'machine':
        return 'TM/TR'
      case 'tutor':
        return 'Move Tutor'
      case 'egg':
        return 'Egg Move'
      case 'light-ball-egg':
        return 'Light Ball Egg'
      case 'form-change':
        return 'Form Change'
      case 'zygarde-cube':
        return 'Zygarde Cube'
      default:
        return method
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
    }
  }

  const getMoveLevel = (moveEntry: MoveElement, method: string) => {
    const detail = moveEntry.version_group_details.find(
      (d) => d.move_learn_method.name === method
    )
    return detail?.level_learned_at ?? 0
  }

  if (!moves || moves.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
      >
        <p className="text-center text-white/70">No moves data available</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold text-white">Moves</h3>

      {/* Controls */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search moves..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/50 backdrop-blur-sm focus:bg-white/20 focus:outline-none"
          />
        </div>

        {/* Learn Method Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLearnMethod('all')}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
              selectedLearnMethod === 'all'
                ? 'bg-white text-gray-800'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            All ({moves.length})
          </button>
          {learnMethods.map((method) => {
            const count = moves.filter((move) =>
              move.version_group_details.some(
                (d) => d.move_learn_method.name === method
              )
            ).length

            return (
              <button
                key={method}
                onClick={() => setSelectedLearnMethod(method)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                  selectedLearnMethod === method
                    ? 'bg-white text-gray-800'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {formatLearnMethod(method)} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Moves List */}
      <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
        {filteredMoves.length === 0 ? (
          <p className="py-8 text-center text-white/70">
            No moves found matching your criteria
          </p>
        ) : (
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {filteredMoves.map((moveEntry, index) => {
              const primaryMethod =
                selectedLearnMethod !== 'all'
                  ? selectedLearnMethod
                  : moveEntry.version_group_details[0]?.move_learn_method
                      .name || 'unknown'

              const level = getMoveLevel(moveEntry, primaryMethod)

              return (
                <motion.div
                  key={moveEntry.move.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-white">
                      {formatMoveName(moveEntry.move.name)}
                    </h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {/* Get unique learn methods and their details */}
                      {Array.from(
                        new Map(
                          moveEntry.version_group_details.map((detail) => [
                            detail.move_learn_method.name,
                            detail,
                          ])
                        ).values()
                      ).map((detail, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-white/10 px-2 py-1 text-xs text-white/80"
                        >
                          {formatLearnMethod(detail.move_learn_method.name)}
                          {detail.move_learn_method.name === 'level-up' &&
                            detail.level_learned_at > 0 &&
                            ` (Lv. ${detail.level_learned_at})`}
                        </span>
                      ))}
                    </div>
                  </div>

                  {primaryMethod === 'level-up' && level > 0 && (
                    <div className="text-right">
                      <span className="text-sm font-bold text-white">
                        Lv. {level}
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="text-center text-sm text-white/60">
        Showing {filteredMoves.length} of {moves.length} moves
      </div>
    </motion.div>
  )
}

export default MovesDetail
