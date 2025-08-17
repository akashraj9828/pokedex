import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPokemonCardColor } from '@/constants/colors'

const PokemonCard = ({ pokemonName }) => {
  const poke_detail = useSelector(
    (state) => state.pokemon.pokemon_details[pokemonName]
  )

  // Add null check before destructuring
  if (!poke_detail) {
    return (
      <div
        className={`group relative m-1 flex h-[13rem] w-[20rem] cursor-pointer select-none rounded-2xl border-0 ${getPokemonCardColor(
          'normal'
        )} p-6`}
      >
        <div className="flex w-full items-center justify-center">
          <span className="text-xl font-bold text-white/80">Loading...</span>
        </div>
      </div>
    )
  }

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
  const pokemon_type = types?.[0]?.type?.name || 'normal'
  //   const image = `https://assets.poketwo.net/images/${id}.png`
  const [currentImage, setCurrentImage] = useState(0)
  const [hovering, setHovering] = useState(false)
  const nextImage = () => {
    const max = all_images.length
    setCurrentImage((s) => {
      if (s + 1 > max - 1) {
        return 0
      } else {
        return s + 1
      }
    })
  }
  useEffect(() => {
    if (hovering) {
      nextImage()
    }
    const handle = hovering ? setInterval(nextImage, 1000) : null
    return () => {
      if (handle) {
        clearInterval(handle)
      }
    }
  }, [hovering])

  return (
    <Link
      href={`/pokemon/${name}`}
      draggable={false}
      className={`group relative m-1 flex h-[13rem] w-[20rem] cursor-pointer select-none rounded-2xl border-0 ${getPokemonCardColor(
        pokemon_type
      )} p-6`}
    >
      <div
        style={{
          backgroundImage: `url(${all_images?.[0]})`,
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
      <div className="group relative flex w-full">
        <div className="flex w-1/2 flex-col capitalize tracking-wider">
          <span className="mb-2 text-xl font-bold text-white/80 duration-200 group-hover:text-white/90">
            {loading ? 'Loading...' : name.split('-').join(' ')}
          </span>
          {(types || []).map((e) => (
            <span className="my-1 w-min rounded-2xl bg-white/20 px-3 py-1 font-semibold capitalize text-white/60 duration-200 group-hover:bg-white/40 group-hover:text-white/80">
              {e.type.name.split('-').join(' ')}
            </span>
          ))}
        </div>
        <span className="absolute right-0 top-0 font-mono text-5xl text-white opacity-30">
          #{loading ? '??' : id}
        </span>
        {all_images[currentImage] && (
          <img
            draggable={false}
            src={all_images[currentImage]}
            className="z-10 h-40 w-40 duration-200 group-hover:scale-110"
          />
        )}
      </div>
    </Link>
  )
}
export default PokemonCard
