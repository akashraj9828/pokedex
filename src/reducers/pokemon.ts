import { RootEvolution } from '@/types/evolution_type'
import { RootPokemon } from '@/types/pokemon_type'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const actions = {
  SET_POKEMON_LIST: 'SET_POKEMON_LIST',
  SET_POKEMON_TYPES: 'SET_POKEMON_TYPES',
  SET_POKEMON_DETAILS: 'SET_POKEMON_DETAILS',
  SET_POKEMON_EVOLUTIONS: 'SET_POKEMON_EVOLUTIONS',
  SET_POKEMON_SPECIES: 'SET_POKEMON_SPECIES',
}
const defaultState = {
  error: '',
  pokemon_types: [] as { name: string; url: string }[],
  pokemon_list: [] as { name: string; url: string }[],
  pokemon_details: {} as { [pokemon_name: string]: RootPokemon },
  pokemon_evolutions: {} as { [pokemon_id: string]: RootEvolution },
  pokemon_species: {} as { [pokemon_name: string]: RootEvolution },
}

export default function pokemon(
  state = defaultState,
  action
): typeof defaultState {
  const { type, payload } = action

  switch (type) {
    case actions.SET_POKEMON_LIST:
      return {
        ...state,
        pokemon_list: payload,
      }
    case actions.SET_POKEMON_TYPES:
      return {
        ...state,
        pokemon_types: payload,
      }
    case actions.SET_POKEMON_DETAILS:
      return {
        ...state,
        pokemon_details: { ...state.pokemon_details, ...payload },
      }
    case actions.SET_POKEMON_EVOLUTIONS:
      return {
        ...state,
        pokemon_evolutions: { ...state.pokemon_evolutions, ...payload },
      }
    case actions.SET_POKEMON_SPECIES:
      return {
        ...state,
        pokemon_species: { ...state.pokemon_species, ...payload },
      }
    default:
      return state
  }
}

export function useConfig(config, retainOnUnmount = false) {
  const { key, value } = config
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'SET_CONFIG_VALUE', payload: config })
    return () => {
      dispatch({ type: 'RESET_CONFIG_VALUE', payload: { key } })
    }
  }, [config])

  useEffect(() => {
    return () => {
      if (!retainOnUnmount) {
        dispatch({ type: 'RESET_CONFIG_VALUE', payload: { key } })
      }
    }
  }, [retainOnUnmount])
}
