export interface Hero {
  id: number;
  name: string;
  owner: Owner,
}

// type Owner = 'DC' | 'Marvel';

// Si usamos enum ,  cada valor tiene  una posicion y al definir el objeto le indicamos  Owner. y nos da opcion de elegir entre  los dos
export  enum Owner {
  DC = 'DC', // 0
  MARVEL = 'MARVEL' // 1
}

export const heroes : Hero[] = [
  {
    id: 1,
    name: 'Batman',
    owner: Owner.DC,
  },
  {
    id: 2,
    name: 'Spiderman',
    // owner: 'Marvel',
    owner: Owner.MARVEL,
  },
  {
    id: 3,
    name: 'Superman',
    // owner: 'DC',
    owner:  Owner.DC,
  },
  {
    id: 4,
    name: 'Flash',
    // owner: 'DC',
    owner:  Owner.DC,
  },
  {
    id: 5,
    name: 'Wolverine',
    // owner: 'Marvel',
    owner: Owner.MARVEL,
  },
  {
    id: 6,
    name: 'BlackStar',
    // owner: 'DC'
    owner: Owner.DC,
  }
];

// export default heroes;