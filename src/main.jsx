import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Profile from './React Router/router refresher/Profile';
import Spinach from './React Router/router refresher/Spinach';
import Popeye from './React Router/router refresher/Popeye';
import DefaultProfile from './React Router/router refresher/DefaultProfile';

import './App.css';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "profile",
      element: <Profile />,
      children: [
        { index: true, element: <DefaultProfile /> },
        { path: "spinach", element: <Spinach /> },
        { path: "popeye", element: <Popeye />},
      ]
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
);