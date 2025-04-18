import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../../../Styles/SharedStyles';
import BuildIcon from '@mui/icons-material/Build';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EngineeringIcon from '@mui/icons-material/Engineering';

const ServicesSection = styled.section`
  padding: 60px 0;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: #e31837;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  svg {
    font-size: 30px;
  }

  @media (max-width: 1024px) {
    width: 70px;
    height: 70px;
    
    svg {
      font-size: 35px;
    }
  }
`;

const ServiceTitle = styled.h3`
  color: #333;
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 600;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.5;
  margin: 0;
  font-size: 14px;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    font-size: 16px;
    line-height: 1.6;
  }
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 25px 15px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(227, 24, 55, 0.05);
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: transform .3s ease-out;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);

    &:before {
      transform: scaleX(1);
    }

    ${IconWrapper} {
      background: #c41730;
      transform: scale(1.1);
    }

    ${ServiceTitle} {
      color: #e31837;
    }
  }

  @media (max-width: 1024px) {
    padding: 30px 20px;
  }
`;

const HomeServices = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <BuildIcon />,
      title: 'Sửa Chữa Tổng Quát',
      description: 'Dịch vụ sửa chữa, bảo dưỡng xe chuyên nghiệp với đội ngũ kỹ thuật viên giàu kinh nghiệm.',
      path: '/services#repair'
    },
    {
      icon: <DirectionsCarIcon />,
      title: 'Chăm Sóc Xe',
      description: 'Dịch vụ chăm sóc xe toàn diện, từ rửa xe đến đánh bóng, phục hồi nội thất.',
      path: '/services#care'
    },
    {
      icon: <ColorLensIcon />,
      title: 'Sơn & Phục Hồi',
      description: 'Dịch vụ sơn xe, phục hồi xe tai nạn với công nghệ hiện đại nhất.',
      path: '/services#paint'
    },
    {
      icon: <EngineeringIcon />,
      title: 'Bảo Dưỡng Định Kỳ',
      description: 'Dịch vụ bảo dưỡng định kỳ theo tiêu chuẩn nhà sản xuất, đảm bảo xe luôn trong tình trạng tốt nhất.',
      path: '/services#maintenance'
    }
  ];

  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  return (
    <ServicesSection>
      <Container>
        <SectionTitle>DỊCH VỤ NỔI BẬT</SectionTitle>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              onClick={() => handleServiceClick(service.path)}
            >
              <IconWrapper>
                {service.icon}
              </IconWrapper>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default HomeServices; 