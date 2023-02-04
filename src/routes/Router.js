import { Route, Routes } from 'react-router-dom';

// pages

import { Home, Cart, Checkout, Login, ProductDetails, Shop, SignUp } from './../pages';

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
          element={<Checkout />}
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
      </Route>
    </Routes>
  );
};

export default router;
