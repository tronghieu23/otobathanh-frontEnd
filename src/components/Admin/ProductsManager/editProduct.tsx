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
import { getAllProductsAPI, deleteProductAPI, updateProductAPI } from '../../API';
import { useNavigate } from 'react-router-dom';

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

const ActionButton = styled(IconButton)`
  padding: 6px !important;
  margin-left: 8px !important;
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

const ImageCell = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin: 8px 0;
  padding: 8px;
  background-color: #ffebee;
  border-radius: 4px;
`;

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

interface Props {
  onEdit: (product: Product) => void;
}

const EditProduct: React.FC<Props> = ({ onEdit }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<EditFormData>({
        name: '',
        price: '',
        quantity: '',
        category_id: {
            _id: '',
            name: ''
        },
        description: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                name: selectedProduct.name,
                price: selectedProduct.price.toString(),
                quantity: selectedProduct.quantity.toString(),
                category_id: selectedProduct.category_id,
                description: selectedProduct.description
            });
        }
    }, [selectedProduct]);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await getAllProductsAPI();
            if (Array.isArray(response)) {
                setProducts(response);
            } else {
                setError('Dữ liệu không hợp lệ');
            }
        } catch (err) {
            setError('Không thể tải danh sách sản phẩm');
            console.error('Error fetching products:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        onEdit(product);
    };

    const handleDelete = async (productId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProductAPI(productId);
                setProducts(products.filter(p => p._id !== productId));
                alert('Xóa sản phẩm thành công!');
            } catch (err) {
                setError('Không thể xóa sản phẩm');
                console.error('Error deleting product:', err);
            }
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.category_id && product.category_id.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <Container>
            <Header>
                <Title>Quản lý sản phẩm</Title>
                <SearchInput
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
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
                                <TableCell>Hình ảnh</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Danh mục</TableCell>
                                <TableCell>Mô tả</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell align="right">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">Đang tải...</TableCell>
                                </TableRow>
                            ) : filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">Không tìm thấy sản phẩm nào</TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>
                                            <ImageCell src={product.image || '/placeholder-image.jpg'} alt={product.name} />
                                        </TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{formatPrice(product.price)}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.category_id.name}</TableCell>
                                        <TableCell>
                                            {product.description ? (
                                                <span title={product.description}>
                                                    {product.description.length > 50
                                                        ? `${product.description.substring(0, 50)}...`
                                                        : product.description}
                                                </span>
                                            ) : (
                                                <span style={{ color: '#999' }}>Không có mô tả</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(product.createdAt).toLocaleDateString('vi-VN')}
                                        </TableCell>
                                        <TableCell align="right">
                                            <ActionButton onClick={() => handleEdit(product)} color="primary">
                                                <EditIcon />
                                            </ActionButton>
                                            <ActionButton onClick={() => handleDelete(product._id)} color="error">
                                                <DeleteIcon />
                                            </ActionButton>
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

export default EditProduct;
