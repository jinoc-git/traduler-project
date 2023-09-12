import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>,
);

serviceWorkerRegistration.register();

reportWebVitals();
