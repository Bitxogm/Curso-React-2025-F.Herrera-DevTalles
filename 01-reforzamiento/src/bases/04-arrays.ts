
const myArray: number[]= [1, 2, 3, 4, 5, 6];

// Lo pasa por referencia y al hacer el push añade el 7 alos dos arrays
const myArray2 = myArray;
// Para evitar esto , lo metemos entre llaves[] y usamos el operador rest ...
const myArray3 = [...myArray ]
myArray2.push(7)
myArray3.push(8, 9)
console.log({ myArray, myArray2, myArray3 });

// operador rest 
const [first, second, ...rest]: number[] = [1,2,3,4,5];
console.log(first, second, rest)
