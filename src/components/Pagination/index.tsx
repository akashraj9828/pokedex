import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

interface PaginationProps {
  currentId: number
  range: number
}

const Pagination: React.FC<PaginationProps> = ({ currentId, range }) => {
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && currentId > 1) {
      router.push(`/pokemon/${currentId - 1}`)
    } else if (event.key === 'ArrowRight' && currentId < totalIds) {
      router.push(`/pokemon/${currentId + 1}`)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentId, totalIds])

  return (
    <div className="flex items-center justify-center w-full px-6 py-4 mx-auto">
      <div className="flex items-center justify-between">
        <button
          disabled={currentId <= 1}
          onClick={() => router.push(`/pokemon/${currentId - 1}`)}
          className="px-3 py-1 text-sm font-bold transition-colors rounded-md opacity-70 hover:opacity-100"
        >
          <FaChevronLeft />
        </button>
        <div className="flex items-center justify-between space-x-2">
          {navIds.map((navId) => (
            <Link key={navId} href={`/pokemon/${navId}`}>
              <a
                className={`rounded-md px-3 py-1 text-sm font-bold transition-colors ${
                  navId === currentId ? '' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {navId}
              </a>
            </Link>
          ))}
        </div>
        <button
          disabled={currentId >= totalIds}
          onClick={() => router.push(`/pokemon/${currentId + 1}`)}
          className="px-3 py-1 text-sm font-bold transition-colors rounded-md opacity-70 hover:opacity-100"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Pagination
