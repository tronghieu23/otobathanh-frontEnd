import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useToast } from '../../Styles/ToastProvider';
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

// Add styled components for the search controls
const SearchControls = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
  `;

const SearchSelect = styled.select`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
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
  const showToast = useToast();

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
        showToast('Dữ liệu không hợp lệ!', 'error');
      }
    } catch (err) {
      showToast('Không thể tải danh sách tin tức!', 'error');
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
        showToast('Xóa tin tức thành công!', 'success');
      } catch (err) {
        showToast('Không thể xóa tin tức!', 'error');
        console.error('Error deleting news:', err);
      }
    }
  };

  // Add these new states after existing useState declarations
  const [searchType, setSearchType] = useState('title'); // 'title' or 'content'
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Update the filteredNews logic
  const filteredAndSortedNews = news
    .filter(item => {
      const searchValue = searchTerm.toLowerCase();
      switch (searchType) {
        case 'title':
          return item.title.toLowerCase().includes(searchValue);
        case 'content':
          return item.content.toLowerCase().includes(searchValue);
        default:
          return true;
      }
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Update the Header section in the return statement
  return (
    <Container>
      <Header>
        <Title>Quản lý tin tức</Title>
        <SearchControls>
          <SearchSelect
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">Tìm theo tiêu đề</option>
            <option value="content">Tìm theo nội dung</option>
          </SearchSelect>
          <SearchInput
            type="text"
            placeholder={`Tìm kiếm theo ${searchType === 'title' ? 'tiêu đề' : 'nội dung'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchSelect
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </SearchSelect>
        </SearchControls>
      </Header>

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
              ) : filteredAndSortedNews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Không tìm thấy tin tức nào</TableCell>
                </TableRow>
              ) : (
                filteredAndSortedNews.map((item) => (
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