import styled from 'styled-components';

/* ── Wrapper ─────────────────────────────────────────────────────── */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
  padding: 0 2rem;
`;

/* ── Heart logo ──────────────────────────────────────────────────── */
export const LogoWrapper = styled.div`
  margin-bottom: 1.5rem;
  img {
    width: 90px;
    height: auto;
  }
`;

/* ── Form ─────────────────────────────────────────────────────────── */
export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/* ── Title & subtitle ─────────────────────────────────────────────── */
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
`;

export const SubTitle = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1.75rem;
`;

/* ── Labels & inputs ──────────────────────────────────────────────── */
export const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.35rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 2.75rem;
  padding: 0 1rem;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #333;
  outline: none;
  background: #fff;
  transition: border-color 0.15s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/* ── Field wrapper (for password eye icon) ────────────────────────── */
export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  .icon {
    position: absolute;
    right: 12px;
    bottom: 10px;
    cursor: pointer;
    color: #888;
  }
`;

/* ── Error message ────────────────────────────────────────────────── */
export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #e74c3c;
  margin-top: 0.25rem;
`;

/* ── Bottom row (checkbox + forgot password) ──────────────────────── */
export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const RegisterText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 0.8125rem;
  color: #555;
  cursor: pointer;
  user-select: none;
`;

export const ForgotLink = styled.a`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

/* ── Submit button ────────────────────────────────────────────────── */
export const Button = styled.button`
  width: 100%;
  height: 2.75rem;
  margin-top: 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
