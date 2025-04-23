import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getNewsByIdAPI, getAllNewsAPI } from '../API';

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

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        if (id) {
          // Fetch current news
          const newsData = await getNewsByIdAPI(id);
          setCurrentNews(newsData);

          // Fetch all news for related news
          const allNews = await getAllNewsAPI();
          const filtered = allNews.filter((news: NewsItem) => news._id !== id).slice(0, 3);
          setRelatedNews(filtered);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNewsDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, navigate]);

  if (!currentNews && id) {
    return <div>Loading...</div>;
  }

  return (
    <NewsContainer>
      {currentNews ? (
        <>
          <NewsHeader>
            <NewsTitle>{currentNews.title}</NewsTitle>
            <NewsMeta>
              ĐĂNG VÀO <span>{new Date(currentNews.createdAt).toLocaleDateString('vi-VN')}</span> BỞI <span>ADMIN</span>
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
                  <li key={news._id} onClick={() => navigate(`/news/${news._id}`)}>
                    {news.title}
                  </li>
                ))}
              </ul>
            </Sidebar>
          </NewsContent>
        </>
      ) : null}
    </NewsContainer>
  );
};

export default NewsPage;