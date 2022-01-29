import { actions } from '@/reducers/pokemon'
import { Pokedex } from 'pokeapi-js-wrapper'

export const client = new Pokedex({ cache: true, protocol: 'https' })

export const getPokemonTypesList = async () => {
  const { results } = await client.getTypesList({ limit: 10000 })
  return results
}
export const fetchPokemonTypesList = () => {
  return async (dispatch, getState) => {
    return dispatch({
      type: actions.SET_POKEMON_TYPES,
      payload: await getPokemonTypesList(),
    })
  }
}

export const getPokemonList = async () => {
  const { results } = await client.getPokemonsList({ limit: 10000 })
  return results
}
export const fetchPokemonList = () => {
  return async (dispatch, getState) => {
    return dispatch({
      type: actions.SET_POKEMON_LIST,
      payload: await getPokemonList(),
    })
  }
}

export const getPokemonListByType = async (pokemonType) => {
  const { pokemon } = await client.getTypeByName(pokemonType)
  return pokemon.map((pokemonData) => pokemonData.pokemon)
}
export const fetchPokemonListByType = (pokemonType) => {
  return async (dispatch, getState) => {
    return dispatch({
      type: actions.SET_POKEMON_LIST,
      payload: await getPokemonListByType(pokemonType),
    })
  }
}

export const getPokemonByName = async (pokemonName) => {
  return await client.getPokemonByName(pokemonName)
}
export const fetchPokemonByName = (pokemonName) => {
  return async (dispatch, getState) => {
    return dispatch({
      type: actions.SET_POKEMON_DETAILS,
      payload: { [pokemonName]: await getPokemonByName(pokemonName) },
    })
  }
}

export const getPokemonSpeciesByName = async (speciesName) => {
  return await client.getPokemonSpeciesByName(speciesName)
}
export const fetchPokemonSpeciesByName = (speciesName) => {
  return async (dispatch, getState) => {
    return dispatch({
      type: actions.SET_POKEMON_SPECIES,
      payload: { speciesName: await getPokemonSpeciesByName(speciesName) },
    })
  }
}

export const getPokemonFormByName = async (formName) => {
  return await client.getPokemonFormByName(formName)
}
export const fetchPokemonFormByName = (formName) => {
  return async (dispatch, getState) => {
    return dispatch({
      type: actions.SET_POKEMON_LIST,
      payload: await getPokemonFormByName(formName),
    })
  }
}

export const getPokemonEvolutionById = async (evolutionId) => {
  const { chain } = await client.getEvolutionChainById(evolutionId)
  return chain
}
export const fetchPokemonEvolutionById = (evolutionId) => {
  return async (dispatch, getState) => {
    return dispatch({
      type: actions.SET_POKEMON_EVOLUTIONS,
      payload: { [evolutionId]: await getPokemonEvolutionById(evolutionId) },
    })
  }
}
