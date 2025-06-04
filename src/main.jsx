import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FavoriteFoodOne, FavoriteFoodTwo } from './Food.jsx';
import { Application } from './Learn.jsx';
import StartReacting from './Greeting.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <StartReacting />
    <Application />
    <FavoriteFoodOne />
    <FavoriteFoodTwo />
  </StrictMode>,
);