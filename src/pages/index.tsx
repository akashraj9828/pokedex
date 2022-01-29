import { useSelector } from 'react-redux'

export default function Home() {
  const pokemons = useSelector((state) => state.pokemon.pokemon_evolutions)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="flex text-3xl">Pokédex</p>
      <pre>{JSON.stringify(pokemons, null, 2)}</pre>
    </div>
  )
}
