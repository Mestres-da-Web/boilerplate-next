'use client';

import styled, { keyframes } from 'styled-components';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmVariant?: 'danger' | 'warning' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.92); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.15s ease;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 2rem 2rem 1.5rem;
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  animation: ${scaleIn} 0.2s ease;
`;

/* ── Icon circle ──────────────────────────────────────────────────── */
const VARIANT_BG: Record<string, string> = {
  danger: '#fff0f0',
  warning: '#FFF8DC',
  success: '#e8f7ee',
};

const VARIANT_BORDER: Record<string, string> = {
  danger: '#E52207',
  warning: '#E6C200',
  success: '#5CC6D0',
};

const VARIANT_ICON_COLOR: Record<string, string> = {
  danger: '#E52207',
  warning: '#C8A400',
  success: '#5CC6D0',
};

const VARIANT_BTN: Record<string, string> = {
  danger: '#E52207',
  warning: '#E6C200',
  success: '#5CC6D0',
};

const IconCircle = styled.div<{ $variant: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $variant }) => VARIANT_BG[$variant] || VARIANT_BG.warning};
  border: 2px solid
    ${({ $variant }) => VARIANT_BORDER[$variant] || VARIANT_BORDER.warning};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const IconText = styled.span<{ $variant: string }>`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ $variant }) =>
    VARIANT_ICON_COLOR[$variant] || VARIANT_ICON_COLOR.warning};
  line-height: 1;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  font-size: 0.8125rem;
  color: #888;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const CancelBtn = styled.button`
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #f5f5f5;
  }
`;

const ConfirmBtn = styled.button<{ $variant: string }>`
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: ${({ $variant }) => VARIANT_BTN[$variant] || VARIANT_BTN.warning};
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
  }
`;

const variantIconChar: Record<string, string> = {
  danger: '!',
  warning: '!',
  success: '✓',
};

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;
  return (
    <Overlay onClick={onCancel}>
      <Card onClick={e => e.stopPropagation()}>
        <IconCircle $variant={confirmVariant}>
          <IconText $variant={confirmVariant}>
            {variantIconChar[confirmVariant] || '!'}
          </IconText>
        </IconCircle>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Buttons>
          <CancelBtn onClick={onCancel}>Cancelar</CancelBtn>
          <ConfirmBtn $variant={confirmVariant} onClick={onConfirm}>
            {confirmLabel}
          </ConfirmBtn>
        </Buttons>
      </Card>
    </Overlay>
  );
};

export default ConfirmModal;
