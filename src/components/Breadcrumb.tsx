import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadcrumbContainer = styled.div`
  margin-top: 120px;
  padding: 20px 0;
  background-color: #f5f5f5;
`;

const BreadcrumbList = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 14px;
  color: #666;
`;

const BreadcrumbItem = styled(Link)`
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #e31837;
  }
`;

const Separator = styled(NavigateNextIcon)`
  margin: 0 8px;
  color: #666;
  font-size: 16px;
`;

const CurrentPage = styled.span`
  color: #e31837;
  text-transform: uppercase;
  font-weight: 500;
`;

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  const getPageTitle = (path: string) => {
    switch(path) {
      case 'services':
        return 'DỊCH VỤ SỬA CHỮA';
      case 'products':
        return 'Sản phẩm';
      case 'about':
        return 'Giới thiệu';
      case 'contact':
        return 'Liên hệ';
      default:
        return 'Trang chủ';
    }
  };

  if (location.pathname === '/') return null;

  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        <BreadcrumbItem to="/">
          Trang chủ
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={segment}>
            <Separator />
            {index === pathSegments.length - 1 ? (
              <CurrentPage>{getPageTitle(segment)}</CurrentPage>
            ) : (
              <BreadcrumbItem to={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                {getPageTitle(segment)}
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb; 