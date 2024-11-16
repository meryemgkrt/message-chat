import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/İndexRouter'; // routes dosyasından router'ı import ediyoruz
import './index.css'; // Stil dosyanız varsa ekleyin

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
