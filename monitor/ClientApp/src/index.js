import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'macro-css';
import Applications from './Applications';
import { BrowserRouter } from 'react-router-dom';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
        <Applications />
    </React.StrictMode>
  </BrowserRouter>
);