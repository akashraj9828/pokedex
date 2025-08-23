import { PokemonSpecies, PokemonType, StatElement } from 'pokeapi-js-wrapper'

export type PokemonDetails = {
  loading: boolean
  id: number
  name: string
  weight: number
  height: number
  stats: StatElement[]
  types: PokemonType[]
  images: {
    front: string[]
    back: string[]
  }
}

export type PokemonSpeciesPartial = Pick<
  PokemonSpecies,
  | 'evolutionId'
  | 'name'
  | 'is_baby'
  | 'is_legendary'
  | 'is_mythical'
  | 'has_gender_differences'
  | 'forms_switchable'
  | 'base_happiness'
  | 'capture_rate'
  | 'varieties'
  | 'names'
> & { evolutionId: string | null }
