import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BuildIcon from '@mui/icons-material/Build';
import PhoneIcon from '@mui/icons-material/Phone';
import { SectionTitle } from '../styles/SharedStyles';

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled(Paper)`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div<{ $iconType: string }>`
  color: #ff0000;
  margin-bottom: 15px;
  .MuiSvgIcon-root {
    font-size: 40px;
    animation: ${props => {
      switch(props.$iconType) {
        case 'home':
          return pulse;
        case 'phone':
          return shake;
        case 'build':
          return pulse;
        case 'time':
          return shake;
        default:
          return 'none';
      }
    }} 2s infinite;
  }
`;

const InfoTitle = styled(Typography)`
  color: #ff0000;
  font-weight: bold !important;
  margin-bottom: 15px !important;
`;

const Information = () => {
  return (
    <Container>
      <SectionTitle>THÔNG TIN CHUNG</SectionTitle>
      <GridContainer>
        <InfoCard elevation={2}>
          <IconWrapper $iconType="home">
            <HomeIcon />
          </IconWrapper>
          <InfoTitle variant="h6">ĐỊA CHỈ</InfoTitle>
          <Typography variant="body2">
            Địa chỉ 1: 19 Phan Văn Trị, Phường 7, Quận Gò Vấp, TP.HCM
            <br /><br />
            Địa chỉ 2: 15 TL08 Thạnh Lộc, Quận 12, TP.HCM
          </Typography>
        </InfoCard>

        <InfoCard elevation={2}>
          <IconWrapper $iconType="time">
            <AccessTimeIcon />
          </IconWrapper>
          <InfoTitle variant="h6">GIỜ LÀM VIỆC</InfoTitle>
          <Typography variant="body2">
            HÀNG NGÀY:<br />
            07:30 - 17:00
            <br /><br />
            CHỦ NHẬT & NGÀY LỄ:<br />
            09:00 - 16:00
          </Typography>
        </InfoCard>

        <InfoCard elevation={2}>
          <IconWrapper $iconType="build">
            <BuildIcon />
          </IconWrapper>
          <InfoTitle variant="h6">HIỆN SỬA CHỮA</InfoTitle>
          <Typography variant="body2">
            1. Liên hệ số điện thoại 1900.866.876 & 0908.751.765 & 0913.169.066 (Mr Nhân)
            <br />
            2. Truy cập website: otobathanh.com
            <br />
            3. Gọi trọng tài miễn trung gian
            <br />
            4. Chăm sóc khách hàng or có vấn Dịch vụ Bá Thành sẽ gọi lại ngay
          </Typography>
        </InfoCard>

        <InfoCard elevation={2}>
          <IconWrapper $iconType="phone">
            <PhoneIcon />
          </IconWrapper>
          <InfoTitle variant="h6">CỨU HỘ 24/24</InfoTitle>
          <Typography variant="h5" style={{ color: '#ff0000', fontWeight: 'bold' }}>
            0913.169.066
          </Typography>
        </InfoCard>
      </GridContainer>
    </Container>
  );
};

export default Information; 