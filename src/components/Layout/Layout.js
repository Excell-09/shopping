import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import Router from './../../routes/Router';

const Layout = () => {
  return (
    <>
      <Header />
      <main className='bg-light pb-5'>
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
