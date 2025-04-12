import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const BannerContainer = styled(Box)`
  position: relative;
  height: 500px;
  overflow: hidden;
`;

const SloganOverlay = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 2;
`;

const SloganText = styled.h2`
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SlideContainer = styled.div<{ $translateX: number }>`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.$translateX}%);
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NavigationButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8) !important;
  z-index: 2;
  &:hover {
    background-color: white !important;
  }
`;

const LeftButton = styled(NavigationButton)`
  left: 20px;
`;

const RightButton = styled(NavigationButton)`
  right: 20px;
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#e31837' : 'white'};
  cursor: pointer;
  transition: background-color 0.3s;
`;

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerImages = [
    '../image/banner1.jpg',
    '../image/banner2.jpg',
    '../image/banner3.jpg'
  ];

  const nextSlide = () => {
    setCurrentSlide(current => 
      current === bannerImages.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(current => 
      current === 0 ? bannerImages.length - 1 : current - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <BannerContainer>
      <SloganOverlay>
        <SloganText>Thương hiệu là chất lượng - Uy tín là niềm tin - Nỗ lực là tôn chỉ</SloganText>
      </SloganOverlay>
      <SlideContainer $translateX={-currentSlide * 100}>
        {bannerImages.map((image, index) => (
          <Slide key={index}>
            <BannerImage src={image} alt={`Banner ${index + 1}`} />
          </Slide>
        ))}
      </SlideContainer>
      <LeftButton onClick={prevSlide}>
        <ArrowBackIosNewIcon />
      </LeftButton>
      <RightButton onClick={nextSlide}>
        <ArrowForwardIosIcon />
      </RightButton>
      <DotContainer>
        {bannerImages.map((_, index) => (
          <Dot 
            key={index} 
            $active={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </DotContainer>
    </BannerContainer>
  );
};

export default Banner; 