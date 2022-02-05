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

  const inputRef: any = useRef()

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
      <div className={`group relative  ${fullWidth ? 'w-full' : ''}`}>
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
          }  transition-width h-10 appearance-none rounded-full border border-gray-200 pl-5 pr-5 text-sm duration-300 focus:outline-none`}
        />
        <button
          type="submit"
          className={`absolute top-3 duration-300 ${
            focused ? 'right-4 my-auto' : 'left-3 right-0 m-auto'
          }`}
        >
          <FiSearch
            className={`h-4 w-4 ${
              focused ? 'stroke-current' : 'text-gray-500'
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default Search
