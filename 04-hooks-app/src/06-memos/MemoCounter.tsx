import useCounter from '@/hooks/useCounter';
import { useMemo } from 'react';

const heavyStuff = (iterationNumber: number) => {
  console.time('Heavy stuff satrted'); 

  for (let i = 0; i < iterationNumber; i++) {
    console.time('Ahi vamos');
  }
  console.timeEnd('Heavy_stuff_satrted'); 
  return `${iterationNumber} iteraciones realizadas`;
}

export const MemoCounter = () => {

  const { counter, increment } = useCounter(40);
  const { counter: counter2, increment: increment2 } = useCounter(50);
const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]); // heavyStuff(counter); UseMemo memoriza el valor de heavyStuff y se lo pasa a myHeavyValue 


  return (
    <div className='bg-gradient flex flex-col gap-4' >
      <h1>Memo - useMEmo - {myHeavyValue}</h1>
      <hr />

      <h4>Counter : {counter} </h4>
      <h4>Counter2 : {counter2 + 1} </h4>
      <button className='bg-amber-300 text-white px-4 py-2 rounded-md cursor-pointer'  onClick={increment}>+1</button>
      <button className='bg-amber-300 text-white px-4 py-2 rounded-md cursor-pointer'  onClick={increment2}>+1- Counter2</button>
    </div>
  )
}
