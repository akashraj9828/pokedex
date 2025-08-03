import { PokemonDetails, PokemonSpeciesPartial } from '@/reducers/pokemon.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Chain, NamedAPIResource, PokemonForm } from 'pokeapi-js-wrapper'

interface PokemonState {
  error: string
  pokemon_types: NamedAPIResource[]
  pokemon_list: NamedAPIResource[]
  pokemon_details: { [pokemon_name: string]: PokemonDetails | PokemonForm }
  pokemon_evolutions: { [pokemon_id: string]: Chain }
  pokemon_species: { [pokemon_name: string]: PokemonSpeciesPartial }
}

const initialState: PokemonState = {
  error: '',
  pokemon_types: [],
  pokemon_list: [],
  pokemon_details: {},
  pokemon_evolutions: {},
  pokemon_species: {},
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList: (
      state,
      action: PayloadAction<PokemonState['pokemon_list']>
    ) => {
      state.pokemon_list = action.payload
    },
    setPokemonTypes: (
      state,
      action: PayloadAction<PokemonState['pokemon_types']>
    ) => {
      state.pokemon_types = action.payload
    },
    setPokemonDetails: (
      state,
      action: PayloadAction<PokemonState['pokemon_details']>
    ) => {
      Object.assign(state.pokemon_details, action.payload)
    },
    setPokemonEvolutions: (
      state,
      action: PayloadAction<PokemonState['pokemon_evolutions']>
    ) => {
      Object.assign(state.pokemon_evolutions, action.payload)
    },
    setPokemonSpecies: (
      state,
      action: PayloadAction<PokemonState['pokemon_species']>
    ) => {
      Object.assign(state.pokemon_species, action.payload)
    },
  },
})

export const {
  setPokemonList,
  setPokemonTypes,
  setPokemonDetails,
  setPokemonEvolutions,
  setPokemonSpecies,
} = pokemonSlice.actions

export default pokemonSlice.reducer
