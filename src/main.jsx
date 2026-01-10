import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router';
// import { routes } from './routes';

// import './App.css';

// const router = createBrowserRouter(routes);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>,
// );

import { Button, ButtonTwo } from './Styling React Applications/Button';
import { App } from './Styling React Applications/styledComponents';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Button />
    <ButtonTwo label='Primary'/>
    <ButtonTwo type='secondary' label='Secondary' />
    <App />
  </StrictMode>
);