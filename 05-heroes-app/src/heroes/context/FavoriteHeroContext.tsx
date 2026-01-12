import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  //this.state.
  favorites: Hero[];
  favoriteCount: number;

  //methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favoriteHeroes = localStorage.getItem('favoriteHeroes');
  if (!favoriteHeroes) return [];
  return JSON.parse(favoriteHeroes) as Hero[];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find(fav => fav.id === hero.id);
    if (heroExist) {
      const newFavorites = favorites.filter(fav => fav.id !== hero.id);
      setFavorites(newFavorites);
      return
    }
    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    return favorites.some(fav => fav.id === hero.id);
  };

  const favoriteCount = favorites.length;

  useEffect(() => {
    localStorage.setItem('favoriteHeroes', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favorites: favorites,
        favoriteCount: favoriteCount,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  )
}






