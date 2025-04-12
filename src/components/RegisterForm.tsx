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

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #e31837;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 24px 0;

  &:hover {
    background: #c41730;
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

const SocialButtonText = styled.span`
  font-size: 14px;
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

  img {
    width: 20px;
    height: 20px;
  }
`;

interface RegisterFormProps {
  open: boolean;
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <Title>Đăng ký</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <InputField>
            <Input
              type="text"
              name="email"
              placeholder="Email hoặc Tên tài khoản *"
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
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu *"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </InputField>

          <RegisterButton type="submit">
            ĐĂNG KÝ
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
              <SocialButtonText>Facebook</SocialButtonText>
            </SocialButton>
            <SocialButton
              $provider="google"
              onClick={() => handleSocialLogin('google')}
            >
              <GoogleIcon />
              <SocialButtonText>Google</SocialButtonText>
            </SocialButton>
          </SocialButtons>
        </SocialSection>
      </DialogContent>
    </StyledDialog>
  );
};

export default RegisterForm; 