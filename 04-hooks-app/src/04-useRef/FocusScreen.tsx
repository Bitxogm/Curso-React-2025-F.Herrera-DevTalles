import { useRef } from "react";

const FocusScreen = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    console.log(inputRef.current?.value);
    inputRef.current?.select();
  }
  
return (
  <div className="bg-gradient flex flex-col gap-4">
    <h1 className="text-2xl font-thin text-white">FocusScreen</h1>
    <input type="text" 
    ref={inputRef}
      className="bg-gray-500 text-white px-4 py-2 rounded-md"
      autoFocus
    />
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-md cursor:pointer"
      onClick={handleClick}
    
    >SetFocus</button>


  </div>
)

 
}

export default FocusScreen;
