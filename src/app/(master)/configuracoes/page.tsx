'use client';

import { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  IoPencil,
  IoSaveOutline,
  IoTrashOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoPersonCircleOutline,
  IoImagesOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
} from 'react-icons/io5';

import { useAuth } from '@/hooks/useAuth';
import ConfirmModal from '@/components/Modal/ConfirmModal';

/* ── Animations ─────────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Layout ──────────────────────────────────────────────────────── */
const Page = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
  animation: ${fadeIn} 0.25s ease;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;
  align-items: start;
`;

/* ── Left sidebar ─────────────────────────────────────────────────── */
const Sidebar = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

const AvatarRelative = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
`;

const AvatarCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarEditBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.625rem;
  transition: background 0.15s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

/* ── Photo modal (centered) ───────────────────────────────────────── */
const PhotoModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.18s ease;
`;

const PhotoModalSheet = styled.div`
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 340px;
  padding: 1.25rem 1.5rem 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
`;

const PhotoModalHandle = styled.div`
  display: none;
`;

const PhotoModalTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.grayb7};
  margin-bottom: 0.75rem;
`;

const PhotoOptionBtn = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 0.5rem;
  border: none;
  background: transparent;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ $danger }) => ($danger ? '#E52207' : '#333')};
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.12s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ $danger }) => ($danger ? '#fff0f0' : '#f7f7f7')};
    border-radius: 8px;
  }

  svg {
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`;

const UserName = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
  text-align: center;
`;

const UserRole = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray88};
  text-align: center;
`;

const NavLabel = styled.p`
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.grayb7};
  align-self: flex-start;
  padding: 0 0.5rem;
`;

const SideNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active, theme }) => ($active ? '#fff' : theme.colors.gray4c)};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.grayf5};
  }
`;

/* ── Right card ───────────────────────────────────────────────────── */
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 2rem 2.5rem;
  animation: ${fadeIn} 0.2s ease;
`;

const CardTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
  margin-bottom: 1.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
`;

/* ── Info grid ────────────────────────────────────────────────────── */
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2.5rem;
`;

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const FieldLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grayb7};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const FieldValue = styled.span`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.gray4c};
`;

/* ── Footer buttons ───────────────────────────────────────────────── */
const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.graydf};
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BtnOutlineDanger = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid #e52207;
  background: transparent;
  color: #e52207;
  border-radius: 8px;
  padding: 0.55rem 1.1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #fff0f0;
  }
`;

const BtnPrimary = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 8px;
  padding: 0.55rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.88;
  }
`;

const BtnOutline = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  background: transparent;
  color: ${({ theme }) => theme.colors.gray4c};
  border-radius: 8px;
  padding: 0.55rem 1.1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.grayf5};
  }
`;

/* ── Edit form ────────────────────────────────────────────────────── */
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const Input = styled.input`
  width: 100%;
  height: 2.6rem;
  padding: 0 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  background: #fff;
  transition: border-color 0.15s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayb7};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.grayf5};
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.gray88};
  }
`;

const Select = styled.select`
  width: 100%;
  height: 2.6rem;
  padding: 0 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  background: #fff;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/* ── Password section ─────────────────────────────────────────────── */
const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 480px;
`;

const PasswordField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const PasswordInputWrapper = styled.div`
  position: relative;

  input {
    padding-right: 2.5rem;
  }
`;

const EyeBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray88};
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  padding: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HintList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Hint = styled.li<{ $ok?: boolean }>`
  font-size: 0.75rem;
  color: ${({ $ok }) => ($ok ? '#0AA937' : '#aaa')};
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.15s;
`;

const SaveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 2.75rem;
  margin-top: 0.5rem;
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

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ── Mock user data ───────────────────────────────────────────────── */
const MOCK_USER = {
  nome: 'Fernanda Lima',
  email: 'fernanda@gmail.com',
  telefone: '(11) 95463-8675',
  rgCpf: '123.456.789-10',
  dataNascimento: '1980-12-12',
  genero: 'Feminino',
  cargo: 'Gestorial',
};

type Tab = 'info' | 'senha';

