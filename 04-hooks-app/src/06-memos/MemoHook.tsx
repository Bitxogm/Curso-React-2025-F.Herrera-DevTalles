import { useCallback, useState } from "react"
import { MyTitle } from "./ui/MyTitle"
import { MySubTitle } from "./ui/MySubTitle"

export const MemoHook = () => {
const [title, setTitle] = useState('Hola');
const [subTitle, setSubTitle] = useState('Otaku');

//useCallback hook para memorizar funciones y ocupa arreglo de dependencias , como argumento , igual que useEffect.
//En la verrsion superior a 19.2, el compilador ya deebe hacer esto por nosotros y no necesitamos meorizar nada
const handleMyApiCall = useCallback( () => {
  console.log('Llamar a la API :', subTitle);
},[subTitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4" >
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>
      
    <MyTitle title={ title}/>
    <MySubTitle subtitle={ subTitle} callMyAPI={handleMyApiCall}/>


      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={ () => setTitle (`👋🏼 Hola la hora de ahora es :  ${new Date().toLocaleTimeString()}`)}
      >
        Cambiar Titulo
      </button>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={ () => setSubTitle ( ` 👐🏻 Byeeeeee!!!! `)}
      >
        Cambiar Subtitulo
        </button>
    </div>

    
  )
}
