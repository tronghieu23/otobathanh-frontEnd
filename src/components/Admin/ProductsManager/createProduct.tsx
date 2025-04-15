import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createProductAPI } from '../../API';

const PageContainer = styled(Container)`
  padding: 40px 0;
`;

const Title = styled(Typography)`
  margin-bottom: 40px !important;
  color: #e31837;
  font-weight: bold !important;
`;

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
  
  .MuiInputLabel-root.Mui-focused {
    color: #e31837;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #e31837 !important;
  color: white !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  font-weight: bold !important;
  width: 100%;
  margin-top: 20px !important;
  
  &:hover {
    background-color: #c41730 !important;
  }
`;

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || !quantity || !category_id) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      setError('');
      let base64Image: string | null = null;

      if (image) {
        base64Image = await convertToBase64(image); // Convert file -> base64
      }

      const payload = {
        name: name.trim(),
        price: Number(price),
        quantity: Number(quantity),
        category_id: category_id.trim(),
        description: description?.trim() || '',
        image: base64Image,          // Gửi ảnh dưới dạng base64 string
        subImages: []                // Nếu sau này cần ảnh phụ
      };

      console.log("🚀 Payload gửi đi:", payload);

      await createProductAPI(payload);
      setSuccess('Thêm sản phẩm thành công!');

      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setCategoryId('');
      setImage(null);

      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Có lỗi xảy ra khi thêm sản phẩm');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <PageContainer maxWidth="lg">
      <Title variant="h4">Thêm Sản Phẩm Mới</Title>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <StyledTextField
                fullWidth
                label="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                error={!name && error !== ''}
                helperText={!name && error !== '' ? 'Tên sản phẩm là bắt buộc' : ''}
              />
            </Box>

            <Box>
              <StyledTextField
                fullWidth
                label="Danh mục"
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                error={!category_id && error !== ''}
                helperText={!category_id && error !== '' ? 'Danh mục là bắt buộc' : ''}
              />
            </Box>

            <Box>
              <StyledTextField
                fullWidth
                label="Giá"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                error={!price && error !== ''}
                helperText={!price && error !== '' ? 'Giá là bắt buộc' : ''}
              />
            </Box>

            <Box>
              <StyledTextField
                fullWidth
                label="Số lượng"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                error={!quantity && error !== ''}
                helperText={!quantity && error !== '' ? 'Số lượng là bắt buộc' : ''}
              />
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <StyledTextField
                fullWidth
                label="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                required
                error={!description && error !== ''}
                helperText={!description && error !== '' ? 'Mô tả là bắt buộc' : ''}
              />
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
                required
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                >
                  Chọn ảnh sản phẩm
                </Button>
              </label>
              {image && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Đã chọn: {image.name}
                </Typography>
              )}
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}

          <SubmitButton
            type="submit"
          >
            Thêm sản phẩm
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default AddProduct; 