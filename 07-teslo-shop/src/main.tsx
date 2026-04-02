import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { TesloShopApp } from './assets/TesloShopApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TesloShopApp />
  </StrictMode>
)
