import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Shopping } from './routes';
import { OrderProvider } from './containers';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="shopping"
          element={
            <OrderProvider>
              <Shopping />
            </OrderProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
