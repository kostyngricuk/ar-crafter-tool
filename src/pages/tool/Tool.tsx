import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Tool() {
  const [count, setCount] = useState(0);

  const { t } = useTranslation();

  return (
    <>
      <h1>{t('title')}</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default Tool;
