import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import formbricks from '@formbricks/js';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { App } from './App';

// Formbricks
formbricks.setup({
  environmentId: import.meta.env.VITE_FORMBRICKS_ENV_ID,
  appUrl: 'https://app.formbricks.com',
});

// PostHog — Analytics, Session Recording, Feature Flags, Heatmaps
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com',
  capture_pageview: true,
  capture_pageleave: true,
  session_recording: { maskAllInputs: false },
  autocapture: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>,
);
