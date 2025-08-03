import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PokemonState {
  error: string
  pokemon_types: { name: string; url: string }[]
  pokemon_list: { name: string; url: string }[]
  pokemon_details: { [pokemon_name: string]: any }
  pokemon_evolutions: { [pokemon_id: string]: any }
  pokemon_species: { [pokemon_name: string]: any }
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
      action: PayloadAction<{ name: string; url: string }[]>
    ) => {
      state.pokemon_list = action.payload
    },
    setPokemonTypes: (
      state,
      action: PayloadAction<{ name: string; url: string }[]>
    ) => {
      state.pokemon_types = action.payload
    },
    setPokemonDetails: (
      state,
      action: PayloadAction<{ [pokemon_name: string]: any }>
    ) => {
      Object.assign(state.pokemon_details, action.payload)
    },
    setPokemonEvolutions: (
      state,
      action: PayloadAction<{ [pokemon_id: string]: any }>
    ) => {
      Object.assign(state.pokemon_evolutions, action.payload)
    },
    setPokemonSpecies: (
      state,
      action: PayloadAction<{ [pokemon_name: string]: any }>
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
