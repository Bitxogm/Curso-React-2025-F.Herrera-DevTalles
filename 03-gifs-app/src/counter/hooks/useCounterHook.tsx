import { useState } from "react";


const useCounter = ( initialValue: number = 5 ) => {
   

  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => {
    setCounter(counter + 1)
  };

  const handleSubstract = () => {
    setCounter((prevState) => prevState - 1)
  };

  const handleReset = () => {
    setCounter(initialValue)
  };

  return {
    // Properties
    counter,
    
    // Actions | Methods
    handleAdd,
    handleReset,
    handleSubstract,
  }

};

export default useCounter;
