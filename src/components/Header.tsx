import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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

const Logo = styled.img`
  height: 100px;
  width: auto;
  object-fit: contain;
  
  @media (max-width: 768px) {
    height: 40px;
  }
`;

const NavLinks = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background: #1e2124;
    padding: 20px;
    gap: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(RouterNavLink)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #e31837;
  }

  &.active {
    color: #e31837;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #e31837;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const AuthButton = styled.button<{ $primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.$primary ? '#e31837' : 'transparent'};
  background-color: ${props => props.$primary ? '#e31837' : 'transparent'};
  color: white;

  &:hover {
    background-color: ${props => props.$primary ? '#c41730' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.$primary ? '#c41730' : 'white'};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
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
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const UserName = styled.span`
  color: #e31837;
  font-weight: 500;
  white-space: nowrap;
`;

const LogoutButton = styled(AuthButton)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ fullName: string } | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo src="/image/logo.png" alt="Ô Tô Bá Thành" />
        
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>

        <NavLinks $isOpen={isMenuOpen}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} end>
            Trang chủ
          </NavLink>
          <NavLink to="/services" onClick={() => setIsMenuOpen(false)}>
            Dịch vụ
          </NavLink>
          <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>
            Sản phẩm
          </NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
            Giới thiệu
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
            Liên hệ
          </NavLink>

          {user ? (
            <UserInfo>
              <UserName>Xin chào, {user.fullName}</UserName>
              <LogoutButton onClick={handleLogout}>
                Đăng xuất
              </LogoutButton>
            </UserInfo>
          ) : (
            <AuthButtons>
              <AuthButton onClick={() => setIsLoginOpen(true)}>
                Đăng nhập
              </AuthButton>
              <AuthButton $primary onClick={() => setIsRegisterOpen(true)}>
                Đăng ký
              </AuthButton>
            </AuthButtons>
          )}
        </NavLinks>
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