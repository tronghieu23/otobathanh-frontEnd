import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Appbar/Header';
import Banner from './components/Banner';
import News from './components/News';
import Products from './components/Menu/Products';
import Information from './components/Information';
import Footer from './components/Footer';
import ChatBox from './components/Chatbox/ChatBox';
import Breadcrumb from './components/Breadcrumb';
import About from './components/Menu/About';
import Services from './pages/Services';
import Contact from './components/Menu/Contact';
import HomeStats from './components/HomeStats';
import HomeServices from './components/Menu/HomeServices';
import NewsPage from './pages/NewsPage';
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
              <HomeServices />
              <Products />
              <News />
              <Information />
              <HomeStats />
            </>
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news/:id" element={<NewsPage />} />
        </Routes>
        <Footer />
      </MainContent>
      <ChatBox />
    </div>
  );
};

export default App;
