import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import App from './app.tsx';
import i18n from './configs/i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <App />
    </I18nextProvider>
  </StrictMode>,
);
