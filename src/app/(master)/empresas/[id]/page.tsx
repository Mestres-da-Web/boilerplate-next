'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoCaretBack, IoSaveOutline } from 'react-icons/io5';
import styled from 'styled-components';

/* ── Layout ───────────────────────────────────────────────────────── */
const Page = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: calc(100vh - 80px);
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.75rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Breadcrumb = styled.p`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.grayb7};
  margin-bottom: 1rem;
  letter-spacing: 0.02em;

  span {
    color: ${({ theme }) => theme.colors.gray4c};
    font-weight: 500;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const BackBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  padding: 4px;
  border-radius: 6px;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.7;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

/* ── Tabs ─────────────────────────────────────────────────────────── */
const TabsRow = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) => ($active ? '#fff' : theme.colors.primary)};
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : 'rgba(92, 198, 208, 0.1)'};
  }
`;

/* ── Form container ───────────────────────────────────────────────── */
const Section = styled.fieldset`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
`;

const Legend = styled.legend`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
  padding: 0 0.5rem;
`;

/* ── Form elements ────────────────────────────────────────────────── */
const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  width: 100%;
  transition: border 0.15s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayb7};
  }
`;

/* ── Footer ───────────────────────────────────────────────────────── */
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.graydf};
`;

const Required = styled.span`
  font-size: 0.75rem;
  color: #f284a4;
`;

const FooterBtns = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const NavBtn = styled.button<{ $outline?: boolean }>`
  border: ${({ $outline, theme }) =>
    $outline ? `1px solid ${theme.colors.primary}` : 'none'};
  background: ${({ $outline, theme }) =>
    $outline ? '#fff' : theme.colors.primary};
  color: ${({ $outline, theme }) => ($outline ? theme.colors.primary : '#fff')};
  border-radius: 8px;
  padding: 0.55rem 1.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s;

  &:hover {
    opacity: 0.88;
    background: ${({ $outline }) => ($outline ? '#fcfcfc' : '')};
  }
`;

/* ── Mock data by ID ──────────────────────────────────────────────── */
const EMPRESAS_DETAILS: Record<
  string,
  {
    nomeEmpresa: string;
    cnpj: string;
    razaoSocial: string;
    ieMunicipal: string;
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento: string;
  }
> = {
  'emp-1': {
    nomeEmpresa: 'Exata Assessoria Contábil',
    cnpj: '45.997.468/0001-53',
    razaoSocial: 'Assessoria Contábil',
    ieMunicipal: '112.456.789.111',
    cep: '12345-678',
    estado: 'São Paulo - SP',
    cidade: 'São Paulo',
    bairro: 'Vila Madalena',
    logradouro: 'Rua das Flores',
    numero: '100',
    complemento: '-',
  },
  'emp-2': {
    nomeEmpresa: 'Primo Consultoria Contábil',
    cnpj: '12.345.678/0001-90',
    razaoSocial: 'Primo Consultoria',
    ieMunicipal: '987.654.321.000',
    cep: '05400-000',
    estado: 'São Paulo - SP',
    cidade: 'São Paulo',
    bairro: 'Pinheiros',
    logradouro: 'Avenida Brigadeiro Faria Lima',
    numero: '500',
    complemento: 'Bloco B',
  },
};

const DEFAULT_EMPRESA = {
  nomeEmpresa: 'Exata Assessoria Contábil',
  cnpj: '45.997.468/0001-53',
  razaoSocial: 'Assessoria Contábil',
  ieMunicipal: '112.456.789.111',
  cep: '12345-678',
  estado: 'São Paulo - SP',
  cidade: 'São Paulo',
  bairro: 'Vila Madalena',
  logradouro: 'Rua das Flores',
  numero: '100',
  complemento: '-',
};

