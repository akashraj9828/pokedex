import {
  setPokemonTypes,
  setPokemonList,
  setPokemonDetails,
  setPokemonSpecies,
  setPokemonEvolutions,
} from '@/reducers/pokemon'
import { Pokedex } from 'pokeapi-js-wrapper'

export const client = new Pokedex({ cache: true, protocol: 'https' })

export const getPokemonTypesList = async () => {
  const { results } = await client.getTypesList({ offset: 0, limit: 10000 })
  return results
}
export const fetchPokemonTypesList = () => {
  return async (dispatch, getState) => {
    return dispatch(setPokemonTypes(await getPokemonTypesList()))
  }
}

export const getPokemonList = async () => {
  const { results } = await client.getPokemonsList({ offset: 0, limit: 898 })
  return results
}
export const fetchPokemonList = () => {
  return async (dispatch, getState) => {
    return dispatch(setPokemonList(await getPokemonList()))
  }
}

export const getPokemonListByType = async (pokemonType) => {
  const { pokemon } = await client.getTypeByName(pokemonType)
  return pokemon.map((pokemonData) => pokemonData.pokemon)
}
export const fetchPokemonListByType = (pokemonType) => {
  return async (dispatch, getState) => {
    return dispatch(setPokemonList(await getPokemonListByType(pokemonType)))
  }
}

export const getPokemonByName = async (pokemonName) => {
  return await client.getPokemonByName(pokemonName)
}
export const fetchPokemonByName = (pokemonName) => {
  return async (dispatch, getState) => {
    dispatch(setPokemonDetails({ [pokemonName]: { loading: true } }))
    const data = await getPokemonByName(pokemonName)
    const {
      abilities,
      base_experience,
      forms,
      game_indices,
      height,
      held_items,
      id,
      is_default,
      location_area_encounters,
      moves,
      name,
      order,
      past_types,
      species,
      sprites,
      stats,
      types,
      weight,
    } = data
    const {
      back_default,
      back_shiny,
      front_default,
      front_shiny,
      back_female,
      back_shiny_female,
      front_female,
      front_shiny_female,
      other,
    } = sprites
    const offical_artwork = other['official-artwork']
    const front = [
      offical_artwork.front_default,
      // front_default,
      // front_shiny,
      // front_female,
      // front_shiny_female,
      other.dream_world.front_default,
      other.home.front_default,
      other.home.front_female,
      // other.home.front_shiny,
      // other.home.front_shiny_female,
    ].filter((e) => e)
    const back = [
      // back_default,
      // back_shiny,
      // back_female,
      // back_shiny_female,
    ].filter((e) => e)
    return dispatch(
      setPokemonDetails({
        [pokemonName]: {
          loading: false,
          id,
          name,
          weight,
          height,
          // forms,
          stats,
          types,
          images: { front, back },
        },
      })
    )
  }
}

export const getPokemonSpeciesByName = async (speciesName) => {
  const data = await client.getPokemonSpeciesByName(speciesName)
  const evolutionIdRegex = /evolution-chain\/(\d+)\/$/
  const {
    base_happiness,
    capture_rate,
    color,
    egg_groups,
    evolution_chain,
    evolves_from_species,
    flavor_text_entries,
    form_descriptions,
    forms_switchable,
    gender_rate,
    genera,
    generation,
    growth_rate,
    habitat,
    has_gender_differences,
    hatch_counter,
    id,
    is_baby,
    is_legendary,
    is_mythical,
    name,
    names,
    order,
    pal_park_encounters,
    pokedex_numbers,
    shape,
    varieties,
  } = data
  const evolutionId =
    data.evolution_chain.url.match(evolutionIdRegex)[1] || null
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
  }
}
export const fetchPokemonSpeciesByName = (speciesName) => {
  return async (dispatch, getState) => {
    return dispatch(
      setPokemonSpecies({
        [speciesName]: await getPokemonSpeciesByName(speciesName),
      })
    )
  }
}

export const getPokemonFormByName = async (formName) => {
  return await client.getPokemonFormByName(formName)
}
export const fetchPokemonFormByName = (formName) => {
  return async (dispatch, getState) => {
    return dispatch(
      setPokemonDetails({ [formName]: await getPokemonFormByName(formName) })
    )
  }
}

export const getPokemonEvolutionById = async (evolutionId) => {
  const { chain } = await client.getEvolutionChainById(evolutionId)
  return chain
}
export const fetchPokemonEvolutionById = (evolutionId) => {
  return async (dispatch, getState) => {
    return dispatch(
      setPokemonEvolutions({
        [evolutionId]: await getPokemonEvolutionById(evolutionId),
      })
    )
  }
}
