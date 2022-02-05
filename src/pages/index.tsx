import Search from '@/components/Search'
import { STRING } from '@/constants/string'
import React from 'react'

const Index = () => {
  return (
    <div className="flex justify-center w-full p-5">
      <div className="top-part d-flex">
        <span className="text-4xl font-bold">
          What {STRING.POKEMON} are you looking for?
        </span>
        <Search />
      </div>
    </div>
  )
}

export default Index
