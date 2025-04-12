import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import News from './components/News';
import Products from './components/Products';
import Information from './components/Information';
import Footer from './components/Footer';
import ChatBox from './components/ChatBox';
import Breadcrumb from './components/Breadcrumb';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import styled from 'styled-components';

const MainContent = styled.main`
  margin-top: 80px;
`;

const App = () => {
  return (
    <div>
      <Header />
      <MainContent>
        <Breadcrumb />
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <Products />
              <Services />
              <News />
              <Information />
            </>
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </MainContent>
      <ChatBox />
    </div>
  );
};

export default App;
