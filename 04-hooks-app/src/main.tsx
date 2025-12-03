import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Toaster } from 'sonner';

// import HooksApp from './HooksApp';
// import { TrafficLight } from './01useState/TrafficLight';
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect';
// import { TrafficLightCustomHook } from './02-useEffect/TrafficLightCustomHook';
// import { PokemonPage } from './03-examples/PokemonPage';
// import FocusScreen from './04-useRef/FocusScreen';
// import { TasksApp } from './05-useReducer/TaskApp';
// import { ScrambleWords } from './05-useReducer/ScrambleWords';
// import { MemoHook } from './06-memos/MemoHook';
// import { MemoCounter } from './06-memos/MemoCounter';
// import { InstagromApp } from './07-useOptimistic/InstagromApp';

import './index.css';
import { ClientInformation } from './08-use-suspense/ClientInformation';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect/> */}
    {/* <TrafficLightCustomHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <MemoHook /> */}
    {/* < MemoCounter /> */}
    {/* < InstagromApp /> */}
    <Suspense fallback={
      <div className="bg-gradient  flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    }>
      <ClientInformation />
    </Suspense>

  </StrictMode>
);
