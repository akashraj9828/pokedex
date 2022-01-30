import { fetchPokemonByName } from '@/helpers/pokedex_api'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const PokemonDetail = () => {
  const {
    query: { name },
  } = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    name && dispatch(fetchPokemonByName(name))
  }, [name])
  const one_pokemon = useSelector(
    (state) => state.pokemon.pokemon_details[name as string]
  )
  return (
    <div className="flex">
      {name}
      <pre>{JSON.stringify(one_pokemon, null, 2)}</pre>
    </div>
  )
}

export default PokemonDetail
