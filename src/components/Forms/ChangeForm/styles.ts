import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;
`;

export const FormContainer = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #141414;
  color: white;
`;

export const Image = styled.img`
  position: absolute;
  top: 40px;
  left: 40px;
  max-width: 150px;
  object-fit: scale-down;
`;

export const Title = styled.h1`
  width: 450px;
  font-size: 2rem;
  margin-bottom: 0.5rem;

  @media (max-width: 1065px) {
    font-size: 1.4rem;
    width: 300px;
  }
`;

export const SubTitle = styled.p`
  width: 450px;
  margin-bottom: 2rem;

  @media (max-width: 1065px) {
    width: 300px;
    font-size: 0.9rem;
  }
`;

export const Label = styled.p`
  width: 450px;
  margin-top: 1rem;
  margin-bottom: 5px;

  @media (max-width: 1065px) {
    width: 300px;
  }
`;

export const Input = styled.input`
  border: 1px solid #9eabbe;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 5px;

  padding: 0 1rem;
  width: 450px;
  height: 2.75rem;
  margin-top: 8px;

  font-size: 0.9rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  outline: none;

  &:disabled {
    color: ${({ theme }) => theme.colors.default};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4c};
  }

  &:focus-visible {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1065px) {
    width: 300px;
  }
`;

export const ErrorMessage = styled.h3`
  width: 450px;
  margin-top: 5px;
  font-size: 8pt;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.error};

  @media (max-width: 1065px) {
    width: 300px;
  }
`;

export const Button = styled.button`
  width: 200px;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  margin: 3rem 0 1rem 0;
  cursor: pointer;

  &:hover {
    background-color: #057449;
  }
`;

export const BackText = styled.p`
  width: 450px;
  text-decoration: underline;
  text-align: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1065px) {
    width: 300px;
  }
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;

  .icon {
    position: absolute;
    right: 20px;
    bottom: 10px;
    cursor: pointer;
  }
`;
