const firstName: string = 'Otaku';

// Si lleva caracteres especiales ,,usamos comilla doble , si no  comilla simple
const petName: string = "O'bama";

console.log(`I'am ${firstName} and my pet is ${petName}`);

const fullName: string = `
  The name is :
  ${firstName}
  and the best friend is
  ${petName}
  `
console.log(fullName)