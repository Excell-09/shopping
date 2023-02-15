import { Route, Routes } from 'react-router-dom';

// pages

import { Home, Cart, Checkout, Login, ProductDetails, Shop, SignUp } from './../pages';
import ProtectRoute from './ProtectRoute';

const router = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route
          index
          element={<Home />}
        />
        <Route
          path='cart'
          element={<Cart />}
        />
        <Route
          path='checkout'
          element={
            <ProtectRoute>
              <Checkout />
            </ProtectRoute>
          }
        />
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='shop/:id'
          element={<ProductDetails />}
        />
        <Route
          path='shop'
          element={<Shop />}
        />
        <Route
          path='signup'
          element={<SignUp />}
        />
        <Route
          path='payment'
          element={<Payment />}
        />
      </Route>
    </Routes>
  );
};

export default router;
