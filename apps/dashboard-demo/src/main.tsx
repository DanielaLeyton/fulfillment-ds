import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import formbricks from '@formbricks/js';
import { App } from './App';

formbricks.setup({
  environmentId: 'cmpcvgl065sd6wo01fka92ucr', // reemplazar con el ID de tu proyecto en app.formbricks.com
  appUrl: 'https://app.formbricks.com',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
