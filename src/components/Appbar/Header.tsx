import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';
import LoginForm from '../AuthForm/Login/Login';
import RegisterForm from '../AuthForm/Register/Register';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { getCurrentUser, handleLogout } from '../Utils/auth';
import { getAccountByIdAPI } from '../API';

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

// Add this styled component after other styled components
const UserAvatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 8px;
border: 2px solid #e31837;
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

// Update UserDropdown component to handle hover
// First, define DropdownContent before UserDropdown
const DropdownContent = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #1e2124;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1002;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    margin-top: 10px;
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
`;

// Then define UserDropdown that references DropdownContent
const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover ${DropdownContent} {
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DropdownItem = styled(NavLink)`
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #e31837;
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #e31837;
  }
`;

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userImage, setUserImage] = useState('');  // Add this state
  const user = getCurrentUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.id) {
          const response = await getAccountByIdAPI(user.id);
          if (response && response.account && response.account.image) {
            setUserImage(response.account.image);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  // In the render section, update the UserAvatar src
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
              <UserDropdown>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {(userImage || user.image) && (
                    <UserAvatar 
                      src={userImage || user.image} 
                      alt={user.fullName} 
                    />
                  )}
                  <UserName>
                    {user.fullName}
                  </UserName>
                </div>
                <DropdownContent $isOpen={isDropdownOpen}>
                  <DropdownItem to="/account/profile">
                    Thông tin tài khoản
                  </DropdownItem>
                  <DropdownItem to="/account/update">
                    Cập nhật tài khoản
                  </DropdownItem>
                  <DropdownItem to="/account/changePass">
                    Thay đổi mật khẩu
                  </DropdownItem>
                  <DropdownItem to="/account/historyOrder">
                    Lịch sử mua hàng
                  </DropdownItem>
                  <DropdownItem to="/account/likeProducts">
                    Sản phẩm yêu thích
                  </DropdownItem>
                  <DropdownButton onClick={handleLogout}>
                    Đăng xuất
                  </DropdownButton>
                </DropdownContent>
              </UserDropdown>
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
                <UserName>{user.fullName}</UserName>
                <NavLink to="/account/profile" onClick={() => setIsMenuOpen(false)}>
                  Thông tin tài khoản
                </NavLink>
                <NavLink to="/account/update" onClick={() => setIsMenuOpen(false)}>
                  Cập nhật tài khoản
                </NavLink>
                <LogoutButton onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}>
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
