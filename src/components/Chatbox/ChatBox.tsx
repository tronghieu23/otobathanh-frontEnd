import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, Paper, TextField, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled(IconButton)`
  background-color: #e31837 !important;
  color: white !important;
  width: 56px;
  height: 56px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #c41730 !important;
  }
`;

const ChatWindow = styled(Paper)`
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
`;

const ChatHeader = styled.div`
  background-color: #e31837;
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Message = styled.div<{ $isUser?: boolean }>`
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 12px;
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.$isUser ? '#e31837' : '#f0f0f0'};
  color: ${props => props.$isUser ? 'white' : 'black'};
`;

const InputContainer = styled.div`
  padding: 12px;
  display: flex;
  gap: 8px;
  border-top: 1px solid #eee;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
`;

const SendButton = styled(IconButton)`
  color: #e31837 !important;
`;

interface ChatMessage {
  text: string;
  isUser: boolean;
}

const autoResponses = {
  'xin chào': 'Xin chào! Tôi có thể giúp gì cho bạn?',
  'giá': 'Để biết giá cụ thể của dịch vụ, vui lòng cho chúng tôi biết loại xe và dịch vụ bạn cần. Hoặc gọi số hotline: 1900.866.876',
  'địa chỉ': '19 Phan Văn Trị, Phường 07, Quận Gò Vấp, Tp HCM',
  'liên hệ': 'Bạn có thể liên hệ với chúng tôi qua:\nHotline: 1900.866.876\nDi động: 0908.751.765 - 0913.169.066\nEmail: otobathanh@gmail.com',
  'default': 'Cảm ơn bạn đã liên hệ. Vui lòng để lại số điện thoại, chúng tôi sẽ gọi lại cho bạn sớm nhất!'
};

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: 'Xin chào! Tôi có thể giúp gì cho bạn?', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Find auto response
    const lowerInput = inputText.toLowerCase();
    let responseText = autoResponses.default;
    
    for (const [key, value] of Object.entries(autoResponses)) {
      if (lowerInput.includes(key)) {
        responseText = value;
        break;
      }
    }

    setTimeout(() => {
      const botResponse = { text: responseText, isUser: false };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer>
      {isOpen && (
        <ChatWindow elevation={3}>
          <ChatHeader>
            <ChatTitle>Hỗ trợ trực tuyến</ChatTitle>
            <IconButton size="small" onClick={() => setIsOpen(false)} style={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </ChatHeader>
          <MessagesContainer>
            {messages.map((message, index) => (
              <Message key={index} $isUser={message.isUser}>
                {message.text}
              </Message>
            ))}
          </MessagesContainer>
          <InputContainer>
            <StyledTextField
              placeholder="Nhập tin nhắn..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              multiline
              maxRows={3}
            />
            <SendButton onClick={handleSend}>
              <SendIcon />
            </SendButton>
          </InputContainer>
        </ChatWindow>
      )}
      <ChatButton onClick={() => setIsOpen(true)}>
        <ChatIcon />
      </ChatButton>
    </ChatContainer>
  );
};

export default ChatBox; 