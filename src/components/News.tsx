import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../styles/SharedStyles';

const NewsSection = styled.section`
  padding: 40px 0;
  background-color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const NewsContent = styled.div`
  padding: 20px;
`;

const NewsTitle = styled.h3`
  font-size: 18px;
  color: #e31837;
  margin-bottom: 10px;
  font-weight: 600;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NewsDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDetails = styled.div`
  background: white;
  border-radius: 8px;
  padding: 30px;
  margin-top: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: 0 auto 20px;
  display: block;
  border-radius: 8px;
`;

const ProductTitle = styled.h2`
  color: #e31837;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
`;

const ProductDescription = styled.div`
  color: #666;
  line-height: 1.8;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  background: #e31837;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #c41730;
  }
`;

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  details: string;
}

const News = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const newsItems: Product[] = [
    {
      id: 1,
      image: '../image/city.jpg',
      title: 'GIÁ XE HONDA CITY TIỀN GIANG THÁNG 04/2025',
      description: 'Giá xe Honda City tại Tiền Giang tháng 04/2025. Giá xe Honda City lăn bánh tại Honda Tiền Giang',
      price: '599.000.000 VNĐ',
      details: 'Honda City 2025 là mẫu sedan hạng B được ưa chuộng với thiết kế hiện đại, tiện nghi đầy đủ và khả năng vận hành mạnh mẽ. Xe được trang bị động cơ 1.5L DOHC i-VTEC, hộp số CVT, nhiều tính năng an toàn như 6 túi khí, VSA, HSA...'
    },
    {
      id: 2,
      image: '../image/brv.jpg',
      title: 'GIÁ XE HONDA BRV TIỀN GIANG THÁNG 04/2025',
      description: 'Giá xe Honda Brv tại Tiền Giang tháng 04/2025. Giá xe Honda Brv lăn bánh tại Honda Tiền Giang',
      price: '661.000.000 VNĐ',
      details: 'Honda BR-V 2025 là mẫu SUV 7 chỗ compact với thiết kế thể thao, nội thất rộng rãi và linh hoạt. Xe được trang bị động cơ 1.5L DOHC i-VTEC, hộp số CVT, nhiều tính năng an toàn và giải trí hiện đại.'
    },
    {
      id: 3,
      image: '../image/hrv.jpg',
      title: 'GIÁ XE HONDA HRV TIỀN GIANG THÁNG 04/2025',
      description: 'Giá xe Honda Hrv tại Tiền Giang tháng 04/2025. Giá xe Honda Hrv lăn bánh tại Honda Tiền Giang',
      price: '699.000.000 VNĐ',
      details: 'Honda HR-V 2025 là mẫu SUV đô thị cao cấp với thiết kế thời trang, công nghệ tiên tiến và khả năng vận hành linh hoạt. Xe được trang bị động cơ 1.5L VTEC TURBO, hộp số CVT, cùng nhiều tính năng an toàn và tiện nghi cao cấp.'
    },
    {
      id: 4,
      image: '../image/civic.jpg',
      title: 'GIÁ XE HONDA CIVIC TIỀN GIANG THÁNG 04/2025',
      description: 'Giá xe Honda Civic tại Tiền Giang tháng 04/2025. Giá xe Honda Civic lăn bánh tại Honda Tiền Giang',
      price: '730.000.000 VNĐ',
      details: 'Honda Civic 2025 là mẫu sedan hạng C cao cấp với thiết kế thể thao đột phá, công nghệ hiện đại và khả năng vận hành mạnh mẽ. Xe được trang bị động cơ 1.5L VTEC TURBO tiên tiến, hộp số CVT, hệ thống Honda SENSING, màn hình cảm ứng 9 inch và nhiều tính năng an toàn tiên tiến.'
    }
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NewsSection>
      <SectionTitle>TIN TỨC KHUYẾN MÃI</SectionTitle>
      {selectedProduct ? (
        <>
          <ProductDetails>
            <ProductImage src={selectedProduct.image} alt={selectedProduct.title} />
            <ProductTitle>{selectedProduct.title}</ProductTitle>
            <ProductPrice>{selectedProduct.price}</ProductPrice>
            <ProductDescription>{selectedProduct.details}</ProductDescription>
            <BackButton onClick={() => setSelectedProduct(null)}>
              Quay lại tin tức
            </BackButton>
          </ProductDetails>
        </>
      ) : (
        <NewsGrid>
          {newsItems.map(item => (
            <NewsCard key={item.id} onClick={() => handleProductClick(item)}>
              <NewsImage src={item.image} alt={item.title} />
              <NewsContent>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsDescription>{item.description}</NewsDescription>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
      )}
    </NewsSection>
  );
};

export default News; 