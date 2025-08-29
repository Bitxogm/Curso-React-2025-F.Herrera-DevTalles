import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FirstStepsApp } from './FirstStepsApp';
// import MyAwesomeApp from './MyAwesomeApp';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirstStepsApp />
    {/* <MyAwesomeApp /> */}
    {/* <ItemCounter name='Nintendo'quantity={10}/>
    <ItemCounter name='Playstation' quantity={0}/>
    <ItemCounter name='Iphone'  quantity={5}/>
    <ItemCounter name='Others' quantity={1} /> */}

 
  </StrictMode>
);


