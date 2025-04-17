import React, { useState, useEffect } from 'react';
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
import { createProductAPI, updateProductAPI } from '../../API';

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

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category_id: {
    _id: string;
    name: string;
  };
  description: string;
  image: string;
  subImages: string[];
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface EditFormData {
  name: string;
  price: string;
  quantity: string;
  category_id: {
    _id: string;
    name: string;
  };
  description: string;
}

interface Props {
  onSuccess: () => void;
  editingProduct: Product | null;
}

const CreateProduct: React.FC<Props> = ({ onSuccess, editingProduct }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EditFormData>({
    name: '',
    price: '',
    quantity: '',
    category_id: { _id: '', name: '' },
    description: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        quantity: editingProduct.quantity.toString(),
        category_id: editingProduct.category_id,
        description: editingProduct.description || ''
      });
      setCurrentImage(editingProduct.image);
    }
  }, [editingProduct]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.quantity || !formData.category_id._id) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      let base64Image = null;
      if (image) {
        base64Image = await convertToBase64(image);
      }

      const newProduct = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        category_id: formData.category_id,
        image: base64Image
      };

      await createProductAPI(newProduct);
      setSnackbar({
        open: true,
        message: 'Thêm sản phẩm thành công!',
        severity: 'success'
      });

      // Reset form
      setFormData({
        name: '',
        price: '',
        quantity: '',
        category_id: { _id: '', name: '' },
        description: ''
      });
      setImage(null);
      setCurrentImage(null);
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: 'Có lỗi xảy ra khi thêm sản phẩm',
        severity: 'error'
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.quantity || !formData.category_id._id) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      let base64Image = null;
      if (image) {
        base64Image = await convertToBase64(image);
      }

      const updatedProduct = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        category_id: formData.category_id,
        image: base64Image || currentImage
      };

      if (editingProduct) {
        await updateProductAPI(editingProduct._id, updatedProduct);
        setSnackbar({
          open: true,
          message: 'Cập nhật sản phẩm thành công!',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: 'Có lỗi xảy ra khi cập nhật sản phẩm',
        severity: 'error'
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <PageContainer maxWidth="lg">
      <Title variant="h4">{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm Sản Phẩm Mới"}</Title>

      <FormContainer>
        <form onSubmit={editingProduct ? handleUpdate : handleSubmit}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <StyledTextField
                fullWidth
                label="Tên sản phẩm"
                value={formData.name}
                onChange={handleFormChange}
                name="name"
                required
                error={!formData.name && error !== ''}
                helperText={!formData.name && error !== '' ? 'Tên sản phẩm là bắt buộc' : ''}
              />
            </Box>

            <Box>
              <StyledTextField
                fullWidth
                label="Danh mục"
                value={formData.category_id.name}
                onChange={handleFormChange}
                name="category_id.name"
                required
                error={!formData.category_id.name && error !== ''}
                helperText={!formData.category_id.name && error !== '' ? 'Danh mục là bắt buộc' : ''}
              />
            </Box>

            <Box>
              <StyledTextField
                fullWidth
                label="Giá"
                type="number"
                value={formData.price}
                onChange={handleFormChange}
                name="price"
                required
                error={!formData.price && error !== ''}
                helperText={!formData.price && error !== '' ? 'Giá là bắt buộc' : ''}
              />
            </Box>

            <Box>
              <StyledTextField
                fullWidth
                label="Số lượng"
                type="number"
                value={formData.quantity}
                onChange={handleFormChange}
                name="quantity"
                required
                error={!formData.quantity && error !== ''}
                helperText={!formData.quantity && error !== '' ? 'Số lượng là bắt buộc' : ''}
              />
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <StyledTextField
                fullWidth
                label="Mô tả"
                value={formData.description}
                onChange={handleFormChange}
                name="description"
                multiline
                rows={4}
                required
                error={!formData.description && error !== ''}
                helperText={!formData.description && error !== '' ? 'Mô tả là bắt buộc' : ''}
              />
            </Box>

            <Box sx={{ gridColumn: '1 / -1', mb: 3 }}>
              {currentImage && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Ảnh hiện tại:</Typography>
                  <img
                    src={currentImage}
                    alt="Current product"
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </Box>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                >
                  {editingProduct ? "Thay đổi ảnh" : "Chọn ảnh sản phẩm"}
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

          <Box sx={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setFormData({
                  name: '',
                  price: '',
                  quantity: '',
                  category_id: { _id: '', name: '' },
                  description: ''
                });
                setImage(null);
                setCurrentImage(null);
              }}
            >
              Làm mới
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {editingProduct ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Box>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default CreateProduct; 