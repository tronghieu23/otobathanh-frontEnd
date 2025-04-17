import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../styles/SharedStyles';
import { getAllNewsAPI } from './API';

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

interface NewsItem {
  _id: string;
  title: string;
  image: string;
  content: string;
  date: string;
}

const News = () => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getAllNewsAPI();
        setNewsItems(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = (newsId: string) => {
    navigate(`/news/${newsId}`);
  };

  return (
    <NewsSection>
      <Container>
        <SectionTitle>TIN TỨC KHUYẾN MÃI</SectionTitle>
        <NewsGrid>
          {newsItems.map(item => (
            <NewsCard key={item._id} onClick={() => handleNewsClick(item._id)}>
              <NewsImage src={item.image} alt={item.title} />
              <NewsContent>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsDescription>{item.content}</NewsDescription>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
      </Container>
    </NewsSection>
  );
};

export default News;