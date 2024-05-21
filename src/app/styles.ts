import styled from 'styled-components';

export const FullPage = styled.main`
  width: 100%;
  min-height: 100vh;

  background: url('/img/back_1.svg');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: bottom;

  display: flex;
  justify-content: center;
`;

export const FormContainer = styled.form`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 18px 0px #00000040;

  width: 500px;
  height: 100vh;
  padding: 3.5rem 2rem 5.8125rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const LogoImg = styled.img`
  max-width: 100%;
  object-fit: scale-down;
`;

export const InputSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 90%;

  .icon {
    position: absolute;
    right: 20px;
    bottom: 7px;
    cursor: pointer;
  }
`;

export const LoginLabel = styled.label`
  font-size: 12pt;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  margin-bottom: 5px;
`;

export const LoginInput = styled.input`
  width: 280px;
  max-width: 100%;
  min-height: 40px;

  padding: 0 1rem;

  border-radius: 6px;
  border: 1px solid #9eabbe;
  background-color: ${({ theme }) => theme.colors.grayf6};

  color: ${({ theme }) => theme.colors.black};
  outline: none;

  animation-timing-function: ease-out;
  animation-duration: 100ms;
`;

export const LoginTitle = styled.h1`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 800;
`;

export const RegisterText = styled.h3`
  width: 280px;
  font-size: 10pt;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  label {
    font-size: 10pt;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    user-select: none;
  }

  input {
    width: 15px;
    height: 15px;
  }
`;

export const ErrorMessage = styled.h3`
  position: absolute;
  bottom: -1.25rem;
  left: 0.25rem;

  font-size: 8pt;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.error};
`;

export const Label = styled.label``;
