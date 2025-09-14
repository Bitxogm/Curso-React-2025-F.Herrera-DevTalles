import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import HooksApp from './HooksApp';
// import { TrafficLight } from './01useState/TrafficLight';
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect';
// import { TrafficLightCustomHook } from './02-useEffect/TrafficLightCustomHook';
// import { PokemonPage } from './03-examples/PokemonPage';
import './index.css';
import FocusScreen from './04-useRef/FocusScreen';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect/> */}
    {/* <TrafficLightCustomHook /> */}
    {/* <PokemonPage /> */}
    <FocusScreen />
  </StrictMode>
);
