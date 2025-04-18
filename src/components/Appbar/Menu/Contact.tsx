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
            Công ty cung cấp nhiều dịch vụ như bảo dưỡng nhanh, đồng sơn cao cấp (DUPONT & 3M), sửa chữa lưu động, và cứu hộ giao thông. Với trang thiết bị hiện đại và đội ngũ kỹ thuật viên chuyên nghiệp, Ô tô Bá Thành cam kết mang đến chất lượng dịch vụ tốt nhất cho khách hàng.
          </p>
          <InfoList>
            <InfoItem>
              <LocationOnIcon />
              <div>
                <h3>Địa chỉ</h3>
                <p>462 Phan Văn Trị, Phường 7, Quận Gò Vấp, TP.HCM</p>
                <p>​19 Phan Văn Trị, Phường 7, Quận Gò Vấp, TP.HCM</p>
              </div>
            </InfoItem>
            <InfoItem>
              <PhoneIcon />
              <div>
                <h3>Điện thoại</h3>
                <p>0913.169.066 - 1900.866.876</p>
              </div>
            </InfoItem>
            <InfoItem>
              <EmailIcon />
              <div>
                <h3>Email</h3>
                <p>otobathanh@gmail.com</p>
                <p>nhan.duong@otobathanh.com</p>
              </div>
            </InfoItem>
            <InfoItem>
              <AccessTimeIcon />
              <div>
                <h3>Giờ làm việc</h3>
                <p>​Thứ Hai - Thứ Bảy: 7:30 - 17:00</p>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.872957774987!2d106.684123!3d10.822155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d1b2a4b1b3%3A0x3f2c4d5e6f7g8h9i!2s19%20Phan%20V%C4%83n%20Tr%E1%BB%8B%2C%20Ph%C6%B0%E1%BB%9Dng%207%2C%20G%C3%B2%20V%E1%BA%A5p%2C%20TP.HCM!5e0!3m2!1sen!2s!4v1610000000001!5m2!1sen!2s"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ vị trí Honda Ô tô Bá Thành"
          />
        </MapContainer>
      </MapSection>
      <MapSection>
        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456789012!2d106.700000!3d10.830000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d1b2a4b1b3%3A0x4j5k6l7m8n9o0p1q!2s15%20TL08%2C%20Ph%C6%B0%E1%BB%9Dng%20Th%E1%BA%A1nh%20L%E1%BB%99c%2C%20Qu%E1%BA%ADn%2012%2C%20TP.HCM!5e0!3m2!1sen!2s!4v1610000000002!5m2!1sen!2s"
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