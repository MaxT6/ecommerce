import React from 'react';
import Head from 'next/head'; // Head element that appears above the body that provides meta data for the website

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>MT Tech Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout