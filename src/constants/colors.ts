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

// Base colors for Pokemon types (used in cards and backgrounds)
export const POKEMON_TYPE_COLORS: Record<PokemonType, string> = {
  normal: 'bg-neutral-400',
  fighting: 'bg-slate-400',
  flying: 'bg-zinc-300',
  poison: 'bg-fuchsia-600',
  ground: 'bg-amber-600',
  rock: 'bg-stone-500',
  bug: 'bg-emerald-500',
  ghost: 'bg-violet-600',
  steel: 'bg-slate-500',
  fire: 'bg-red-400',
  water: 'bg-sky-400',
  grass: 'bg-green-400',
  electric: 'bg-amber-300',
  psychic: 'bg-purple-500',
  ice: 'bg-blue-300',
  dragon: 'bg-rose-500',
  dark: 'bg-slate-700',
  fairy: 'bg-pink-400',
  unknown: 'bg-orange-300',
  shadow: 'bg-gray-600',
}

// Gradient colors for Pokemon type backgrounds (used in detail pages)
export const POKEMON_TYPE_GRADIENTS: Record<PokemonType, string> = {
  normal: 'from-neutral-400 to-neutral-500',
  fighting: 'from-slate-400 to-slate-600',
  flying: 'from-zinc-300 to-zinc-500',
  poison: 'from-fuchsia-600 to-fuchsia-900',
  ground: 'from-amber-600 to-amber-800',
  rock: 'from-stone-500 to-stone-700',
  bug: 'from-emerald-500 to-emerald-700',
  ghost: 'from-violet-600 to-violet-800',
  steel: 'from-slate-500 to-slate-700',
  fire: 'from-red-400 to-red-600',
  water: 'from-sky-400 to-sky-600',
  grass: 'from-green-400 to-green-600',
  electric: 'from-amber-300 to-amber-500',
  psychic: 'from-purple-500 to-purple-800',
  ice: 'from-blue-300 to-blue-500',
  dragon: 'from-rose-500 to-rose-700',
  dark: 'from-slate-700 to-slate-900',
  fairy: 'from-pink-400 to-pink-600',
  unknown: 'from-orange-300 to-orange-500',
  shadow: 'from-gray-600 to-gray-800',
}

// Legacy card colors (for backward compatibility with existing PokemonCard)
export const POKEMON_CARD_COLORS: Record<PokemonType, string> = {
  normal: 'bg-neutral-400',
  fighting: 'bg-slate-400',
  flying: 'bg-zinc-300',
  poison: 'bg-fuchsia-900', // Note: Different from TYPE_COLORS
  ground: 'bg-stone-500',
  rock: 'bg-stone-500',
  bug: 'bg-emerald-600', // Note: Different from TYPE_COLORS
  ghost: 'bg-violet-600',
  steel: 'bg-slate-500',
  fire: 'bg-red-400',
  water: 'bg-sky-500', // Note: Different from TYPE_COLORS
  grass: 'bg-green-500', // Note: Different from TYPE_COLORS
  electric: 'bg-amber-400', // Note: Different from TYPE_COLORS
  psychic: 'bg-purple-800', // Note: Different from TYPE_COLORS
  ice: 'bg-blue-400', // Note: Different from TYPE_COLORS
  dragon: 'bg-rose-500',
  dark: 'bg-slate-800', // Note: Different from TYPE_COLORS
  fairy: 'bg-pink-400',
  unknown: 'bg-orange-300',
  shadow: 'bg-gray-700', // Note: Different from TYPE_COLORS
}

// Stat colors for progress bars and indicators
export const STAT_COLORS: Record<StatType, string> = {
  hp: 'bg-green-500',
  attack: 'bg-red-500',
  defense: 'bg-blue-500',
  'special-attack': 'bg-purple-500',
  'special-defense': 'bg-yellow-500',
  speed: 'bg-pink-500',
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
  return STAT_COLORS[normalizedStat] || 'bg-gray-400'
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
