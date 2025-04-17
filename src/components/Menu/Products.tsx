import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, CardContent, CardMedia, Button, Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { SectionTitle } from '../../styles/SharedStyles';
import { getAllProductsAPI } from '../../components/API';
import { useNavigate } from 'react-router-dom';

const ProductSection = styled.section`
  padding: 40px 0;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

const ViewDetailButton = styled(Button)`
  background-color: #333 !important;
  color: white !important;
  flex: 1;
  
  &:hover {
    background-color: #444 !important;
  }
`;

const AddToCartButton = styled(Button)`
  background-color: #e31837 !important;
  color: white !important;
  flex: 1;
  
  &:hover {
    background-color: #cc1630 !important;
  }
`;

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductsAPI();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetail = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <ProductSection>
      <ProductContainer>
        <SectionTitle>SẢN PHẨM NỔI BẬT</SectionTitle>
        <ProductGrid>
          {products.map((product) => (
            <InfoCard elevation={2} key={product._id}>
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
                  {product.description.substring(0, 100)}...
                </Typography>
                <ProductPrice variant="h6">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </ProductPrice>
                <ButtonGroup>
                  <ViewDetailButton
                    variant="contained"
                    startIcon={<InfoIcon />}
                    onClick={() => handleViewDetail(product._id)}
                  >
                    Chi tiết
                  </ViewDetailButton>
                  <AddToCartButton
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                  >
                    Mua ngay
                  </AddToCartButton>
                </ButtonGroup>
              </ProductContent>
            </InfoCard>
          ))}
        </ProductGrid>
      </ProductContainer>
    </ProductSection>
  );
};

export default Products;