/* ── Password validator ───────────────────────────────────────────── */
const validatePassword = (pwd: string) => ({
  length: pwd.length >= 8,
  number: /\d/.test(pwd),
  special: /[@#$%&]/.test(pwd),
});

/* ── Component ───────────────────────────────────────────────────── */
const ConfiguracoesPage = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('info');
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(MOCK_USER);
  const [formData, setFormData] = useState(MOCK_USER);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showRemovePhotoModal, setShowRemovePhotoModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    type: 'success' | 'error';
    msg: string;
  }>({ show: false, type: 'success', msg: '' });

  /* password */
  const [pwdCurrent, setPwdCurrent] = useState('');
  const [pwdNew, setPwdNew] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [showPwd, setShowPwd] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const pwdValidation = validatePassword(pwdNew);
  const pwdMatch = pwdNew === pwdConfirm && pwdConfirm.length > 0;
  const pwdOk =
    pwdValidation.length &&
    pwdValidation.number &&
    pwdValidation.special &&
    pwdMatch &&
    pwdCurrent.length > 0;

  const showFeedback = (type: 'success' | 'error', msg: string) => {
    setFeedback({ show: true, type, msg });
  };

  /* ── Handlers ────────────────────────────────────────────────── */
  const handleEdit = () => {
    setFormData(userData);
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData(userData);
    setEditing(false);
  };

  const handleSaveInfo = () => {
    setUserData(formData);
    setEditing(false);
    showFeedback('success', 'Informações salvas com sucesso!');
  };

  const handleSavePassword = () => {
    if (!pwdOk) return;
    setPwdCurrent('');
    setPwdNew('');
    setPwdConfirm('');
    showFeedback('success', 'Senha alterada com sucesso!');
  };

  const handleLoadPhoto = () => {
    setShowPhotoModal(false);
    fileInputRef.current?.click();
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setAvatarSrc(ev.target?.result as string);
      showFeedback('success', 'Foto atualizada com sucesso!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemovePhoto = () => {
    setAvatarSrc(null);
    setShowRemovePhotoModal(false);
    setShowPhotoModal(false);
    showFeedback('success', 'Foto removida com sucesso!');
  };

  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  return (
    <Page>
      <Layout>
        {/* ── Sidebar ─────────────────────────────────────────── */}
        <Sidebar>
          {/* hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoFileChange}
          />

          <AvatarWrapper>
            <AvatarRelative>
              <AvatarCircle>
                {avatarSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarSrc} alt="Foto de perfil" />
                ) : (
                  <IoPersonCircleOutline size={48} />
                )}
              </AvatarCircle>
              <AvatarEditBtn
                type="button"
                title="Alterar foto de perfil"
                onClick={() => setShowPhotoModal(true)}
              >
                <IoPencil />
              </AvatarEditBtn>
            </AvatarRelative>
            <UserName>{userData.nome || user?.username || 'Usuário'}</UserName>
            <UserRole>{userData.cargo}</UserRole>
          </AvatarWrapper>

          <NavLabel>Atalhos</NavLabel>

          <SideNav>
            <NavItem
              $active={tab === 'info'}
              onClick={() => {
                setTab('info');
                setEditing(false);
              }}
            >
              Informações pessoais
            </NavItem>
            <NavItem
              $active={tab === 'senha'}
              onClick={() => {
                setTab('senha');
                setEditing(false);
              }}
            >
              Alterar senha
            </NavItem>
          </SideNav>
        </Sidebar>

        {/* ── Main card ───────────────────────────────────────── */}
        <Card key={tab}>
          {/* ── INFORMAÇÕES PESSOAIS ─────────────────────────── */}
          {tab === 'info' && !editing && (
            <>
              <CardTitle>Informações pessoais</CardTitle>

              <InfoGrid>
                <InfoField>
                  <FieldLabel>Nome</FieldLabel>
                  <FieldValue>{userData.nome}</FieldValue>
                </InfoField>
                <InfoField>
                  <FieldLabel>E-mail</FieldLabel>
                  <FieldValue>{userData.email}</FieldValue>
                </InfoField>
                <InfoField>
                  <FieldLabel>Telefone / Celular</FieldLabel>
                  <FieldValue>{userData.telefone || '—'}</FieldValue>
                </InfoField>
                <InfoField>
                  <FieldLabel>RG / CPF</FieldLabel>
                  <FieldValue>{userData.rgCpf || '—'}</FieldValue>
                </InfoField>
                <InfoField>
                  <FieldLabel>Data de nascimento</FieldLabel>
                  <FieldValue>
                    {userData.dataNascimento
                      ? formatDate(userData.dataNascimento)
                      : '—'}
                  </FieldValue>
                </InfoField>
                <InfoField>
                  <FieldLabel>Gênero</FieldLabel>
                  <FieldValue>{userData.genero || '—'}</FieldValue>
                </InfoField>
              </InfoGrid>

              <CardFooter>
                <BtnPrimary onClick={handleEdit}>
                  <IoPencil size={14} />
                  Editar
                </BtnPrimary>
              </CardFooter>
            </>
          )}

          {/* ── EDITAR INFORMAÇÕES ───────────────────────────── */}
          {tab === 'info' && editing && (
            <>
              <CardTitle>Editar informações pessoais</CardTitle>

              <FormGrid>
                <FormGroup>
                  <Label htmlFor="cfg-nome">Nome</Label>
                  <Input
                    id="cfg-nome"
                    value={formData.nome}
                    onChange={e =>
                      setFormData(f => ({ ...f, nome: e.target.value }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="cfg-email">E-mail</Label>
                  <Input
                    id="cfg-email"
                    type="email"
                    value={formData.email}
                    onChange={e =>
                      setFormData(f => ({ ...f, email: e.target.value }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="cfg-telefone">
                    Telefone / Celular (opcional)
                  </Label>
                  <Input
                    id="cfg-telefone"
                    value={formData.telefone}
                    onChange={e =>
                      setFormData(f => ({ ...f, telefone: e.target.value }))
                    }
                    placeholder="(00) 00000-0000"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="cfg-nascimento">
                    Data de Nascimento (opcional)
                  </Label>
                  <Input
                    id="cfg-nascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={e =>
                      setFormData(f => ({
                        ...f,
                        dataNascimento: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="cfg-rg">RG / CPF (opcional)</Label>
                  <Input
                    id="cfg-rg"
                    value={formData.rgCpf}
                    onChange={e =>
                      setFormData(f => ({ ...f, rgCpf: e.target.value }))
                    }
                    placeholder="000.000.000-00"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="cfg-genero">Gênero</Label>
                  <Select
                    id="cfg-genero"
                    value={formData.genero}
                    onChange={e =>
                      setFormData(f => ({ ...f, genero: e.target.value }))
                    }
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Não binário">Não binário</option>
                    <option value="Prefiro não informar">
                      Prefiro não informar
                    </option>
                  </Select>
                </FormGroup>
              </FormGrid>

              <CardFooter>
                <BtnOutline onClick={handleCancel}>Cancelar</BtnOutline>
                <BtnPrimary onClick={handleSaveInfo}>
                  <IoSaveOutline size={15} />
                  Salvar
                </BtnPrimary>
              </CardFooter>
            </>
          )}

          {/* ── ALTERAR SENHA ────────────────────────────────── */}
          {tab === 'senha' && (
            <>
              <CardTitle>Alterar a senha</CardTitle>

              <PasswordSection>
                {/* Current */}
                <PasswordField>
                  <Label htmlFor="pwd-current">Senha atual</Label>
                  <PasswordInputWrapper>
                    <Input
                      id="pwd-current"
                      type={showPwd.current ? 'text' : 'password'}
                      placeholder="Digite sua senha atual"
                      value={pwdCurrent}
                      onChange={e => setPwdCurrent(e.target.value)}
                    />
                    <EyeBtn
                      type="button"
                      onClick={() =>
                        setShowPwd(s => ({ ...s, current: !s.current }))
                      }
                      tabIndex={-1}
                    >
                      {showPwd.current ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </EyeBtn>
                  </PasswordInputWrapper>
                </PasswordField>

                {/* New */}
                <PasswordField>
                  <Label htmlFor="pwd-new">Nova senha</Label>
                  <PasswordInputWrapper>
                    <Input
                      id="pwd-new"
                      type={showPwd.new ? 'text' : 'password'}
                      placeholder="Digite sua nova senha"
                      value={pwdNew}
                      onChange={e => setPwdNew(e.target.value)}
                    />
                    <EyeBtn
                      type="button"
                      onClick={() => setShowPwd(s => ({ ...s, new: !s.new }))}
                      tabIndex={-1}
                    >
                      {showPwd.new ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </EyeBtn>
                  </PasswordInputWrapper>
                  <HintList>
                    <Hint $ok={pwdValidation.length}>
                      {pwdValidation.length ? (
                        <IoCheckmarkCircle size={13} />
                      ) : (
                        '•'
                      )}{' '}
                      No mínimo 8 caracteres
                    </Hint>
                    <Hint $ok={pwdValidation.number}>
                      {pwdValidation.number ? (
                        <IoCheckmarkCircle size={13} />
                      ) : (
                        '•'
                      )}{' '}
                      No mínimo 1 número
                    </Hint>
                    <Hint $ok={pwdValidation.special}>
                      {pwdValidation.special ? (
                        <IoCheckmarkCircle size={13} />
                      ) : (
                        '•'
                      )}{' '}
                      No mínimo 1 caractere especial{' '}
                      <span style={{ color: '#aaa', fontWeight: 600 }}>
                        &quot;@#$%&amp;&quot;
                      </span>
                    </Hint>
                  </HintList>
                </PasswordField>

                {/* Confirm */}
                <PasswordField>
                  <Label htmlFor="pwd-confirm">Confirmar nova senha</Label>
                  <PasswordInputWrapper>
                    <Input
                      id="pwd-confirm"
                      type={showPwd.confirm ? 'text' : 'password'}
                      placeholder="Confirme sua nova senha"
                      value={pwdConfirm}
                      onChange={e => setPwdConfirm(e.target.value)}
                    />
                    <EyeBtn
                      type="button"
                      onClick={() =>
                        setShowPwd(s => ({ ...s, confirm: !s.confirm }))
                      }
                      tabIndex={-1}
                    >
                      {showPwd.confirm ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </EyeBtn>
                  </PasswordInputWrapper>
                  {pwdConfirm.length > 0 && (
                    <HintList>
                      <Hint $ok={pwdMatch}>
                        {pwdMatch ? (
                          <IoCheckmarkCircle size={13} />
                        ) : (
                          <IoCloseCircle
                            size={13}
                            style={{ color: '#E52207' }}
                          />
                        )}{' '}
                        {pwdMatch
                          ? 'Senhas coincidem'
                          : 'As senhas não coincidem'}
                      </Hint>
                    </HintList>
                  )}
                </PasswordField>

                <SaveBtn
                  type="button"
                  disabled={!pwdOk}
                  onClick={handleSavePassword}
                >
                  Salvar <IoSaveOutline size={16} />
                </SaveBtn>
              </PasswordSection>
            </>
          )}
        </Card>
      </Layout>

      {/* Photo options modal */}
      {showPhotoModal && (
        <PhotoModalOverlay onClick={() => setShowPhotoModal(false)}>
          <PhotoModalSheet onClick={e => e.stopPropagation()}>
            <PhotoModalHandle />
            <PhotoModalTitle>Alterar foto de perfil</PhotoModalTitle>
            <PhotoOptionBtn type="button" onClick={handleLoadPhoto}>
              <IoImagesOutline />
              Carregar foto
            </PhotoOptionBtn>
            <PhotoOptionBtn
              type="button"
              $danger
              onClick={() => {
                setShowPhotoModal(false);
                setShowRemovePhotoModal(true);
              }}
            >
              <IoTrashOutline />
              Remover foto atual
            </PhotoOptionBtn>
          </PhotoModalSheet>
        </PhotoModalOverlay>
      )}

      {/* Remove photo confirm */}
      <ConfirmModal
        isOpen={showRemovePhotoModal}
        title="Deseja remover sua foto?"
        message="Tem certeza de que deseja remover sua foto de perfil? Essa ação é imediata e a imagem atual será substituída pela padrão do sistema."
        confirmLabel="Remover"
        confirmVariant="warning"
        onConfirm={handleRemovePhoto}
        onCancel={() => setShowRemovePhotoModal(false)}
      />

      {/* Feedback modal */}
      <ConfirmModal
        isOpen={feedback.show}
        title="Sucesso!"
        message={feedback.msg}
        confirmLabel="Voltar"
        confirmVariant="success"
        onConfirm={() => setFeedback(f => ({ ...f, show: false }))}
        onCancel={() => setFeedback(f => ({ ...f, show: false }))}
      />
    </Page>
  );
};

export default ConfiguracoesPage;
