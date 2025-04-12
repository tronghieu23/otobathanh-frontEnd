import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
`;

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(135deg, #232323 60%, #e31837 60%) !important;
  box-shadow: none !important;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      #e31837,
      #e31837 10px,
      #cc1630 10px,
      #cc1630 20px
    );
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 25% 0);
    z-index: 1;
  }
`;

const StyledToolbar = styled(Toolbar)`
  position: relative;
  z-index: 2;
`;

const Logo = styled.img`
  height: 50px;
  margin-right: 40px;
  filter: brightness(0) invert(1);
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: 500;
  &:hover {
    color: #ff0000;
  }
`;

const ContactButton = styled(Button)`
  background-color: transparent !important;
  color: white !important;
  margin-left: auto !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  border: 2px solid white !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  .MuiSvgIcon-root {
    animation: ${shake} 1.5s ease-in-out infinite;
  }
`;

const SearchButton = styled(IconButton)`
  color: white !important;
  margin-left: 16px !important;
  border: 2px solid white !important;
  padding: 8px !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
`;

const Header = () => {
  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <Logo src="../image/logo192.png" alt="Ô Tô Bá Thành" />
        <nav>
          <NavLink to="/">TRANG CHỦ</NavLink>
          <NavLink to="/news">TIN TỨC</NavLink>
          <NavLink to="/services">DỊCH VỤ</NavLink>
          <NavLink to="/products">SẢN PHẨM</NavLink>
        </nav>
        <ContactButton variant="outlined">
          <PhoneIcon />
          LIÊN HỆ NGAY
        </ContactButton>
        <SearchButton>
          <SearchIcon />
        </SearchButton>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header; 