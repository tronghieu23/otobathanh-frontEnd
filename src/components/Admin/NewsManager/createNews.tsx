import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { createNewsAPI, updateNewsAPI } from '../../API';

const FormContainer = styled(Box)`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px !important;
  
  .MuiOutlinedInput-root {
    border-radius: 8px;
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #e31837;
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #e31837;
    }
  }
`;

interface CreateNewsProps {
  selectedNews: any;
  onSuccess: () => void;
}

const CreateNews: React.FC<CreateNewsProps> = ({ selectedNews, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (selectedNews) {
      setFormData({
        title: selectedNews.title,
        content: selectedNews.content,
      });
      setCurrentImage(selectedNews.image);
    }
  }, [selectedNews]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let base64Image = null;
      if (image) {
        base64Image = await convertToBase64(image);
      }

      const newsData = {
        ...formData,
        image: base64Image,
      };

      if (selectedNews) {
        await updateNewsAPI(selectedNews._id, newsData);
        setSuccess('Cập nhật tin tức thành công!');
        // Return to edit tab immediately after successful update
        onSuccess();
      } else {
        await createNewsAPI(newsData);
        setSuccess('Thêm tin tức mới thành công!');
        onSuccess();
      }

    } catch (error) {
      setError('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <FormContainer>
      <Typography variant="h5" sx={{ mb: 4, color: '#e31837', fontWeight: 'bold' }}>
        {selectedNews ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="Tiêu đề"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <StyledTextField
          fullWidth
          label="Nội dung"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />

        <Box sx={{ mb: 3 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '10px' }}
          />
          {(currentImage || image) && (
            <Box sx={{ mt: 2 }}>
              <img
                src={image ? URL.createObjectURL(image) : currentImage || ''}
                alt="Preview"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </Box>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#e31837',
            '&:hover': { bgcolor: '#c41730' },
            py: 1.5,
            px: 4
          }}
        >
          {selectedNews ? "Cập nhật" : "Thêm mới"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default CreateNews;