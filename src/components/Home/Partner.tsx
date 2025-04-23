import React from 'react';
import styled from 'styled-components';

const PartnerSection = styled.section`
  background: linear-gradient(to right, #990000, #ff0000);
  padding: 40px 0;
  text-align: center;
`;

const Title = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 40px;
  font-weight: bold;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoBox = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
`;

const Partner = () => {
  const partners = [
    { name: 'Mercedes-Benz', logo: '/images/partners/mercedes.png' },
    { name: 'BMW', logo: '/images/partners/bmw.png' },
    { name: 'Audi', logo: '/images/partners/audi.png' },
    { name: 'Lexus', logo: '/images/partners/lexus.png' },
    { name: 'Porsche', logo: '/images/partners/porsche.png' },
    { name: 'Rolls-Royce', logo: '/images/partners/rolls-royce.png' }
  ];

  return (
    <PartnerSection>
      <Title>THƯƠNG HIỆU ĐỐI TÁC</Title>
      <LogoContainer>
        {partners.map((partner, index) => (
          <LogoBox key={index}>
            <img src={partner.logo} alt={partner.name} />
          </LogoBox>
        ))}
      </LogoContainer>
    </PartnerSection>
  );
};

export default Partner;