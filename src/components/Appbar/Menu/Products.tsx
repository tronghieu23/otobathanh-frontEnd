import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Typography, CardContent, CardMedia, Button, Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SectionTitle } from '../../../Styles/SharedStyles';
import { getAllProductsAPI, addToCartAPI } from '../../API';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getCurrentUser } from '../../Utils/auth';

const ProductSection = styled.section`
  padding: 40px 0;
  background-color: #f5f5f5;
`;

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const rippleEffect = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const InfoCard = styled(Paper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;
  opacity: 0;
  
  &.animate {
    animation: ${fadeInUp} 0.6s ease forwards;
  }
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

// Update the AddToCartButton styling
const AddToCartButton = styled(Button)`
  background-color: #e31837 !important;
  color: white !important;
  width: 100%;
  overflow: hidden;
  position: relative;
  
  &:hover {
    background-color: #cc1630 !important;
  }

  &:active::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${rippleEffect} 0.4s ease-out;
  }
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

const ProductImage = styled(CardMedia)`
  height: 200px;
  transition: transform 0.3s ease;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;

  ${InfoCard}:hover & {
    transform: scale(1.04);
  }
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

// Update LikeButton styling
const LikeButton = styled(Button)`
  position: absolute !important;
  top: 5px;
  left: 5px;
  min-width: 40px !important;
  width: 40px;
  height: 40px;
  padding: 0 !important;
  border-radius: 50% !important;
  background-color: white !important;
  color: #e31837 !important;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
  
  &:hover {
    background-color: #f5f5f5 !important;
  }
`;

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const navigate = useNavigate();
  const user = getCurrentUser();
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>({});

  useEffect(() => {

    fetchProducts();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const id = el.getAttribute('data-id') || '';

          if (entry.isIntersecting) {
            // Nếu chưa visible hoặc vừa ra khỏi rồi vào lại → animate
            if (!visibleMap[id]) {
              el.classList.remove('animate'); // reset
              void el.offsetWidth;
              el.classList.add('animate');    // animate lại

              setVisibleMap(prev => ({ ...prev, [id]: true }));
            }
          } else {
            // Khi ra khỏi tầm nhìn hoàn toàn
            setVisibleMap(prev => ({ ...prev, [id]: false }));
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '40px',
      }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [products, visibleMap]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProductsAPI();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleLike = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setLikedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleViewDetail = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = async (e: React.MouseEvent, product: any) => {
    e.stopPropagation(); // Prevent navigation to product detail

    // Check if user is logged in
    if (!user || !user.id) {
      navigate('/');
      return;
    }

    try {
      const cartData = {
        quantity: 1, // Default quantity
        product_id: product._id,
        account_id: user.id
      };

      await addToCartAPI(cartData);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <ProductSection>
      <ProductContainer>
        <SectionTitle>SẢN PHẨM NỔI BẬT</SectionTitle>
        <ProductGrid>
          {products.map((product, index) => (
            <InfoCard
              elevation={2}
              key={product._id}
              data-id={product._id}
              ref={(el: HTMLDivElement | null) => {
                productRefs.current[index] = el;
              }}
              onClick={() => handleViewDetail(product._id)}
            >
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
                  {product.name.substring(0, 50)}...
                </ProductTitle>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description.substring(0, 100)}...
                </Typography>
                <ProductPrice variant="h6">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </ProductPrice>
                <ButtonGroup>
                  <LikeButton
                    onClick={(e) => handleLike(e, product._id)}
                  >
                    {likedProducts.includes(product._id)
                      ? <FavoriteIcon />
                      : <FavoriteBorderIcon />
                    }
                  </LikeButton>
                  <AddToCartButton
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={(e) => handleAddToCart(e, product)}
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