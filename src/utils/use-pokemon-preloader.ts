import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPokemonByName,
  fetchPokemonSpeciesByName,
} from '@/helpers/pokedex_api'
import { useImagePreloader } from './use-image-preloader'

interface PreloadOptions {
  /**
   * Number of Pokemon to preload in each direction (next/previous)
   * Default: 3
   */
  preloadCount?: number
  /**
   * Whether to preload images
   * Default: true
   */
  preloadImages?: boolean
  /**
   * Delay before starting preload (in milliseconds)
   * Default: 500ms
   */
  delay?: number
}

/**
 * Custom hook to preload Pokemon data and images for better navigation performance
 *
 * @param currentId - Current Pokemon ID
 * @param options - Preload configuration options
 */
export const usePokemonPreloader = (
  currentId: number,
  options: PreloadOptions = {}
) => {
  const { preloadCount = 3, preloadImages = true, delay = 500 } = options

  const dispatch = useDispatch()
  const timeoutRef = useRef<NodeJS.Timeout>()
  const { preloadImages: preloadImageUrls, isImagePreloaded } =
    useImagePreloader({
      maxConcurrent: 2,
      timeout: 8000,
    })

  const pokemonList = useSelector((state: any) => state.pokemon.pokemon_list)
  const pokemonDetails = useSelector(
    (state: any) => state.pokemon.pokemon_details
  )
  const pokemonSpecies = useSelector(
    (state: any) => state.pokemon.pokemon_species
  )

  /**
   * Preload Pokemon data for a specific ID
   */
  const preloadPokemonData = async (pokemonId: number) => {
    if (pokemonId < 1 || pokemonId > pokemonList.length) return

    const pokemonName = pokemonId.toString()

    // Check if data already exists
    const hasDetails =
      pokemonDetails[pokemonName] && !pokemonDetails[pokemonName].loading
    const hasSpecies = pokemonSpecies[pokemonName]

    // Dispatch actions to fetch data if not already available
    if (!hasDetails) {
      dispatch(fetchPokemonByName(pokemonName))
    }

    if (!hasSpecies) {
      dispatch(fetchPokemonSpeciesByName(pokemonName))
    }

    // Preload images if enabled and data exists
    if (preloadImages && hasDetails) {
      const pokemon = pokemonDetails[pokemonName]
      const imageUrls: string[] = []

      if (pokemon?.images?.front) {
        imageUrls.push(...pokemon.images.front.filter((url: string) => url))
      }
      if (pokemon?.images?.back) {
        imageUrls.push(...pokemon.images.back.filter((url: string) => url))
      }

      if (imageUrls.length > 0) {
        preloadImageUrls(imageUrls)
      }
    }
  }

  /**
   * Get array of Pokemon IDs to preload
   */
  const getPreloadIds = (currentId: number): number[] => {
    const ids: number[] = []
    const maxId = pokemonList.length

    // Previous Pokemon
    for (let i = 1; i <= preloadCount; i++) {
      const prevId = currentId - i
      if (prevId >= 1) {
        ids.push(prevId)
      }
    }

    // Next Pokemon
    for (let i = 1; i <= preloadCount; i++) {
      const nextId = currentId + i
      if (nextId <= maxId) {
        ids.push(nextId)
      }
    }

    return ids
  }

  /**
   * Start preloading process
   */
  const startPreloading = () => {
    if (!currentId || !pokemonList.length) return

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Start preloading after delay
    timeoutRef.current = setTimeout(() => {
      const preloadIds = getPreloadIds(currentId)

      // Preload data for each Pokemon ID
      preloadIds.forEach((id, index) => {
        // Stagger the requests to avoid overwhelming the API
        setTimeout(() => {
          preloadPokemonData(id)
        }, index * 100) // 100ms delay between each request
      })
    }, delay)
  }

  // Effect to start preloading when currentId changes
  useEffect(() => {
    startPreloading()

    // Cleanup timeout on unmount or dependency change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentId, pokemonList.length, preloadCount, delay])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    /**
     * Manually trigger preloading for specific Pokemon IDs
     */
    preloadPokemon: preloadPokemonData,
    /**
     * Get the list of Pokemon IDs that would be preloaded
     */
    getPreloadIds: () => getPreloadIds(currentId),
    /**
     * Check if a Pokemon's data is already loaded
     */
    isPokemonLoaded: (pokemonId: number) => {
      const pokemonName = pokemonId.toString()
      return !!(
        pokemonDetails[pokemonName] &&
        !pokemonDetails[pokemonName].loading &&
        pokemonSpecies[pokemonName]
      )
    },
  }
}
