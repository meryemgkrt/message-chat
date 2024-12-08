import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/İndexRouter'; // routes dosyasından router'ı import ediyoruz
import './index.css'; // Stil dosyanız varsa ekleyin
import {Provider} from 'react-redux'; // Redux provider'ı import ediyoruz
import  store from './redux/store';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
   
  </React.StrictMode>
);
