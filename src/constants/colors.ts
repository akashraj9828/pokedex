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

// Base colors for Pokemon types (lighter medium shades for white/grey text)
export const POKEMON_TYPE_COLORS: Record<PokemonType, string> = {
  normal: 'bg-neutral-600',
  fighting: 'bg-red-700',
  flying: 'bg-blue-700',
  poison: 'bg-fuchsia-700',
  ground: 'bg-yellow-700',
  rock: 'bg-stone-600',
  bug: 'bg-lime-700',
  ghost: 'bg-violet-700',
  steel: 'bg-slate-600',
  fire: 'bg-orange-700',
  water: 'bg-sky-700',
  grass: 'bg-green-700',
  electric: 'bg-amber-700',
  psychic: 'bg-purple-700',
  ice: 'bg-cyan-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  fairy: 'bg-pink-700',
  unknown: 'bg-zinc-600',
  shadow: 'bg-gray-600',
}

// Gradient colors for Pokemon type backgrounds (lighter medium shades)
export const POKEMON_TYPE_GRADIENTS: Record<PokemonType, string> = {
  normal: 'from-neutral-600 to-neutral-700',
  fighting: 'from-red-700 to-red-600',
  flying: 'from-blue-700 to-blue-600',
  poison: 'from-fuchsia-700 to-fuchsia-600',
  ground: 'from-yellow-700 to-yellow-600',
  rock: 'from-stone-600 to-stone-700',
  bug: 'from-lime-700 to-lime-600',
  ghost: 'from-violet-700 to-violet-600',
  steel: 'from-slate-600 to-slate-700',
  fire: 'from-orange-700 to-orange-600',
  water: 'from-sky-700 to-sky-600',
  grass: 'from-green-700 to-green-600',
  electric: 'from-amber-700 to-amber-600',
  psychic: 'from-purple-700 to-purple-600',
  ice: 'from-cyan-700 to-cyan-600',
  dragon: 'from-indigo-700 to-indigo-600',
  dark: 'from-gray-700 to-gray-600',
  fairy: 'from-pink-700 to-pink-600',
  unknown: 'from-zinc-600 to-zinc-700',
  shadow: 'from-gray-600 to-gray-700',
}

// Legacy card colors (lighter medium shades)
export const POKEMON_CARD_COLORS: Record<PokemonType, string> = {
  normal: 'bg-neutral-600',
  fighting: 'bg-red-700',
  flying: 'bg-blue-700',
  poison: 'bg-fuchsia-700',
  ground: 'bg-yellow-700',
  rock: 'bg-stone-600',
  bug: 'bg-lime-700',
  ghost: 'bg-violet-700',
  steel: 'bg-slate-600',
  fire: 'bg-orange-700',
  water: 'bg-sky-700',
  grass: 'bg-green-700',
  electric: 'bg-amber-700',
  psychic: 'bg-purple-700',
  ice: 'bg-cyan-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  fairy: 'bg-pink-700',
  unknown: 'bg-zinc-600',
  shadow: 'bg-gray-600',
}

// Stat colors for progress bars and indicators (lighter medium, high-contrast for white text)
export const STAT_COLORS: Record<StatType, string> = {
  hp: 'bg-green-700',
  attack: 'bg-red-700',
  defense: 'bg-blue-700',
  'special-attack': 'bg-purple-700',
  'special-defense': 'bg-yellow-700',
  speed: 'bg-pink-700',
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
