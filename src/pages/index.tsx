import Search from '@/components/Search'
import { STRING } from '@/constants/string'
import React from 'react'
import PokeBallSVG from '@/assets/img/pokeball_bnw.svg'
import Link from 'next/link'
import { useBackgroundColour } from '@/utils/use-set-background-colour'

const menus = [
  {
    title: 'Pokedex',
    bg: 'bg-emerald-500',
    link: '/pokedex',
  },
  {
    title: 'Moves',
    bg: 'bg-red-400',
    link: '/moves',
  },
]
const Index = () => {
  useBackgroundColour('bg-white')
  return (
    <div className="flex w-full flex-col justify-center p-5">
      <div className="top-part flex flex-col gap-10">
        <span className="text-4xl font-bold text-gray-800">
          What {STRING.POKEMON} are you looking for?
        </span>
        <Search />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {menus.map(({ title, bg, link }, i) => (
          <Link
            key={i}
            href={link}
            className={`group relative flex h-32 w-full items-center overflow-hidden rounded-3xl p-4 text-lg shadow-xl duration-300 hover:shadow-white ${bg}`}
          >
            <span className="font-bold text-white/90">{title}</span>
            <img
              src={PokeBallSVG.src}
              className={
                'absolute bottom-[-5px] right-[-10px] h-44 opacity-20 contrast-[10] duration-300 group-hover:scale-110 md:h-32'
              }
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Index
