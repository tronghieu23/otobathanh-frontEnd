import styled from 'styled-components';

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  color: #e31837;
  margin-bottom: 40px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  position: relative;
  padding-bottom: 15px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #e31837;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 30px;
  }
`; 