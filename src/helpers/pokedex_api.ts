import {
  setPokemonDetails,
  setPokemonEvolutions,
  setPokemonGeneration,
  setPokemonList,
  setPokemonSpecies,
  setPokemonTypes,
} from '@/reducers/pokemon'
import { Pokedex } from 'pokeapi-js-wrapper'

// Only create client in browser
const defineClientPokedex = () => {
  if (typeof window !== 'undefined') {
    return new Pokedex({
      cache: true,
      protocol: 'https',
      cacheImages: true,
    })
  }
  return null
}
export const client = defineClientPokedex() as Pokedex

const getPokemonTypesList = async () => {
  const { results } = await client.getTypesList({ offset: 0, limit: 10000 })
  return results
}
export const fetchPokemonTypesList = () => {
  return async (dispatch) => {
    return dispatch(setPokemonTypes(await getPokemonTypesList()))
  }
}

const getPokemonList = async () => {
  const { results } = await client.getPokemonsList({ offset: 0, limit: 10000 })
  return results
}
export const fetchPokemonList = () => {
  return async (dispatch) => {
    return dispatch(setPokemonList(await getPokemonList()))
  }
}

const getPokemonListByType = async (pokemonType) => {
  const { pokemon } = await client.getTypeByName(pokemonType)
  return pokemon.map((pokemonData) => pokemonData.pokemon)
}
export const fetchPokemonListByType = (pokemonType) => {
  return async (dispatch) => {
    return dispatch(setPokemonList(await getPokemonListByType(pokemonType)))
  }
}

const getPokemonByName = async (pokemonName) => {
  return await client.getPokemonByName(pokemonName)
}
export const fetchPokemonByName = (pokemonName) => {
  return async (dispatch) => {
    dispatch(
      setPokemonDetails({
        [pokemonName]: {
          loading: true,
          id: 0,
          name: pokemonName,
          weight: 0,
          height: 0,
          stats: [],
          types: [],
          images: { front: [], back: [], showdown: [] },
        },
      })
    )
    const data = await getPokemonByName(pokemonName)
    const { sprites } = data
    const { other } = sprites
    const offical_artwork = other['official-artwork']
    const _showdown = other['showdown']

    const showdown = [_showdown.front_default, _showdown.front_shiny].filter(
      (e): e is string => typeof e === 'string'
    )
    const front = [
      offical_artwork.front_default,
      other.dream_world.front_default,
      other.home.front_default,
      other.home.front_female,
    ].filter((e): e is string => typeof e === 'string')
    const back = [
      offical_artwork.back_default,
      // back_shiny,
      // back_female,
      // back_shiny_female,
    ].filter((e): e is string => typeof e === 'string')
    return dispatch(
      setPokemonDetails({
        [pokemonName]: {
          loading: false,
          ...data,
          images: { front, back, showdown },
        },
      })
    )
  }
}

const getPokemonSpeciesByName = async (speciesName) => {
  const data = await client.getPokemonSpeciesByName(speciesName)
  const evolutionIdRegex = /evolution-chain\/(\d+)\/$/
  const {
    base_happiness,
    capture_rate,
    forms_switchable,
    has_gender_differences,
    is_baby,
    is_legendary,
    is_mythical,
    name,
    names,
    varieties,
  } = data
  const evolutionId =
    data?.evolution_chain?.url?.match?.(evolutionIdRegex)?.[1] || null
  return {
    evolutionId,
    name,
    is_baby,
    is_legendary,
    is_mythical,
    has_gender_differences,
    forms_switchable,
    base_happiness,
    capture_rate,
    varieties,
    names,
  }
}
export const fetchPokemonSpeciesByName = (speciesName) => {
  return async (dispatch) => {
    return dispatch(
      setPokemonSpecies({
        [speciesName]: await getPokemonSpeciesByName(speciesName),
      })
    )
  }
}

const getPokemonFormByName = async (formName) => {
  return await client.getPokemonFormByName(formName)
}
export const fetchPokemonFormByName = (formName) => {
  return async (dispatch) => {
    return dispatch(
      setPokemonDetails({ [formName]: await getPokemonFormByName(formName) })
    )
  }
}

const getPokemonEvolutionById = async (evolutionId) => {
  const { chain } = await client.getEvolutionChainById(evolutionId)
  return chain
}
export const fetchPokemonEvolutionById = (evolutionId) => {
  return async (dispatch) => {
    return dispatch(
      setPokemonEvolutions({
        [evolutionId]: await getPokemonEvolutionById(evolutionId),
      })
    )
  }
}

const getPokemonGenerationById = async (id) => {
  const generation = await client.getGenerationByName(id)
  return generation
}
export const fetchPokemonGenerationById = (generationId) => {
  return async (dispatch) => {
    return dispatch(
      setPokemonGeneration({
        [generationId]: await getPokemonGenerationById(generationId),
      })
    )
  }
}
