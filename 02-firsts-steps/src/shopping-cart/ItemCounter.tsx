import { useState } from "react";



import  './ItemCounter.css';


export interface Props {
  name: string,
  quantity?: number,
}

const ItemCounter = ({ name, quantity = 1 }: Props) => {

  const [counter, setCounter] = useState(quantity);

  const handleAdd = () => {
    setCounter(counter + 1)
  }

  const handleSubstract = () => {
    if(counter === 1) return;
    setCounter(counter -1 )
  }

  return (
    <section className="sSection">
      <h2>{name}</h2>
      <button className="sButtonAdd"
        onClick={handleAdd}>+1</button>
      <span className="textItem">{counter}</span>
      <button  className="sButtonSubstarct"
      onClick={handleSubstract}>-1</button>
    </section>
  )
}
export default ItemCounter;








