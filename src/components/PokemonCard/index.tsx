import Link from 'next/link'
import { useSelector } from 'react-redux'

const typesColorMap = {
  normal: 'bg-neutral-400',
  fighting: 'bg-slate-400',
  flying: 'bg-zinc-300',
  poison: 'bg-fuchsia-600',
  ground: 'bg-stone-500',
  rock: 'bg-stone-500',
  bug: 'bg-emerald-600',
  ghost: 'bg-violet-600',
  steel: 'bg-slate-500',
  fire: 'bg-red-400',
  water: 'bg-sky-400',
  grass: 'bg-green-500',
  electric: 'bg-amber-300',
  psychic: 'bg-purple-800',
  ice: 'bg-blue-300',
  dragon: 'bg-rose-500',
  dark: 'bg-slate-800',
  fairy: 'bg-pink-400',
  unknown: 'bg-orange-300',
  shadow: 'bg-gray-700',
}
const PokemonCard = ({ pokemonName }) => {
  const poke_detail = useSelector(
    (state) => state.pokemon.pokemon_details[pokemonName]
  )
  const {
    loading,
    name,
    id,
    weight,
    height,
    // forms,
    stats,
    types,
  } = poke_detail
  const pokemon_type = types?.[0]?.type?.name || 'default'
  const image = `https://assets.poketwo.net/images/${id}.png`
  return (
    <div
      className={`m-1 flex w-[20rem] min-w-max rounded-2xl border-0 ${typesColorMap[pokemon_type]} p-6`}
    >
      {loading ? (
        <span className="flex">Loading...</span>
      ) : (
        <Link href={`/pokemon/${name}`}>
          <a className="relative flex w-full cursor-pointer">
            <div className="flex flex-col w-1/2 tracking-wider capitalize">
              <span className="mb-2 text-xl font-bold text-white/60">
                {name.split('-').join(' ')}
              </span>
              {types.map((e) => (
                <span className="px-3 py-1 my-1 font-semibold capitalize w-min rounded-2xl bg-white/20 text-white/40">
                  {e.type.name.split('-').join(' ')}
                </span>
              ))}
            </div>
            <span className="absolute top-0 right-0 text-4xl opacity-40">
              #{id}
            </span>
            <img src={image} className="z-10 w-40 h-40" />
          </a>
        </Link>
      )}
    </div>
  )
}
export default PokemonCard
