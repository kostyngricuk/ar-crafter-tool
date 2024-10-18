import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from 'src/pages/ErrorPage';
import UploadPage from 'src/pages/UploadPage';

import Root from './root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <UploadPage />,
      },
    ],
  },
]);

export default router;
