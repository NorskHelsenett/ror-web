import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'primereact/resources/themes/lara-dark-teal/theme.css';
import './index.css';

import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
