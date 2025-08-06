// Pokemon Type Colors and Styling Constants

export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow'

export type StatType =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed'

// Base colors for Pokemon types (dark shades for white/grey text)
export const POKEMON_TYPE_COLORS: Record<PokemonType, string> = {
  normal: 'bg-neutral-800',
  fighting: 'bg-red-900',
  flying: 'bg-blue-900',
  poison: 'bg-fuchsia-900',
  ground: 'bg-yellow-900',
  rock: 'bg-stone-800',
  bug: 'bg-lime-900',
  ghost: 'bg-violet-900',
  steel: 'bg-slate-800',
  fire: 'bg-orange-900',
  water: 'bg-sky-900',
  grass: 'bg-green-900',
  electric: 'bg-amber-900',
  psychic: 'bg-purple-900',
  ice: 'bg-cyan-900',
  dragon: 'bg-indigo-900',
  dark: 'bg-gray-900',
  fairy: 'bg-pink-900',
  unknown: 'bg-zinc-800',
  shadow: 'bg-gray-800',
}

// Gradient colors for Pokemon type backgrounds (dark shades)
export const POKEMON_TYPE_GRADIENTS: Record<PokemonType, string> = {
  normal: 'from-neutral-800 to-neutral-900',
  fighting: 'from-red-900 to-red-800',
  flying: 'from-blue-900 to-blue-800',
  poison: 'from-fuchsia-900 to-fuchsia-800',
  ground: 'from-yellow-900 to-yellow-800',
  rock: 'from-stone-800 to-stone-900',
  bug: 'from-lime-900 to-lime-800',
  ghost: 'from-violet-900 to-violet-800',
  steel: 'from-slate-800 to-slate-900',
  fire: 'from-orange-900 to-orange-800',
  water: 'from-sky-900 to-sky-800',
  grass: 'from-green-900 to-green-800',
  electric: 'from-amber-900 to-amber-800',
  psychic: 'from-purple-900 to-purple-800',
  ice: 'from-cyan-900 to-cyan-800',
  dragon: 'from-indigo-900 to-indigo-800',
  dark: 'from-gray-900 to-gray-800',
  fairy: 'from-pink-900 to-pink-800',
  unknown: 'from-zinc-800 to-zinc-900',
  shadow: 'from-gray-800 to-gray-900',
}

// Legacy card colors (dark shades)
export const POKEMON_CARD_COLORS: Record<PokemonType, string> = {
  normal: 'bg-neutral-800',
  fighting: 'bg-red-900',
  flying: 'bg-blue-900',
  poison: 'bg-fuchsia-900',
  ground: 'bg-yellow-900',
  rock: 'bg-stone-800',
  bug: 'bg-lime-900',
  ghost: 'bg-violet-900',
  steel: 'bg-slate-800',
  fire: 'bg-orange-900',
  water: 'bg-sky-900',
  grass: 'bg-green-900',
  electric: 'bg-amber-900',
  psychic: 'bg-purple-900',
  ice: 'bg-cyan-900',
  dragon: 'bg-indigo-900',
  dark: 'bg-gray-900',
  fairy: 'bg-pink-900',
  unknown: 'bg-zinc-800',
  shadow: 'bg-gray-800',
}

// Stat colors for progress bars and indicators (dark, high-contrast for white text)
export const STAT_COLORS: Record<StatType, string> = {
  hp: 'bg-green-900',
  attack: 'bg-red-900',
  defense: 'bg-blue-900',
  'special-attack': 'bg-purple-900',
  'special-defense': 'bg-yellow-900',
  speed: 'bg-pink-900',
}

// Helper Functions

export const getPokemonTypeColor = (type: string): string => {
  const normalizedType = type.toLowerCase() as PokemonType
  return POKEMON_TYPE_COLORS[normalizedType] || POKEMON_TYPE_COLORS.normal
}

export const getPokemonTypeGradient = (type: string): string => {
  const normalizedType = type.toLowerCase() as PokemonType
  return POKEMON_TYPE_GRADIENTS[normalizedType] || POKEMON_TYPE_GRADIENTS.normal
}

export const getPokemonCardColor = (type: string): string => {
  const normalizedType = type.toLowerCase() as PokemonType
  return POKEMON_CARD_COLORS[normalizedType] || POKEMON_CARD_COLORS.normal
}

export const getStatColor = (stat: string): string => {
  const normalizedStat = stat.toLowerCase() as StatType
  return STAT_COLORS[normalizedStat] || 'bg-gray-800'
}

export const getPokemonTypeColors = (
  types: Array<{ type: { name: string } }>
): string[] => {
  return types.map((typeObj) => getPokemonTypeColor(typeObj.type.name))
}

export const getPrimaryTypeColor = (
  types: Array<{ type: { name: string } }>
): string => {
  if (!types || types.length === 0) return getPokemonTypeColor('normal')
  return getPokemonTypeColor(types[0].type.name)
}

export const getPrimaryTypeGradient = (
  types: Array<{ type: { name: string } }>
): string => {
  if (!types || types.length === 0) return getPokemonTypeGradient('normal')
  return getPokemonTypeGradient(types[0].type.name)
}