/* ── Component ────────────────────────────────────────────────────── */
const EditarEmpresaPage = () => {
  const router = useRouter();
  const params = useParams();
  const empId = (params?.id as string) || 'emp-1';
  const currentEmp = EMPRESAS_DETAILS[empId] || DEFAULT_EMPRESA;

  const [activeTab, setActiveTab] = useState(1);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nomeEmpresa: currentEmp.nomeEmpresa,
      cnpj: currentEmp.cnpj,
      razaoSocial: currentEmp.razaoSocial,
      ieMunicipal: currentEmp.ieMunicipal,
      cep: currentEmp.cep,
      estado: currentEmp.estado,
      cidade: currentEmp.cidade,
      bairro: currentEmp.bairro,
      logradouro: currentEmp.logradouro,
      numero: currentEmp.numero,
      complemento: currentEmp.complemento,
    },
  });

  const handleNext = () => {
    if (activeTab < 3) setActiveTab(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeTab > 1) setActiveTab(prev => prev - 1);
  };

  const onSubmit = (data: any) => {
    console.log('Empresa editada salva:', data);
    router.push('/empresas');
  };

  return (
    <Page>
      <Card>
        <Breadcrumb>
          Empresas &nbsp;›&nbsp; Detalhes &nbsp;›&nbsp; <span>Editar</span>
        </Breadcrumb>

        <TitleRow>
          <BackBtn type="button" onClick={() => router.back()} title="Voltar">
            <IoCaretBack />
          </BackBtn>
          <PageTitle>Editar empresa</PageTitle>
        </TitleRow>

        <TabsRow>
          <TabButton
            type="button"
            $active={activeTab === 1}
            onClick={() => setActiveTab(1)}
          >
            Seção 1
          </TabButton>
          <TabButton
            type="button"
            $active={activeTab === 2}
            onClick={() => setActiveTab(2)}
          >
            Seção 2
          </TabButton>
          <TabButton
            type="button"
            $active={activeTab === 3}
            onClick={() => setActiveTab(3)}
          >
            Seção 3
          </TabButton>
        </TabsRow>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ── SEÇÃO 1: Dados gerais da empresa ────────────────── */}
          {activeTab === 1 && (
            <Section>
              <Legend>Dados gerais da empresa</Legend>
              <Row2>
                <FieldGroup>
                  <Label>Nome da empresa *</Label>
                  <Input
                    placeholder="Digite o nome da empresa"
                    {...register('nomeEmpresa', { required: true })}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>CNPJ *</Label>
                  <Input
                    placeholder="00.000.000/0000-00"
                    {...register('cnpj', { required: true })}
                  />
                </FieldGroup>
              </Row2>

              <Row2 style={{ marginTop: '1rem' }}>
                <FieldGroup>
                  <Label>Razão social *</Label>
                  <Input
                    placeholder="Digite a razão social"
                    {...register('razaoSocial', { required: true })}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>IE Municipal *</Label>
                  <Input
                    placeholder="Digite o IE municipal"
                    {...register('ieMunicipal', { required: true })}
                  />
                </FieldGroup>
              </Row2>
            </Section>
          )}

          {/* ── SEÇÃO 2: Endereço ────────────────────────────────── */}
          {activeTab === 2 && (
            <Section>
              <Legend>Endereço</Legend>
              <Row2>
                <FieldGroup>
                  <Label>CEP *</Label>
                  <Input
                    placeholder="00000-000"
                    {...register('cep', { required: true })}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Estado *</Label>
                  <Input
                    placeholder="Digite o estado"
                    {...register('estado', { required: true })}
                  />
                </FieldGroup>
              </Row2>

              <Row2 style={{ marginTop: '1rem' }}>
                <FieldGroup>
                  <Label>Cidade *</Label>
                  <Input
                    placeholder="Digite a cidade"
                    {...register('cidade', { required: true })}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Bairro *</Label>
                  <Input
                    placeholder="Digite o bairro"
                    {...register('bairro', { required: true })}
                  />
                </FieldGroup>
              </Row2>

              <Row2 style={{ marginTop: '1rem' }}>
                <FieldGroup>
                  <Label>Logradouro *</Label>
                  <Input
                    placeholder="Digite o logradouro"
                    {...register('logradouro', { required: true })}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Número *</Label>
                  <Input
                    placeholder="Digite o número"
                    {...register('numero', { required: true })}
                  />
                </FieldGroup>
              </Row2>

              <div style={{ marginTop: '1rem' }}>
                <FieldGroup>
                  <Label>Complemento (Opcional)</Label>
                  <Input
                    placeholder="Digite o complemento"
                    {...register('complemento')}
                  />
                </FieldGroup>
              </div>
            </Section>
          )}

          {/* ── SEÇÃO 3: Configurações Adicionais ────────────────── */}
          {activeTab === 3 && (
            <Section>
              <Legend>Configurações Adicionais</Legend>
              <p style={{ fontSize: '0.8125rem', color: '#888' }}>
                Sem configurações adicionais para esta empresa no momento.
              </p>
            </Section>
          )}

          {/* ── Footer ───────────────────────────────────────── */}
          <Footer>
            <Required>*Campos obrigatórios</Required>
            <FooterBtns>
              {activeTab > 1 && (
                <NavBtn type="button" $outline onClick={handlePrev}>
                  ‹ Seção anterior
                </NavBtn>
              )}
              {activeTab < 3 ? (
                <NavBtn type="button" onClick={handleNext}>
                  Próxima seção ›
                </NavBtn>
              ) : (
                <NavBtn type="submit">
                  <IoSaveOutline /> Salvar
                </NavBtn>
              )}
            </FooterBtns>
          </Footer>
        </form>
      </Card>
    </Page>
  );
};

export default EditarEmpresaPage;
