import React from 'react';
import styled from 'styled-components';
import News from '../components/News';

const PageContainer = styled.div`
  padding-top: 80px;
`;

const NewsPage = () => {
  return (
    <PageContainer>
      <News />
    </PageContainer>
  );
};

export default NewsPage; 