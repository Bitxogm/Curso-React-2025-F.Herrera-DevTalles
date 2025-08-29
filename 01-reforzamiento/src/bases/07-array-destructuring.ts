
const characterNames: string[] = ['goku',  'vegeta', 'freezeer'];
const  [pos0, pos1] = characterNames;
// console.log({  pos0, pos1 });

// Si  solo  queremos a  vegeta usamos la coma , para indicar  la posicion vacia , , si  pones solo numero , da  error   
const [, , p2 ]= characterNames;
// console.log( { p2});

// Para definir que  el arreeglo siempre va  aser  un string y number despeus o sea no cambiara usa mos const
const returnsArrayfn  = ()   => {
  return ['abc', 123 ] as  const;
};
const [letters, numbers ] =returnsArrayfn();
// console.log(numbers + 100)
// console.log(letters.toUpperCase())



const useState  = (name: string) => {
   const setName  =  (alias: string) => {
    console.log(alias)
  };
  return [name, setName]  as const;
}
const [name, funcSetName] = useState('Goku');
console.log(name);
funcSetName('Vegeta');


// Con funcion  anonima
const useState1 = (value: string) => {
  return [ value , (newValue  :string)  => {
    console.log(newValue)
  }] as const;
  };
  const [value , setName1]   = useState1('obama');
  console.log(value);
  setName1('blackStar')








