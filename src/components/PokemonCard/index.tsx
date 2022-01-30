import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const typesColorMap = {
  normal: 'bg-neutral-400',
  fighting: 'bg-slate-400',
  flying: 'bg-zinc-300',
  poison: 'bg-fuchsia-900',
  ground: 'bg-stone-500',
  rock: 'bg-stone-500',
  bug: 'bg-emerald-600',
  ghost: 'bg-violet-600',
  steel: 'bg-slate-500',
  fire: 'bg-red-400',
  water: 'bg-sky-500',
  grass: 'bg-green-500',
  electric: 'bg-amber-400',
  psychic: 'bg-purple-800',
  ice: 'bg-blue-400',
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
    images,
  } = poke_detail

  const all_images = [...(images?.front || []), ...(images?.back || [])]
  const pokemon_type = types?.[0]?.type?.name || 'default'
  //   const image = `https://assets.poketwo.net/images/${id}.png`
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <Link href={`/pokemon/${name}`}>
      <a
        style={{}}
        className={`relative m-1 flex h-[13rem] w-[20rem] cursor-pointer rounded-2xl  border-0 ${typesColorMap[pokemon_type]} p-6`}
      >
        <div
          style={{
            backgroundImage: `url(${all_images[0] || all_images[0]})`,
            backgroundPositionY: 'center',
            backgroundSize: 'cover',
            backgroundOrigin: 'border-box',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0% 0%',
            display: 'block',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0.05,
            filter: 'brightness(0) invert(0)',
            // transform: 'rotateY(180deg)',
          }}
        />
        {loading ? (
          <span className="flex">Loading...</span>
        ) : (
          <div className="relative flex w-full">
            <div className="flex flex-col w-1/2 tracking-wider capitalize">
              <span className="mb-2 text-xl font-bold text-white/60">
                {name.split('-').join(' ')}
              </span>
              {types.map((e) => (
                <span className="px-3 py-1 my-1 font-semibold capitalize w-min rounded-2xl bg-white/20 text-white/60">
                  {e.type.name.split('-').join(' ')}
                </span>
              ))}
            </div>
            <span className="absolute top-0 right-0 font-mono text-5xl opacity-30">
              #{id}
            </span>
            <img
              src={all_images[currentImage]}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const next = currentImage + 1
                if (next > all_images.length - 1) {
                  setCurrentImage(0)
                } else {
                  setCurrentImage(next)
                }
              }}
              className="z-10 w-40 h-40"
            />
          </div>
        )}
      </a>
    </Link>
  )
}
export default PokemonCard
