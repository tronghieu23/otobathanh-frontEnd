import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NewsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const NewsHeader = styled.div`
  margin-bottom: 30px;
`;

const NewsTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const NewsMeta = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 30px;
  
  span {
    color: #e31837;
  }
`;

const NewsContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-top: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  p {
    color: #333;
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 20px;
  }
`;

const Sidebar = styled.div`
  h3 {
    color: #e31837;
    font-size: 18px;
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      cursor: pointer;

      &:hover {
        color: #e31837;
      }
    }
  }
`;

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Mảng tin tức mẫu (trong thực tế sẽ lấy từ API)
  const newsData = [
    {
      id: '1',
      title: 'Chương trình khuyến mãi đặc biệt tháng 6',
      content: 'Nội dung chi tiết về chương trình khuyến mãi...',
      date: '20/03/2024',
      image: '../image/news1.jpg'
    },
    {
      id: '2',
      title: 'Ra mắt dịch vụ chăm sóc xe cao cấp',
      content: 'Thông tin về dịch vụ chăm sóc xe mới...',
      date: '18/03/2024',
      image: '../image/news2.jpg'
    },
    {
      id: '3',
      title: 'Mở rộng hệ thống đại lý trên toàn quốc',
      content: 'Chi tiết về kế hoạch mở rộng...',
      date: '15/03/2024',
      image: '../image/news3.jpg'
    }
  ];

  const currentNews = newsData.find(news => news.id === id);
  const relatedNews = newsData.filter(news => news.id !== id).slice(0, 3);

  const handleBack = () => {
    navigate(-1);
  };

  if (!currentNews && id) {
    navigate('/news');
    return null;
  }

  return (
    <NewsContainer>
      {currentNews ? (
        <>
          <NewsHeader>
            <NewsTitle>{currentNews.title}</NewsTitle>
            <NewsMeta>
              ĐĂNG VÀO <span>{currentNews.date}</span> BỞI <span>ADMIN</span>
            </NewsMeta>
          </NewsHeader>

          <NewsContent>
            <MainContent>
              <img src={currentNews.image} alt={currentNews.title} />
              <p>{currentNews.content}</p>
            </MainContent>

            <Sidebar>
              <h3>Tin tức liên quan</h3>
              <ul>
                {relatedNews.map(news => (
                  <li key={news.id} onClick={() => navigate(`/news/${news.id}`)}>
                    {news.title}
                  </li>
                ))}
              </ul>
            </Sidebar>
          </NewsContent>
        </>
      ) : (
        <div>
          {/* Hiển thị danh sách tin tức ở đây */}
          <h1>Tin tức</h1>
          <div>
            {newsData.map(news => (
              <div key={news.id} onClick={() => navigate(`/news/${news.id}`)}>
                <img src={news.image} alt={news.title} />
                <h3>{news.title}</h3>
                <p>{news.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </NewsContainer>
  );
};

export default NewsPage; 