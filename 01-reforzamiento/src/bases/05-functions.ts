interface User {
  uid : string;
  username: string
}


function greet(name: string): string  {
  return `Hola ${name} 😀 `
};

const message = greet('bitxo');
console.log(message)

const greet2 = (name: string): string =>  `Hola ${name} 😀 `


const message2 = greet2('obama');
console.log(message2);

function getUser (): User {
  return  {
    uid: 'ABC-3434',
    username: 'Jeremy'
  }
};

const user1 = getUser()
console.log(user1)

const user2  = (): User => {
  return {
    uid: 'RRF-3434',
    username: 'JOHN'
  }
};

// Simplificar la funcion si solotiene un return , envolvemos entre parentesis el return, se denomina return implicito
const getUser3 = ( ): User => ({
  uid : 'ttt-55',
  username: 'grgr'
});

const user3 = getUser3()
console.log(user2);
console.log(user3);

// Callback
const myNumbers: number[] = [1,2,3,4,5,]
myNumbers.forEach(function(value ) {
  console.log({ value })
});

myNumbers.forEach( (value) => {
  console.log({ value })
});
 