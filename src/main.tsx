import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';

import i18n from './configs/i18n.ts';
import router from './routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </StrictMode>,
);
