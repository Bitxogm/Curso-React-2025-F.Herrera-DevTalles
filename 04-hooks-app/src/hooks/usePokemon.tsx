import { useEffect, useState } from "react";

interface PokemonInfo {
  name: string;
  id: number;
  imageUrl: string;
}

interface PokemonProps {
  id: number;
} 

const usePokemon = ({id} : PokemonProps) => {
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null );
  const [isLoading, setIsLoading] = useState(true)

  const getPokemonId = async (id: number) => {
    setIsLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    setPokemon({
      id: id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    });
    setIsLoading(false);
  }
  useEffect(() => {
    getPokemonId(id);
  }, [id]);
  return {
    // Props
    isLoading,
    pokemon,

    // Methods
    fomatteId: id.toString().padStart(3, '0'),
  }
  };
  export default usePokemon;



