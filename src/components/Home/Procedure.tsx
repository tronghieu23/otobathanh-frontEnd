import React from 'react';
import '../Css/Procedure.css';

interface Step {
  title: string;
  description: string;
  icon: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const steps: Step[] = [
  {
    title: 'CUỘC HẸN',
    description:
      'Bạn có thể trực tiếp đến xưởng dịch vụ của chúng tôi hoặc để lại thông tin để đội ngũ chúng tôi liên lạc.',
    icon: '/image/procedure1.jpg',
    position: 'top-left',
  },
  {
    title: 'CHẨN ĐOÁN',
    description:
      'Chúng tôi đã đầu tư vào các công cụ và phần mềm chẩn đoán hiện đại cho xe của bạn.',
    icon: '/image/procedure2.jpg',
    position: 'top-right',
  },
  {
    title: 'SỬA CHỮA',
    description:
      'Chúng tôi là xưởng sửa chữa hàng đầu với thợ có trình độ cao tại Sài Gòn.',
    icon: '/image/procedure3.jpg',
    position: 'bottom-left',
  },
  {
    title: 'HOÀN THÀNH',
    description:
      'Xe của bạn sẽ được vệ sinh sạch sẽ và trả đúng hẹn sau khi hoàn thành.',
    icon: '/image/procedure4.jpg',
    position: 'bottom-right',
  },
];

const WorkProcess: React.FC = () => {
  return (
    <div className="work-process-container">
      <h2 className="work-process-title">QUY TRÌNH LÀM VIỆC CỦA CHÚNG TÔI</h2>
      <p className="work-process-subtitle">
        Cho dù chiếc xe của bạn cần dịch vụ thường xuyên hoặc sửa chữa khẩn cấp, bạn có thể tin tưởng vào đội ngũ chuyên gia của chúng tôi.
      </p>
      
      <div className="work-process-wrapper">
        <div className="car-center">
          <img src="/image/procedure.jpg" alt="Car" />
        </div>

        {steps.map((step, index) => (
          <div key={index} className={`step-box ${step.position}`}>
            <img src={step.icon} alt={step.title} className="step-icon" />
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkProcess;
