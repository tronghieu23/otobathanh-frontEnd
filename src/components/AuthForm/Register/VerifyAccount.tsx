import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { verifyAccountAPI } from '../../API';
import { useToast } from '../../Styles/ToastProvider';

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

const VerifyButton = styled.button<{ $loading?: boolean }>`
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

const ErrorMessage = styled.div`
  color: #e31837;
  font-size: 14px;
  margin-top: 4px;
  text-align: left;
`;

const Message = styled.p`
  color: #666;
  font-size: 14px;
  text-align: center;
  margin: 16px 0;
`;

interface VerifyAccountFormProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

const VerifyAccountForm: React.FC<VerifyAccountFormProps> = ({ open, onClose, email }) => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await verifyAccountAPI(email, verificationCode);

      if (response.status === "thành công") {
        alert(response.message);
        onClose();
        navigate('/');
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      if (error.response?.data?.message) {
        console.error('Verification error:', error.response.data.message);
      } else {
        showToast('Có lỗi xảy ra khi xác thực tài khoản!', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <Title>Xác Thực Tài Khoản</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </DialogHeader>

        <Message>
          Vui lòng nhập mã xác thực 6 số đã được gửi đến email của bạn
        </Message>

        <form onSubmit={handleSubmit}>
          <InputField>
            <Input
              type="text"
              placeholder="Nhập mã xác thực"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              pattern="[0-9]{6}"
              required
            />
          </InputField>

          <VerifyButton type="submit" $loading={loading}>
            {loading ? 'ĐANG XỬ LÝ...' : 'XÁC THỰC'}
          </VerifyButton>
        </form>
      </DialogContent>
    </StyledDialog>
  );
};

export default VerifyAccountForm; 