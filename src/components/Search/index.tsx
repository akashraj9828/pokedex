import { ReduxState } from '@/reducers'
import { useDebounce } from '@/utils/use-debounce'
import Link from 'next/link'
import { NamedAPIResource } from 'pokeapi-js-wrapper'
import { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useSelector } from 'react-redux'

interface SearchProps {
  onChange?: (value: any) => void
  placeholder?: string
  stayOpen?: boolean
  fullWidth?: boolean
  focusOnInit?: boolean
  showResults?: boolean
}

const Search = ({
  onChange = (value: any) => null,
  placeholder = 'Search Pokemon...',
  stayOpen = true,
  fullWidth = true,
  focusOnInit = false,
  showResults = true,
}: SearchProps) => {
  const [focused, setFocused] = useState(stayOpen)
  const [searchText, setSearchText] = useState<string | undefined>(undefined)
  const [showDropdown, setShowDropdown] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const debouncedSearch = useDebounce(searchText, 300)

  // Get Pokemon list from Redux state
  const pokemonList = useSelector(
    (state: ReduxState) => state.pokemon.pokemon_list
  )

  // Filter Pokemon based on search text or show first 10 when focused without search
  const filteredPokemon = showResults
    ? debouncedSearch && debouncedSearch.length > 0
      ? pokemonList
          .filter((pokemon: NamedAPIResource) =>
            pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .slice(0, 10) // Limit to 10 results
      : inputFocused
      ? pokemonList.slice(0, 10) // Show first 10 Pokemon when focused but no search text
      : []
    : []

  useEffect(() => {
    onChange && onChange(debouncedSearch)
    // Show dropdown when input is focused and we have results, or when there's search text
    setShowDropdown(inputFocused && showResults && filteredPokemon.length > 0)
    return () => {}
  }, [debouncedSearch, showResults, filteredPokemon.length, inputFocused])

  const inputRef: any = useRef(null)
  const containerRef: any = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      focusOnInit && inputRef.current.focus()
    }
  }, [inputRef, focusOnInit])

  const handleClickOutside = (e: any) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setShowDropdown(false)
      setInputFocused(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative flex ${
        fullWidth ? 'w-full' : 'max-w-xs'
      } navbar-search mr-2 rounded-md border-0`}
      onFocus={() => {
        !stayOpen && setFocused(true)
        inputRef.current.focus()
      }}
      onBlur={() => !stayOpen && !searchText && setFocused(false)}
    >
      <div
        className={`group relative flex items-center  ${
          fullWidth ? 'w-full' : ''
        }`}
      >
        <input
          ref={inputRef}
          // type='search'
          name="search"
          value={searchText || ''}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
          onFocus={() => {
            setInputFocused(true)
          }}
          onBlur={(e) => {
            // Only hide if clicking outside the container
            if (!containerRef.current?.contains(e.relatedTarget)) {
              setInputFocused(false)
            }
          }}
          placeholder={placeholder}
          className={`${
            focused ? (fullWidth ? 'w-full' : 'w-40') : 'w-0'
          }  transition-width h-14 appearance-none rounded-full border border-gray-50 bg-gray-50 pl-12 pr-5 text-base focus:outline-none`}
        />
        <button
          type="submit"
          className={`absolute  ${
            focused ? 'left-4 my-auto' : 'left-3 right-0 m-auto'
          }`}
        >
          <FiSearch
            strokeWidth={3}
            className={`h-6 w-6 ${
              focused ? 'stroke-current' : 'text-gray-500'
            }`}
          />
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {filteredPokemon.map((pokemon: NamedAPIResource, index: number) => (
            <Link
              href={`/pokemon/${pokemon.name}`}
              key={pokemon.name}
              onClick={() => {
                setShowDropdown(false)
                setInputFocused(false)
                setSearchText('')
              }}
              className="flex cursor-pointer items-center border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                  <span className="text-xs font-medium text-gray-600">
                    #{pokemon.url.split('/').slice(-2, -1)[0]}
                  </span>
                </div>
                <span className="font-medium capitalize text-gray-800">
                  {pokemon.name}
                </span>
              </div>
            </Link>
          ))}
          {filteredPokemon.length === 0 &&
            debouncedSearch &&
            debouncedSearch.length > 0 && (
              <div className="px-4 py-3 text-center text-gray-500">
                No Pokemon found matching "{debouncedSearch}"
              </div>
            )}
        </div>
      )}
    </div>
  )
}

export default Search
