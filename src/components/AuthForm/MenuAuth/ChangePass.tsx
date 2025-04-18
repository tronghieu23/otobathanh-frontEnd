import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAccountByIdAPI } from '../../API';
import { getCurrentUser } from '../../Utils/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  max-width: 600px;
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

const Button = styled.button`
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

const ErrorMessage = styled.p`
  color: #e31837;
  margin-top: 5px;
  font-size: 14px;
`;

const SuccessMessage = styled.p`
  color: #28a745;
  margin-top: 5px;
  font-size: 14px;
`;

const ChangePass = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.id) {
          const response = await getAccountByIdAPI(user.id);
          if (response && response.account) {
            setUserData(response.account);
          }
        }
      } catch (err) {
        setError('Không thể tải thông tin người dùng');
      }
    };

    fetchUserData();
  }, [user]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.oldPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.oldPassword,
      });

      if (response.data) {
        setIsVerified(true);
        setSuccess('Xác thực thành công. Vui lòng nhập mật khẩu mới.');
      }
    } catch (err) {
      setError('Email hoặc mật khẩu không chính xác');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/accounts/${user?.id}/change-password`, {
        newPassword: formData.newPassword,
      });

      if (response.data) {
        setSuccess('Đổi mật khẩu thành công');
        setTimeout(() => {
          navigate('/account/profile');
        }, 2000);
      }
    } catch (err) {
      setError('Không thể đổi mật khẩu');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Title>Đổi Mật Khẩu</Title>
      <Form onSubmit={isVerified ? handleChangePassword : handleVerify}>
        {!isVerified ? (
          <>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email của bạn"
              />
            </FormGroup>
            <FormGroup>
              <Label>Mật khẩu hiện tại</Label>
              <Input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu hiện tại"
              />
            </FormGroup>
          </>
        ) : (
          <>
            <FormGroup>
              <Label>Mật khẩu mới</Label>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu mới"
              />
            </FormGroup>
            <FormGroup>
              <Label>Xác nhận mật khẩu mới</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Nhập lại mật khẩu mới"
              />
            </FormGroup>
          </>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Button type="submit">
          {isVerified ? 'Đổi mật khẩu' : 'Xác thực'}
        </Button>
      </Form>
    </Container>
  );
};

export default ChangePass;