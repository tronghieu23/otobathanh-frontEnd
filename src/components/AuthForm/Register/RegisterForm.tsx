import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyAccountForm from './VerifyAccountForm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 400px;
    background: white;
    border-radius: 12px;
    padding: 24px;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  color: #e31837;
  font-size: 24px;
  margin: 0;
`;

const CloseButton = styled(IconButton)`
  color: #666 !important;
  padding: 8px !important;
`;

const InputField = styled.div`
  margin-bottom: 16px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #e31837;
  }

  &::placeholder {
    color: #666;
  }
`;

const VisibilityToggle = styled(IconButton)`
  position: absolute !important;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #666 !important;
`;

const RegisterButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 12px;
  background: #e31837;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  margin: 24px 0;
  opacity: ${props => props.$loading ? 0.7 : 1};

  &:hover {
    background: ${props => props.$loading ? '#e31837' : '#c41730'};
  }
`;

const SocialSection = styled.div`
  text-align: center;
`;

const SocialText = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const SocialButton = styled.button<{ $provider: 'facebook' | 'google' }>`
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;
  background: ${props => props.$provider === 'facebook' ? '#1877F2' : '#757575'};

  &:hover {
    background: ${props => props.$provider === 'facebook' ? '#1565C0' : '#616161'};
  }
`;

const ErrorMessage = styled.div`
  color: #e31837;
  font-size: 14px;
  margin-top: 4px;
  text-align: left;
`;

interface RegisterFormProps {
  open: boolean;
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyForm, setShowVerifyForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/accounts/create`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        image: null
      });

      // Close registration form
      onClose();

      // Show verification form
      setShowVerifyForm(true);

    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response?.status === 400) {
        setError(error.response.data);
      } else if (error.response?.status === 500) {
        setError(error.response.data);
      } else {
        setError('Không thể kết nối đến máy chủ');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login clicked`);
  };

  return (
    <>
      <StyledDialog open={open} onClose={onClose}>
        <DialogContent>
          <DialogHeader>
            <Title>Đăng Ký</Title>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <InputField>
              <Input
                type="text"
                name="fullName"
                placeholder="Họ và tên *"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </InputField>

            <InputField>
              <Input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputField>

            <InputField>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Mật khẩu *"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <VisibilityToggle onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </VisibilityToggle>
            </InputField>

            <InputField>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu *"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </InputField>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <RegisterButton type="submit" $loading={loading}>
              {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ'}
            </RegisterButton>
          </form>

          <SocialSection>
            <SocialText>Hoặc đăng ký với</SocialText>
            <SocialButtons>
              <SocialButton
                $provider="facebook"
                onClick={() => handleSocialLogin('facebook')}
              >
                <FacebookIcon />
                <span>Facebook</span>
              </SocialButton>
              <SocialButton
                $provider="google"
                onClick={() => handleSocialLogin('google')}
              >
                <GoogleIcon />
                <span>Google</span>
              </SocialButton>
            </SocialButtons>
          </SocialSection>
        </DialogContent>
      </StyledDialog>

      <VerifyAccountForm
        open={showVerifyForm}
        onClose={() => setShowVerifyForm(false)}
        email={formData.email}
      />
    </>
  );
};

export default RegisterForm; 