interface  Person {
  name: string;
  pet: string;
  age: number;
  address ?: Address;
}

interface Address {
  code: string;
  city: string;
}


const person: Person = {
  name: 'bitxo',
  pet: 'Obama',
  age: 66,
  address: {
    code: '123abd',
    city: 'Laredo',
  }
};

const otaku: Person = {
  name: "jeremy",
  pet: "lolo",
  age: 10
}

// Con operador rest , rompemos la referencia y le asignamos las props de person a newPerson , pero solo la prps de primer nivel , address es de segundo nivel y mantendria el valor en los dos objetos.

// const newPerson = {...person};

// Si queremos clonar todas las props usaremos structuredClone
// const newPerson = structuredClone(person);

console.log(person, otaku)

// newPerson.name = 'otaku';
// newPerson.pet = 'always Obama'
// newPerson.age = 55;
// newPerson.address.city = 'Bilbo'
// console.log(person, newPerson)