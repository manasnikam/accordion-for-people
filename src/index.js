import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AccordianProvider } from './core/context/AccordionContext';

const elm = document.getElementById('root')
const root = ReactDOM.createRoot(elm);
root.render(
  <React.StrictMode>
    <AccordianProvider>
      <App />
    </AccordianProvider>
  </React.StrictMode>
)
