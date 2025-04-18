import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { updateAccountAPI, getAccountByIdAPI } from '../../API';
import { getCurrentUser } from '../../Utils/auth';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 120px auto 40px;
  padding: 20px;
`;

const Title = styled.h2`
  color: #1e2124;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #1e2124;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #e31837;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  background-color: #e31837;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c41730;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const ErrorMessage = styled.p`
  color: #e31837;
  margin-top: 5px;
  font-size: 14px;
`;

const SuccessMessage = styled.p`
  color: #28a745;
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
`;

const UpdateAccount = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const [formData, setFormData] = useState(() => ({
        fullName: user?.fullName || '',
        email: user?.email || '',
        roles: user?.roles?.[0]?.name || '',
        createdAt: '',
    }));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                if (user?.id) {
                    const response = await getAccountByIdAPI(user.id);
                    if (response && response.account) {
                        const acc = response.account;
                        setFormData({
                            fullName: acc.fullName || '',
                            email: acc.email || '',
                            roles: Array.isArray(acc.roles) || '',
                            createdAt: acc.createdAt
                                ? new Date(acc.createdAt).toLocaleDateString('vi-VN')
                                : '',
                        });
                    }
                }
            } catch (err) {
                setError('Không thể tải thông tin tài khoản');
            }
        };
        fetchAccountData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        console.log(formData);

        try {

            await updateAccountAPI(user.id, formData);
            setSuccess('Cập nhật thông tin thành công');

        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi cập nhật thông tin');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/account/profile');
    };

    return (
        <Container>
            <Title>Cập Nhật Thông Tin Tài Khoản</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Họ và tên</Label>
                    <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Ngày tạo tài khoản</Label>
                    <Input
                        type="text"
                        value={formData.createdAt}
                        onChange={handleChange}
                    />
                </FormGroup>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}

                <ButtonGroup>
                    <CancelButton type="button" onClick={handleCancel}>
                        Hủy
                    </CancelButton>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                    </Button>
                </ButtonGroup>
            </Form>
        </Container>
    );
};

export default UpdateAccount;