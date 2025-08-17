import { useDebounce } from '@/utils/use-debounce'
import { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const Search = ({
  onChange = (value) => null,
  placeholder = 'Search...',
  stayOpen = true,
  fullWidth = true,
  focusOnInit = false,
}) => {
  const [focused, setFocused] = useState(stayOpen)
  const [searchText, setSearchText] = useState(undefined)
  const debouncedSearch = useDebounce(searchText, 300)

  useEffect(() => {
    onChange && onChange(debouncedSearch)
    return () => {}
  }, [debouncedSearch])

  const inputRef: any = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      focusOnInit && inputRef.current.focus()
    }
  }, [inputRef, focusOnInit])
  return (
    <div
      className={`flex ${
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
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
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
    </div>
  )
}

export default Search
