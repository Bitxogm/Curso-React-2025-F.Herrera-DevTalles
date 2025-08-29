import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

// const gifsCache: Record<string, Gif[]> = {};
const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>> ({})

  const handleTermClicked = async (term: string) => {
    if(gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs)
  }
  
  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;
    if (previousTerms.includes(query)) return;
    setPreviousTerms([query, ...previousTerms].splice(0, 7));

       // Añadimos logs para debuggear
    console.log('Cache actual:', Object.keys(gifsCache));
    console.log('Buscando término:', query);

    // Primero verfificamos si existe en el gifsCache
    if(gifsCache.current[query]) {
        console.log('✅ Usando caché para:', query);
      setGifs(gifsCache.current[query]);
      return
    }

    // Si no existe en el cache , hacemos la peticion
     console.log('❌ No está en caché, haciendo petición HTTP para:', query);
    const gifs = await getGifsByQuery(query);
    setGifs(gifs);

    // Grababmos en el gifsCache , los gifs que ya hemos pedido 
    gifsCache.current[query] = gifs;
    console.log('💾 Guardado en caché:', query);
  }

  return {
    // Properties 
    gifs,
    
    // Actions | Methods 
    handleSearch,
    handleTermClicked,
    previousTerms,
  };
}
export default useGifs;

  





  
    