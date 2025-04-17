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
import { getAllAccountsAPI, deleteAccountAPI} from '../../API';
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

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin: 8px 0;
  padding: 8px;
  background-color: #ffebee;
  border-radius: 4px;
`;

interface EditFormData {
    fullName: string;
    email: string;
    password: string;
    image: string;
    roles: {
        _id: string;
        name: string;
    }[];
    status: boolean;
}

interface Account {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    image: string;
    roles: {
        _id: string;
        name: string;
    }[];
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    onEdit: (account: Account) => void;
}

const EditAccount: React.FC<Props> = ({ onEdit }) => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<EditFormData>({
        fullName: '',
        email: '',
        password: '',
        image: '',
        roles: [],
        status: true
    });

    useEffect(() => {
        fetchAccounts();
    }, []);

    useEffect(() => {
        if (selectedAccount) {
            setFormData({
                fullName: selectedAccount.fullName,
                email: selectedAccount.email,
                password: '',
                image: selectedAccount.image,
                roles: selectedAccount.roles,
                status: selectedAccount.status
            });
        }
    }, [selectedAccount]);

    const fetchAccounts = async () => {
        try {
            setIsLoading(true);
            const response = await getAllAccountsAPI();
            if (Array.isArray(response)) {
                setAccounts(response);
            } else {
                setError('Dữ liệu không hợp lệ');
            }
        } catch (err) {
            setError('Không thể tải danh sách tài khoản');
            console.error('Error fetching accounts:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (account: Account) => {
        onEdit(account);
    };

    const handleDelete = async (accountId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
            try {
                await deleteAccountAPI(accountId);
                setAccounts(accounts.filter(a => a._id !== accountId));
                alert('Xóa tài khoản thành công!');
            } catch (err) {
                setError('Không thể xóa tài khoản');
                console.error('Error deleting account:', err);
            }
        }
    };

    const filteredAccounts = accounts.filter(account =>
        account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Header>
                <Title>Quản lý tài khoản</Title>
                <SearchInput
                    type="text"
                    placeholder="Tìm kiếm tài khoản..."
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
                                <TableCell>Tên đăng nhập</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Vai trò</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell align="right">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">Đang tải...</TableCell>
                                </TableRow>
                            ) : filteredAccounts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">Không tìm thấy tài khoản nào</TableCell>
                                </TableRow>
                            ) : (
                                filteredAccounts.map((account) => (
                                    <TableRow key={account._id}>
                                        <TableCell>{account.fullName}</TableCell>
                                        <TableCell>{account.email}</TableCell>
                                        <TableCell>{account.roles.map(role => role.name).join(', ')}</TableCell>
                                        <TableCell>{account.status ? 'Kích hoạt' : 'Không kích hoạt'}</TableCell>
                                        <TableCell>
                                            {new Date(account.createdAt).toLocaleDateString('vi-VN')}
                                        </TableCell>
                                        <TableCell align="right">
                                            <ActionButton onClick={() => handleEdit(account)} color="primary">
                                                <EditIcon />
                                            </ActionButton>
                                            <ActionButton onClick={() => handleDelete(account._id)} color="error">
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

export default EditAccount;
