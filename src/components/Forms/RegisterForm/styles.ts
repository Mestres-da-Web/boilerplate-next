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
  overflow-y: auto;
`;

export const Form = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  margin: 2rem 0;
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
  margin-bottom: 1rem;

  @media (max-width: 1065px) {
    width: 300px;
    font-size: 0.9rem;
  }
`;

export const Label = styled.p`
  width: 450px;
  margin-top: 1.2rem;
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
  position: absolute;
  bottom: -14px;
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
  cursor: pointer;

  &:hover {
    background-color: #057449;
  }
`;

export const LinkText = styled.a`
  text-align: center;
  margin-top: 1rem;

  @media (max-width: 1065px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Span = styled.span`
  color: #008856;
  cursor: pointer;
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  .icon {
    position: absolute;
    right: 20px;
    bottom: 10px;
    cursor: pointer;
  }
`;

export const FieldRow = styled.div`
  width: 450px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1065px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
  }
`;

export const TermsText = styled.a`
  display: flex;
  gap: 5px;
  width: 450px;
  text-align: center;
  align-self: center;
  justify-content: center;
  font-size: 0.8rem;

  @media (max-width: 1065px) {
    width: 300px;
  }
`;
