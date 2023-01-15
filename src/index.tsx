import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import App from './App';
import { CartProvider } from './contexts/CartContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // @ts-ignore
  <CartProvider>
    <App />
  </CartProvider>
);
