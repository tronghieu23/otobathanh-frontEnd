import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Container = styled.div`
  max-width: 1200px;
  margin: 120px auto 40px;
  padding: 20px;
`;

const Title = styled.h2`
  color: #1e2124;
  margin-bottom: 30px;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  margin: 0 0 10px;
  font-size: 16px;
  color: #1e2124;
`;

const ProductPrice = styled.p`
  margin: 0 0 15px;
  color: #e31837;
  font-weight: 500;
  font-size: 18px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const IconButton = styled.button<{ $variant?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => 
    props.$variant === 'delete' ? '#e31837' :
    props.$variant === 'view' ? '#007bff' :
    props.$variant === 'cart' ? '#28a745' : '#e31837'
  };
  color: white;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LikeProducts = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const likedProducts = [
    {
      id: '1',
      name: 'Sản phẩm 1',
      price: 1000000,
      image: 'https://res.cloudinary.com/ddmsl3meg/image/upload/v1744962776/products/ansd2mtzm4nqzak2qdz9.avif',
    },
    {
      id: '2',
      name: 'Sản phẩm 2',
      price: 2000000,
      image: 'https://res.cloudinary.com/ddmsl3meg/image/upload/v1744962776/products/ansd2mtzm4nqzak2qdz9.avif',
    },
    // Add more mock products as needed
  ];

  return (
    <Container>
      <Title>Sản Phẩm Yêu Thích</Title>

      {likedProducts.length > 0 ? (
        <ProductGrid>
          {likedProducts.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(product.price)}
                </ProductPrice>
                <ButtonGroup>
                  <IconButton
                    $variant="view"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    $variant="cart"
                    onClick={() => navigate('/cart')}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                  <IconButton
                    $variant="delete"
                    onClick={() => {/* Handle unlike */}}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </ButtonGroup>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      ) : (
        <EmptyMessage>
          Bạn chưa có sản phẩm yêu thích nào
        </EmptyMessage>
      )}
    </Container>
  );
};

export default LikeProducts;