import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../styles/SharedStyles';

const NewsSection = styled.section`
  padding: 60px 0;
  background-color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NewsContent = styled.div`
  padding: 20px;
`;

const NewsTitle = styled.h3`
  color: #333;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsDescription = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const News = () => {
  const navigate = useNavigate();
  
  const newsItems = [
    {
      id: '1',
      title: 'Chương trình khuyến mãi đặc biệt tháng 6',
      description: 'Ưu đãi lớn cho dịch vụ bảo dưỡng và thay thế phụ tùng chính hãng. Giảm giá lên đến 30% cho các gói dịch vụ.',
      image: '../image/news1.jpg',
      date: '01/06/2024',
      content: `
        <p>Chào mừng tháng 6 với những ưu đãi đặc biệt từ OtoBatHanh! Chúng tôi mang đến cho quý khách hàng những chương trình khuyến mãi hấp dẫn nhất:</p>
        
        <h2>Ưu đãi dịch vụ bảo dưỡng</h2>
        <ul>
          <li>Giảm 30% gói bảo dưỡng định kỳ</li>
          <li>Miễn phí kiểm tra 20 điểm an toàn</li>
          <li>Tặng voucher rửa xe miễn phí</li>
        </ul>

        <h2>Khuyến mãi phụ tùng</h2>
        <ul>
          <li>Giảm 25% dầu động cơ cao cấp</li>
          <li>Giảm 20% bộ lọc chính hãng</li>
          <li>Giảm 15% phụ tùng thay thế</li>
        </ul>

        <p>Chương trình áp dụng từ ngày 01/06/2024 đến hết ngày 30/06/2024. Số lượng ưu đãi có hạn, quý khách vui lòng liên hệ sớm để được tư vấn chi tiết.</p>
      `
    },
    {
      id: '2',
      title: 'Ra mắt dịch vụ chăm sóc xe cao cấp',
      description: 'Trải nghiệm dịch vụ chăm sóc xe đẳng cấp với công nghệ hiện đại và đội ngũ kỹ thuật viên chuyên nghiệp.',
      image: '../image/news2.jpg',
      date: '15/05/2024',
      content: `
        <p>OtoBatHanh vừa chính thức ra mắt dịch vụ chăm sóc xe cao cấp, mang đến trải nghiệm hoàn toàn mới cho khách hàng:</p>

        <h2>Dịch vụ mới</h2>
        <ul>
          <li>Phục hồi nội thất cao cấp</li>
          <li>Phủ ceramic chuyên nghiệp</li>
          <li>Bảo dưỡng da cao cấp</li>
        </ul>

        <h2>Công nghệ hiện đại</h2>
        <p>Sử dụng các thiết bị và công nghệ mới nhất từ châu Âu, đảm bảo chất lượng dịch vụ tốt nhất cho khách hàng.</p>

        <h2>Đội ngũ chuyên nghiệp</h2>
        <p>Đội ngũ kỹ thuật viên được đào tạo bài bản, có chứng chỉ quốc tế về chăm sóc xe cao cấp.</p>
      `
    },
    {
      id: '3',
      title: 'Mở rộng hệ thống đại lý trên toàn quốc',
      description: 'OtoBatHanh tiếp tục mở rộng mạng lưới đại lý, mang dịch vụ chất lượng đến gần hơn với khách hàng.',
      image: '../image/news3.jpg',
      date: '01/05/2024',
      content: `
        <p>OtoBatHanh tự hào thông báo về việc mở rộng mạng lưới đại lý trên toàn quốc:</p>

        <h2>Các chi nhánh mới</h2>
        <ul>
          <li>Chi nhánh Hà Nội: 123 Láng Hạ</li>
          <li>Chi nhánh TP.HCM: 456 Nguyễn Văn Linh</li>
          <li>Chi nhánh Đà Nẵng: 789 Ngô Quyền</li>
        </ul>

        <h2>Tiêu chuẩn dịch vụ</h2>
        <p>Tất cả các chi nhánh đều được trang bị đầy đủ thiết bị hiện đại và đội ngũ nhân viên chuyên nghiệp, đảm bảo chất lượng dịch vụ đồng nhất.</p>

        <h2>Ưu đãi khai trương</h2>
        <p>Nhân dịp khai trương, các chi nhánh mới sẽ có nhiều ưu đãi đặc biệt cho khách hàng.</p>
      `
    }
  ];

  const handleNewsClick = (newsId: string) => {
    navigate(`/news/${newsId}`);
  };

  return (
    <NewsSection>
      <Container>
        <SectionTitle>TIN TỨC KHUYẾN MÃI</SectionTitle>
        <NewsGrid>
          {newsItems.map(item => (
            <NewsCard key={item.id} onClick={() => handleNewsClick(item.id)}>
              <NewsImage src={item.image} alt={item.title} />
              <NewsContent>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsDescription>{item.description}</NewsDescription>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
      </Container>
    </NewsSection>
  );
};

export default News; 