import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';
import LoginForm from '../AuthForm/Login/LoginForm';
import RegisterForm from '../AuthForm/Register/RegisterForm';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const HeaderContainer = styled.header`
  background-color: #1e2124;
  padding: 5px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 8px 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const LogoContainer = styled.div`
  flex: 0 0 auto;
  z-index: 1001;
`;

const Logo = styled.img`
  height: 90px;
  object-fit: contain;
  
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const NavContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
`;

const AuthContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
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
    padding: 15px;
    font-size: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }

    &.active:after {
      display: none;
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
    gap: 15px;
    margin-top: 20px;
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
  min-width: 100px;

  &:hover {
    background-color: ${props => props.$primary ? '#c41730' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.$primary ? '#c41730' : 'white'};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
    font-size: 16px;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    font-size: 28px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    gap: 15px;
  }
`;

const UserName = styled.span`
  color: #e31837;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const LogoutButton = styled(AuthButton)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MobileNav = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1e2124;
    padding: 80px 20px 20px;
    overflow-y: auto;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
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
        <LogoContainer>
          <Logo src="../image/logo.png" alt="Ô Tô Bá Thành" />
        </LogoContainer>

        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>

        <NavContainer>
          <NavLinks $isOpen={false}>
            <NavLink to="/" end>
              Trang chủ
            </NavLink>
            <NavLink to="/services">
              Dịch vụ
            </NavLink>
            <NavLink to="/products">
              Sản phẩm
            </NavLink>
            <NavLink to="/about">
              Giới thiệu
            </NavLink>
            <NavLink to="/contact">
              Liên hệ
            </NavLink>
          </NavLinks>
        </NavContainer>

        <AuthContainer>
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
        </AuthContainer>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <MobileNav>
            <NavLinks $isOpen={true}>
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
            </NavLinks>
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
          </MobileNav>
        )}
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