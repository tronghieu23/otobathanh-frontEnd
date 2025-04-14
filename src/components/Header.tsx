import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
  margin: 0;
  
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const NavLink = styled(RouterNavLink)`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: 500;
  padding: 8px 0;
  position: relative;

  &:hover {
    color: #ff0000;
  }

  &.active {
    color: #ff0000;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #ff0000;
    }
  }
`;

const HeaderContainer = styled.header`
  background-color: #1e2124;
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NavLinks = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: #1e2124;
    padding: 20px;
    gap: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    ${NavLink} {
      width: 100%;
      text-align: center;
      padding: 10px 0;
      margin: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const AuthButton = styled.button<{ $primary?: boolean }>`
  padding: 8px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid ${props => props.$primary ? '#e31837' : 'transparent'};
  background-color: ${props => props.$primary ? '#e31837' : 'transparent'};
  color: white;

  &:hover {
    background-color: ${props => props.$primary ? '#c41730' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.$primary ? '#c41730' : 'white'};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }

  .MuiSvgIcon-root {
    font-size: 24px;
  }
`;

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo src="../image/logo.png" alt="Ô Tô Bá Thành" />

        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>

        <NavLinks $isOpen={isMenuOpen}>
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            end
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/services"
            onClick={() => setIsMenuOpen(false)}
          >
            Dịch vụ
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setIsMenuOpen(false)}
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsMenuOpen(false)}
          >
            Giới thiệu
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
          >
            Liên hệ
          </NavLink>
        </NavLinks>

        <AuthButtons>
          <AuthButton onClick={() => setIsLoginOpen(true)}>Đăng nhập</AuthButton>
          <AuthButton $primary onClick={() => setIsRegisterOpen(true)}>Đăng ký</AuthButton>
        </AuthButtons>
      </HeaderContent>

      <LoginForm
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
      <RegisterForm
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </HeaderContainer>
  );
};

export default Header; 