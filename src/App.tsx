import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Appbar/Header';
import Banner from './components/Home/Banner';
import News from './components/Home/News';
import Information from './components/Home/Infor';
import Footer from './components/Home/Footer';
import ChatBox from './components/Chatbox/ChatBox';
import Breadcrumb from './components/Styles/Breadcrumb';
import About from './components/Appbar/Menu/About';
import Services from './components/Detail/ServicesDetail';
import Contact from './components/Appbar/Menu/Contact';
import HomeStats from './components/Home/Stats';
import HomeServices from './components/Appbar/Menu/Services';
import NewsDetail from './components/Detail/NewsDetail';
import styled from 'styled-components';
import IndexProduct from './components/Admin/ProductsManager/indexProduct';
import IndexAccount from './components/Admin/AccountsManager/indexAccount';
import ProductPage from './components/Detail/ProductDetail';
import IndexNews from './components/Admin/NewsManager/indexNews';
import Profile from './components/AuthForm/MenuAuth/ProFile';
import UpdateAccount from './components/AuthForm/MenuAuth/UpdateAccount';
import ChangePass from './components/AuthForm/MenuAuth/ChangePass';
import HistoryOrder from './components/AuthForm/MenuAuth/HistoryOrder';
import LikeProducts from './components/AuthForm/MenuAuth/LikeProducts';
import CartDetail from './components/Detail/CartDetail';
import Order from './components/Home/Order';
import OrderDetail from './components/Detail/OrderDetail';
import Procedure from './components/Home/Procedure';
import { ToastProvider } from './components/Styles/ToastProvider';
import ProductOutstand from './components/Home/ProductOutstand';
import Products from './components/Appbar/Menu/Products';
import Partner from './components/Home/Partner';

const MainContent = styled.main`
  margin-top: 80px;
`;

const App = () => {
  return (
    <div>
      <ToastProvider>
        <Header />
        <MainContent>
          <Breadcrumb />
          <Routes>
            <Route path="/" element={
              <>
                <Banner />
                <HomeServices />
                <ProductOutstand />
                <News />
                <Information />
                <Procedure />
                <HomeStats />
                <Partner />
              </>
            } />
            <Route path="/productoutstand" element={<ProductOutstand />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/manager/products" element={<IndexProduct />} />
            <Route path="/manager/accounts" element={<IndexAccount />} />
            <Route path="/manager/news" element={<IndexNews />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/update" element={<UpdateAccount />} />
            <Route path="/account/changePass" element={<ChangePass />} />
            <Route path="/account/historyOrder" element={<HistoryOrder />} />
            <Route path="/account/likeProducts" element={<LikeProducts />} />
            <Route path="/cart/cartDetail" element={<CartDetail />} />
            <Route path="/order/checkout" element={<Order />} />
            <Route path="/order/orderDetail/:orderId" element={<OrderDetail />} />
            <Route path="/procedure" element={<Procedure />} />
            <Route path="/partner" element={<Partner />} />
          </Routes>
          <Footer />
        </MainContent>
        <ChatBox />
      </ToastProvider>
    </div>
  );
};

export default App;
