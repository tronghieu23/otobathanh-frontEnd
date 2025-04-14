import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, CardContent, CardMedia, Button, Paper, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { SectionTitle } from '../styles/SharedStyles';
import ProductDetail from '../pages/ProductDetail';

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
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const products = [
    {
      id: '1',
      title: 'Bộ Lọc Gió Động Cơ',
      price: '450.000đ',
      image: '../image/product1.jpg',
      description: 'Bộ lọc gió chất lượng cao, được thiết kế đặc biệt để tăng hiệu suất động cơ và tiết kiệm nhiên liệu. Sản phẩm được sản xuất theo tiêu chuẩn quốc tế, đảm bảo độ bền và hiệu quả lọc tối ưu.',
      specifications: [
        { label: 'Thương hiệu', value: 'OtoBatHanh' },
        { label: 'Xuất xứ', value: 'Việt Nam' },
        { label: 'Chất liệu', value: 'Vải lọc cao cấp' },
        { label: 'Kích thước', value: '280mm x 180mm' },
        { label: 'Bảo hành', value: '12 tháng' },
        { label: 'Tương thích', value: 'Đa dạng dòng xe' }
      ]
    },
    {
      id: '2',
      title: 'Dầu Động Cơ Cao Cấp',
      price: '850.000đ',
      image: '../image/product2.jpg',
      description: 'Dầu động cơ tổng hợp cao cấp, được phát triển với công nghệ tiên tiến giúp bảo vệ động cơ toàn diện. Sản phẩm có khả năng chống oxy hóa và làm sạch động cơ hiệu quả.',
      specifications: [
        { label: 'Thương hiệu', value: 'OtoBatHanh' },
        { label: 'Xuất xứ', value: 'Nhập khẩu' },
        { label: 'Dung tích', value: '4L' },
        { label: 'Độ nhớt', value: '5W-40' },
        { label: 'Tiêu chuẩn', value: 'API SN/CF' },
        { label: 'Bảo hành', value: '12 tháng' }
      ]
    },
    {
      id: '3',
      title: 'Bộ Phanh Đĩa',
      price: '1.250.000đ',
      image: '../image/product3.jpg',
      description: 'Bộ phanh đĩa chất lượng cao với thiết kế tiên tiến, mang lại hiệu suất phanh tối ưu và độ an toàn cao. Sản phẩm được sản xuất từ vật liệu cao cấp, đảm bảo độ bền và khả năng chống mài mòn.',
      specifications: [
        { label: 'Thương hiệu', value: 'OtoBatHanh' },
        { label: 'Xuất xứ', value: 'Nhập khẩu' },
        { label: 'Chất liệu', value: 'Thép không gỉ' },
        { label: 'Đường kính', value: '300mm' },
        { label: 'Độ dày', value: '28mm' },
        { label: 'Bảo hành', value: '24 tháng' }
      ]
    },
    {
      id: '4',
      title: 'Ắc Quy Chính Hãng',
      price: '1.650.000đ',
      image: '../image/product4.jpg',
      description: 'Ắc quy công nghệ mới với khả năng khởi động mạnh mẽ và độ bền cao. Sản phẩm được trang bị hệ thống bảo vệ thông minh, đảm bảo an toàn và tuổi thọ cao.',
      specifications: [
        { label: 'Thương hiệu', value: 'OtoBatHanh' },
        { label: 'Xuất xứ', value: 'Nhập khẩu' },
        { label: 'Điện áp', value: '12V' },
        { label: 'Dung lượng', value: '70Ah' },
        { label: 'Kích thước', value: '260x170x220mm' },
        { label: 'Bảo hành', value: '24 tháng' }
      ]
    },
    {
      id: '5',
      title: 'Bộ Lọc Nhiên Liệu',
      price: '350.000đ',
      image: '../image/product5.jpg',
      description: 'Bộ lọc nhiên liệu hiệu suất cao, giúp loại bỏ tạp chất và nước trong nhiên liệu. Thiết kế đặc biệt giúp tăng hiệu quả lọc và kéo dài tuổi thọ động cơ.',
      specifications: [
        { label: 'Thương hiệu', value: 'OtoBatHanh' },
        { label: 'Xuất xứ', value: 'Việt Nam' },
        { label: 'Chất liệu', value: 'Composite' },
        { label: 'Kích thước', value: '120x80mm' },
        { label: 'Độ lọc', value: '10 micron' },
        { label: 'Bảo hành', value: '12 tháng' }
      ]
    },
    {
      id: '6',
      title: 'Bộ Đèn LED Cao Cấp',
      price: '750.000đ',
      image: '../image/product6.jpg',
      description: 'Bộ đèn LED cao cấp với công nghệ chiếu sáng tiên tiến, mang lại ánh sáng trắng tự nhiên và tiết kiệm năng lượng. Thiết kế chống nước và chống bụi IP67.',
      specifications: [
        { label: 'Thương hiệu', value: 'OtoBatHanh' },
        { label: 'Xuất xứ', value: 'Nhập khẩu' },
        { label: 'Công suất', value: '50W' },
        { label: 'Nhiệt độ màu', value: '6000K' },
        { label: 'Tuổi thọ', value: '50.000 giờ' },
        { label: 'Bảo hành', value: '24 tháng' }
      ]
    }
  ];

  const handleViewDetail = (product: any) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

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
                title={product.title}
              />
              <ProductContent>
                <ProductTitle variant="h6">
                  {product.title}
                </ProductTitle>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description.substring(0, 100)}...
                </Typography>
                <ProductPrice variant="h6">
                  {product.price}
                </ProductPrice>
                <ButtonGroup>
                  <ViewDetailButton
                    variant="contained"
                    startIcon={<InfoIcon />}
                    onClick={() => handleViewDetail(product)}
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

      {selectedProduct && (
        <ProductDetail
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          product={selectedProduct}
        />
      )}
    </ProductSection>
  );
};

export default Products; 