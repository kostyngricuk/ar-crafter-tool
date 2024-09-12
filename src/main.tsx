import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import i18n from './configs/i18n.ts';
import Tool from './pages/tool/Tool.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <Tool />
    </I18nextProvider>
  </StrictMode>,
);
