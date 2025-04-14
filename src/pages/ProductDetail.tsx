import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute !important;
  top: 10px;
  right: 10px;
  color: #666 !important;

  &:hover {
    color: #e31837 !important;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ProductTitle = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 15px;
  padding-right: 40px;
`;

const ProductPrice = styled.div`
  color: #e31837;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ProductDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const SpecificationList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SpecificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const SpecLabel = styled.span`
  color: #666;
  font-weight: 500;
  min-width: 120px;
`;

const SpecValue = styled.span`
  color: #333;
`;

const ContactButton = styled.button`
  background-color: #e31837;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c41730;
  }
`;

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    price: string;
    description: string;
    image: string;
    specifications: {
      label: string;
      value: string;
    }[];
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ isOpen, onClose, product }) => {
  // Prevent click inside modal from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={handleContentClick}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        
        <ProductImage src={product.image} alt={product.title} />
        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>{product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
        
        <SpecificationList>
          {product.specifications.map((spec, index) => (
            <SpecificationItem key={index}>
              <SpecLabel>{spec.label}:</SpecLabel>
              <SpecValue>{spec.value}</SpecValue>
            </SpecificationItem>
          ))}
        </SpecificationList>

        <ContactButton onClick={() => window.location.href = '/contact'}>
          Liên hệ tư vấn
        </ContactButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProductDetail; 