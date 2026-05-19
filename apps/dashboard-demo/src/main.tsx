import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import formbricks from '@formbricks/js';
import { App } from './App';

formbricks.setup({
  environmentId: import.meta.env.VITE_FORMBRICKS_ENV_ID,
  appUrl: 'https://app.formbricks.com',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
