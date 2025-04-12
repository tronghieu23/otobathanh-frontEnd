import React from 'react';
import styled from 'styled-components';
import { Typography, CardContent, CardMedia, Button, Paper, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SectionTitle } from '../styles/SharedStyles';

const ProductSection = styled.section`
  padding: 20px 0;
  background-color: #f5f5f5;
`;

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ProductGrid = styled.div`
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

const InfoCard = styled(Paper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled(CardMedia)`
  height: 200px;
`;

const ProductContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled(Typography)`
  font-weight: bold !important;
  margin-bottom: 8px !important;
`;

const ProductPrice = styled(Typography)`
  color: #e31837;
  font-weight: bold !important;
  margin-bottom: 16px !important;
`;

const AddToCartButton = styled(Button)`
  background-color: #e31837 !important;
  color: white !important;
  margin-top: auto !important;
  
  &:hover {
    background-color: #cc1630 !important;
  }
`;

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Bộ Lọc Gió Động Cơ',
      price: '450.000đ',
      image: '../image/product1.jpg',
      description: 'Bộ lọc gió chất lượng cao, tăng hiệu suất động cơ'
    },
    {
      id: 2,
      name: 'Dầu Động Cơ Cao Cấp',
      price: '850.000đ',
      image: '../image/product2.jpg',
      description: 'Dầu động cơ tổng hợp, bảo vệ toàn diện'
    },
    {
      id: 3,
      name: 'Bộ Phanh Đĩa',
      price: '1.250.000đ',
      image: '../image/product3.jpg',
      description: 'Hệ thống phanh an toàn, độ bền cao'
    },
    {
      id: 4,
      name: 'Ắc Quy Chính Hãng',
      price: '1.650.000đ',
      image: '../image/product4.jpg',
      description: 'Ắc quy bền bỉ, khởi động mạnh mẽ'
    },
    {
      id: 5,
      name: 'Bộ Lọc Nhiên Liệu',
      price: '350.000đ',
      image: '../image/product5.jpg',
      description: 'Lọc nhiên liệu hiệu quả, tiết kiệm xăng'
    },
    {
      id: 6,
      name: 'Bộ Đèn LED Cao Cấp',
      price: '750.000đ',
      image: '../image/product6.jpg',
      description: 'Đèn LED siêu sáng, tiết kiệm điện'
    }
  ];

  return (
    <ProductSection>
      <ProductContainer>
        <SectionTitle>SẢN PHẨM NỔI BẬT</SectionTitle>
        <ProductGrid>
          {products.map((product) => (
            <InfoCard elevation={2} key={product.id}>
              <ProductImage
                sx={{
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
                image={product.image}
                title={product.name}
              />
              <ProductContent>
                <ProductTitle variant="h6">
                  {product.name}
                </ProductTitle>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>
                <ProductPrice variant="h6">
                  {product.price}
                </ProductPrice>
                <AddToCartButton
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                >
                  Thêm vào giỏ hàng
                </AddToCartButton>
              </ProductContent>
            </InfoCard>
          ))}
        </ProductGrid>
      </ProductContainer>
    </ProductSection>
  );
};

export default Products; 