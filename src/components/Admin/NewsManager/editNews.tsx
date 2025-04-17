import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllNewsAPI, deleteNewsAPI } from '../../API';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin: 0;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  
  .MuiTableCell-head {
    font-weight: 600;
    background-color: #f5f5f5;
  }
`;

const StyledPaper = styled(Paper)`
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin: 8px 0;
  padding: 8px;
  background-color: #ffebee;
  border-radius: 4px;
`;

interface News {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  onEdit: (news: News) => void;
}

const EditNews: React.FC<Props> = ({ onEdit }) => {
  const [news, setNews] = useState<News[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await getAllNewsAPI();
      if (Array.isArray(response)) {
        setNews(response);
      } else {
        setError('Dữ liệu không hợp lệ');
      }
    } catch (err) {
      setError('Không thể tải danh sách tin tức');
      console.error('Error fetching news:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (newsItem: News) => {
    onEdit(newsItem);
  };

  const handleDelete = async (newsId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
      try {
        await deleteNewsAPI(newsId);
        setNews(news.filter(n => n._id !== newsId));
        alert('Xóa tin tức thành công!');
      } catch (err) {
        setError('Không thể xóa tin tức');
        console.error('Error deleting news:', err);
      }
    }
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>Quản lý tin tức</Title>
        <SearchInput
          type="text"
          placeholder="Tìm kiếm tin tức..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <StyledTableContainer>
        <StyledPaper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Đang tải...</TableCell>
                </TableRow>
              ) : filteredNews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Không tìm thấy tin tức nào</TableCell>
                </TableRow>
              ) : (
                filteredNews.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell>{item.content.substring(0, 100)}...</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(item)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </StyledPaper>
      </StyledTableContainer>
    </Container>
  );
};

export default EditNews;