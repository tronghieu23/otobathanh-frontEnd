import React from 'react';
import styled from 'styled-components';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BuildIcon from '@mui/icons-material/Build';
import PhoneIcon from '@mui/icons-material/Phone';

const Container = styled.div`
  padding: 40px 20px;
`;

const Title = styled(Typography)`
  text-align: center;
  color: #ff0000;
  margin-bottom: 40px !important;
  font-weight: bold !important;
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
`;

const IconWrapper = styled.div`
  color: #ff0000;
  margin-bottom: 15px;
  .MuiSvgIcon-root {
    font-size: 40px;
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
      <Title variant="h4">THÔNG TIN CHUNG</Title>
      <GridContainer>
        <InfoCard elevation={2}>
          <IconWrapper>
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
          <IconWrapper>
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
          <IconWrapper>
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
          <IconWrapper>
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