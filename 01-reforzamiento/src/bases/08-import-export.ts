import { heroes, type Hero, Owner } from '../data/heroes.data';

// Podemos renombrar la exportacion y evitar conflictos
// import { heroes  as newSuperHeroes } from "../data/heroes.data";



const getHeroById = (id : number): Hero | undefined => {
  // newSuperHeroes
  const getHero= heroes.find( (hero)  => {
    return hero.id ===  id
  });

  return getHero;
}
const firstHero = getHeroById(11);
console.log(firstHero);


 export const getHeroesByOwner = ( owner : Owner ) : Hero[]  => {
  const getOwner = heroes.filter(
    hero => hero.owner === owner
   ) 

  
  return getOwner;
}

