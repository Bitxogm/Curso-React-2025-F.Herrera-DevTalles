interface Person {
  name: string;
  age: number;
  key: string
}

interface Hero {
  name: string;
  age: number;
  key: string;
  rank?: string;
}


const person: Person = {
  name: 'kaka',
  age: 54,
  key: 'carpedo',
};

const { age, key, name } = person;
console.log({ name, age, key })
console.log({ ...person })

const useContext = ({ key, name, age, rank }: Hero) => {
  return {
    keyName: key,
    user: { name, age },
    rank: rank
  };
};

const { rank, keyName, ...user } = useContext(person);

console.log({ rank, keyName, user });




