import React from 'react';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MapSection = styled.div`
  margin-top: 40px;
  
  h2 {
    color: #e31837;
    font-size: 24px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ContactInfo = styled.div`
  h2 {
    color: #e31837;
    font-size: 24px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  p {
    color: #333;
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 20px;
  }
`;

const InfoList = styled.div`
  margin-top: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  
  svg {
    color: #e31837;
    margin-right: 15px;
    margin-top: 3px;
  }

  div {
    h3 {
      color: #333;
      font-size: 16px;
      margin-bottom: 5px;
      font-weight: 600;
    }

    p {
      color: #666;
      font-size: 15px;
      margin: 0;
    }
  }
`;

const ContactForm = styled.form`
  background: #f8f8f8;
  padding: 30px;
  border-radius: 8px;

  h2 {
    color: #e31837;
    font-size: 24px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    color: #333;
    margin-bottom: 8px;
    font-size: 15px;
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 15px;

    &:focus {
      outline: none;
      border-color: #e31837;
    }
  }

  textarea {
    height: 120px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  background: #e31837;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c41230;
  }
`;

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <ContactContainer>
      <ContactGrid>
        <ContactInfo>
          <h2>Thông tin liên hệ</h2>
          <p>
            Honda Ô tô Bá Thành - Đại lý ủy quyền chính thức của Honda Việt Nam. 
            Chúng tôi luôn sẵn sàng phục vụ quý khách với dịch vụ tốt nhất.
          </p>
          <InfoList>
            <InfoItem>
              <LocationOnIcon />
              <div>
                <h3>Địa chỉ</h3>
                <p>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
              </div>
            </InfoItem>
            <InfoItem>
              <PhoneIcon />
              <div>
                <h3>Điện thoại</h3>
                <p>0123.456.789 - 0987.654.321</p>
              </div>
            </InfoItem>
            <InfoItem>
              <EmailIcon />
              <div>
                <h3>Email</h3>
                <p>info@hondabathanh.com</p>
              </div>
            </InfoItem>
            <InfoItem>
              <AccessTimeIcon />
              <div>
                <h3>Giờ làm việc</h3>
                <p>Thứ 2 - Chủ nhật: 8:00 - 20:00</p>
              </div>
            </InfoItem>
          </InfoList>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <h2>Gửi thông tin</h2>
          <FormGroup>
            <label>Họ và tên</label>
            <input type="text" placeholder="Nhập họ và tên" required />
          </FormGroup>
          <FormGroup>
            <label>Số điện thoại</label>
            <input type="tel" placeholder="Nhập số điện thoại" required />
          </FormGroup>
          <FormGroup>
            <label>Email</label>
            <input type="email" placeholder="Nhập địa chỉ email" required />
          </FormGroup>
          <FormGroup>
            <label>Nội dung</label>
            <textarea placeholder="Nhập nội dung liên hệ" required></textarea>
          </FormGroup>
          <SubmitButton type="submit">Gửi thông tin</SubmitButton>
        </ContactForm>
      </ContactGrid>

      <MapSection>
        <h2>Vị trí của chúng tôi</h2>
        <MapContainer>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197156!2d106.64037661533417!3d10.77900166219799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2sHonda%20Vietnam!5e0!3m2!1sen!2s!4v1659429787854!5m2!1sen!2s"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ vị trí Honda Ô tô Bá Thành"
          />
        </MapContainer>
      </MapSection>
    </ContactContainer>
  );
};

export default Contact; 