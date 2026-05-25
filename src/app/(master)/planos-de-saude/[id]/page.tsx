'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  IoCaretBack,
  IoSaveOutline,
  IoAddSharp,
  IoTrashOutline,
} from 'react-icons/io5';
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

const RadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.35rem;
  margin-bottom: 0.25rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  cursor: pointer;
  input {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

/* ── Table for Procedures ─────────────────────────────────────────── */
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
`;

const Th = styled.th`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
`;

const Td = styled.td`
  padding: 0.5rem 0.25rem;
  vertical-align: middle;
`;

const TableInput = styled(Input)`
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
  padding-bottom: 0.2rem;
`;

const AddRowWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const AddBtn = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.55rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
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

/* ── Mock Data by ID ──────────────────────────────────────────────── */
const PLANOS_DETAILS: Record<
  string,
  {
    nomePlano: string;
    cnpj: string;
    registroAns: string;
    telefone: string;
    emailNotas: string;
    diaFechamento: string;
    prazoPagamento: string;
    exigeXml: string;
    exigeFisica: string;
    exigePti: string;
    procedimentos: {
      id: string;
      codigoTuss: string;
      descricao: string;
      qtdConsultas: string;
      valorBase: string;
      recorrencia: string;
    }[];
  }
> = {
  'pl-1': {
    nomePlano: 'Unimed',
    cnpj: '00.000.000/0001-00',
    registroAns: '123456',
    telefone: '(11) 99999-9999',
    emailNotas: 'faturamento@unimed.com.br',
    diaFechamento: '25',
    prazoPagamento: '30 dias',
    exigeXml: 'sim',
    exigeFisica: 'nao',
    exigePti: 'sim',
    procedimentos: [
      {
        id: 'proc-1',
        codigoTuss: '123456',
        descricao: 'Sessão de Psicologia',
        qtdConsultas: '10',
        valorBase: 'R$85,00',
        recorrencia: 'Semanal',
      },
    ],
  },
  'pl-2': {
    nomePlano: 'Amil',
    cnpj: '11.111.111/0001-11',
    registroAns: '654321',
    telefone: '(11) 88888-8888',
    emailNotas: 'faturamento@amil.com.br',
    diaFechamento: '10',
    prazoPagamento: '15 dias',
    exigeXml: 'sim',
    exigeFisica: 'sim',
    exigePti: 'nao',
    procedimentos: [
      {
        id: 'proc-2',
        codigoTuss: '654321',
        descricao: 'Sessão de Fonoaudiologia',
        qtdConsultas: '8',
        valorBase: 'R$90,00',
        recorrencia: 'Mensal',
      },
    ],
  },
  'pl-3': {
    nomePlano: 'Bradesco Saúde',
    cnpj: '22.222.222/0001-22',
    registroAns: '111111',
    telefone: '(11) 77777-7777',
    emailNotas: 'faturamento@bradesco.com.br',
    diaFechamento: '20',
    prazoPagamento: '45 dias',
    exigeXml: 'sim',
    exigeFisica: 'nao',
    exigePti: 'sim',
    procedimentos: [
      {
        id: 'proc-3',
        codigoTuss: '111222',
        descricao: 'Terapia Ocupacional',
        qtdConsultas: '12',
        valorBase: 'R$100,00',
        recorrencia: 'Semanal',
      },
    ],
  },
};

interface Procedimento {
  id: string;
  codigoTuss: string;
  descricao: string;
  qtdConsultas: string;
  valorBase: string;
  recorrencia: string;
}

const EditarPlanoPage = () => {
  const router = useRouter();
  const params = useParams();
  const planoId = (params?.id as string) || 'pl-1';
  const currentPlano = PLANOS_DETAILS[planoId] || PLANOS_DETAILS['pl-1'];

  const [activeTab, setActiveTab] = useState(1);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>(
    currentPlano.procedimentos,
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      nomePlano: currentPlano.nomePlano,
      cnpj: currentPlano.cnpj,
      registroAns: currentPlano.registroAns,
      telefone: currentPlano.telefone,
      emailNotas: currentPlano.emailNotas,
      diaFechamento: currentPlano.diaFechamento,
      prazoPagamento: currentPlano.prazoPagamento,
      exigeXml: currentPlano.exigeXml,
      exigeFisica: currentPlano.exigeFisica,
      exigePti: currentPlano.exigePti,
    },
  });

  const handleNext = () => {
    if (activeTab < 3) setActiveTab(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeTab > 1) setActiveTab(prev => prev - 1);
  };

  const onSubmit = (data: any) => {
    console.log('Dados do plano salvos:', { ...data, procedimentos });
    router.push('/planos-de-saude');
  };

  const handleAddProcedimento = () => {
    const novo: Procedimento = {
      id: `proc-${Date.now()}`,
      codigoTuss: '',
      descricao: '',
      qtdConsultas: '',
      valorBase: '',
      recorrencia: 'Mensal',
    };
    setProcedimentos(prev => [...prev, novo]);
  };

  const handleRemoveProcedimento = (id: string) => {
    setProcedimentos(prev => prev.filter(p => p.id !== id));
  };

  const handleProcedimentoChange = (
    id: string,
    field: keyof Procedimento,
    value: string,
  ) => {
    setProcedimentos(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  return (
    <Page>
      <Card>
        <Breadcrumb>
          Planos de saúde &nbsp;›&nbsp; Detalhes &nbsp;›&nbsp; Detalhes do plano
          &nbsp;›&nbsp; <span>Editar</span>
        </Breadcrumb>

        <TitleRow>
          <BackBtn type="button" onClick={() => router.back()} title="Voltar">
            <IoCaretBack />
          </BackBtn>
          <PageTitle>Editar plano - {currentPlano.nomePlano}</PageTitle>
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
          {/* ── SEÇÃO 1: Dados gerais da operadora ────────────────── */}
          {activeTab === 1 && (
            <Section>
              <Legend>Dados gerais da operadora</Legend>
              <Row2>
                <FieldGroup>
                  <Label>Nome do plano *</Label>
                  <Input
                    placeholder="Digite o nome do plano"
                    {...register('nomePlano', { required: true })}
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
                  <Label>Registro ANS *</Label>
                  <Input
                    placeholder="000000"
                    {...register('registroAns', { required: true })}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Telefone de contato *</Label>
                  <Input
                    placeholder="(00) 00000-0000"
                    {...register('telefone', { required: true })}
                  />
                </FieldGroup>
              </Row2>

              <div style={{ marginTop: '1rem' }}>
                <FieldGroup>
                  <Label>E-mail para envio de notas *</Label>
                  <Input
                    placeholder="Digite um e-mail"
                    {...register('emailNotas', { required: true })}
                  />
                </FieldGroup>
              </div>
            </Section>
          )}

          {/* ── SEÇÃO 2: Parâmetros de faturamento ────────────────── */}
          {activeTab === 2 && (
            <Section>
              <Legend>Parâmetros de faturamento</Legend>
              <Row2>
                <FieldGroup>
                  <Label>Dia de fechamento *</Label>
                  <Input
                    placeholder="dd"
                    {...register('diaFechamento', { required: true })}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label>Prazo para pagamento *</Label>
                  <Input
                    placeholder="Ex: 30 dias"
                    {...register('prazoPagamento', { required: true })}
                  />
                </FieldGroup>
              </Row2>

              <Row2 style={{ marginTop: '1rem' }}>
                <FieldGroup>
                  <Label>Exige envio de XML (Padrão TISS)? *</Label>
                  <RadioRow>
                    <RadioLabel>
                      <input
                        type="radio"
                        value="sim"
                        {...register('exigeXml')}
                      />{' '}
                      Sim
                    </RadioLabel>
                    <RadioLabel>
                      <input
                        type="radio"
                        value="nao"
                        {...register('exigeXml')}
                      />{' '}
                      Não
                    </RadioLabel>
                  </RadioRow>
                </FieldGroup>

                <FieldGroup>
                  <Label>Exige física assinada? *</Label>
                  <RadioRow>
                    <RadioLabel>
                      <input
                        type="radio"
                        value="sim"
                        {...register('exigeFisica')}
                      />{' '}
                      Sim
                    </RadioLabel>
                    <RadioLabel>
                      <input
                        type="radio"
                        value="nao"
                        {...register('exigeFisica')}
                      />{' '}
                      Não
                    </RadioLabel>
                  </RadioRow>
                </FieldGroup>
              </Row2>

              <div style={{ marginTop: '1rem' }}>
                <FieldGroup>
                  <Label>
                    Exige anexo do PTI/Relatório para liberar pagamento? *
                  </Label>
                  <RadioRow>
                    <RadioLabel>
                      <input
                        type="radio"
                        value="sim"
                        {...register('exigePti')}
                      />{' '}
                      Sim
                    </RadioLabel>
                    <RadioLabel>
                      <input
                        type="radio"
                        value="nao"
                        {...register('exigePti')}
                      />{' '}
                      Não
                    </RadioLabel>
                  </RadioRow>
                </FieldGroup>
              </div>
            </Section>
          )}

          {/* ── SEÇÃO 3: Procedimentos e valores ────────────────── */}
          {activeTab === 3 && (
            <Section>
              <Legend>Procedimentos e valores</Legend>

              <div style={{ overflowX: 'auto' }}>
                <StyledTable>
                  <thead>
                    <tr>
                      <Th style={{ width: '15%' }}>Código TUSS</Th>
                      <Th style={{ width: '35%' }}>
                        Descrição do Procedimento
                      </Th>
                      <Th style={{ width: '15%' }}>Quantidade de consultas</Th>
                      <Th style={{ width: '15%' }}>Valor Base (R$)</Th>
                      <Th style={{ width: '15%' }}>Recorrência</Th>
                      <Th style={{ width: '5%', textAlign: 'right' }}>Ações</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedimentos.map(p => (
                      <tr key={p.id}>
                        <Td>
                          <TableInput
                            placeholder="000000"
                            value={p.codigoTuss}
                            onChange={e =>
                              handleProcedimentoChange(
                                p.id,
                                'codigoTuss',
                                e.target.value,
                              )
                            }
                          />
                        </Td>
                        <Td>
                          <TableInput
                            placeholder="Descreva"
                            value={p.descricao}
                            onChange={e =>
                              handleProcedimentoChange(
                                p.id,
                                'descricao',
                                e.target.value,
                              )
                            }
                          />
                        </Td>
                        <Td>
                          <TableInput
                            placeholder="0"
                            value={p.qtdConsultas}
                            onChange={e =>
                              handleProcedimentoChange(
                                p.id,
                                'qtdConsultas',
                                e.target.value,
                              )
                            }
                          />
                        </Td>
                        <Td>
                          <TableInput
                            placeholder="R$0"
                            value={p.valorBase}
                            onChange={e =>
                              handleProcedimentoChange(
                                p.id,
                                'valorBase',
                                e.target.value,
                              )
                            }
                          />
                        </Td>
                        <Td>
                          <RadioGroup>
                            <RadioLabel>
                              <input
                                type="radio"
                                name={`recorrencia-${p.id}`}
                                checked={p.recorrencia === 'Mensal'}
                                onChange={() =>
                                  handleProcedimentoChange(
                                    p.id,
                                    'recorrencia',
                                    'Mensal',
                                  )
                                }
                              />{' '}
                              Mensal
                            </RadioLabel>
                            <RadioLabel>
                              <input
                                type="radio"
                                name={`recorrencia-${p.id}`}
                                checked={p.recorrencia === 'Semanal'}
                                onChange={() =>
                                  handleProcedimentoChange(
                                    p.id,
                                    'recorrencia',
                                    'Semanal',
                                  )
                                }
                              />{' '}
                              Semanal
                            </RadioLabel>
                          </RadioGroup>
                        </Td>
                        <Td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleRemoveProcedimento(p.id)}
                            title="Remover procedimento"
                            aria-label="Remover procedimento"
                            style={{
                              border: 'none',
                              background: 'transparent',
                              color: '#ff4d4f',
                              cursor: 'pointer',
                              padding: '4px',
                            }}
                          >
                            <IoTrashOutline size={18} />
                          </button>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              </div>

              <AddRowWrapper>
                <AddBtn type="button" onClick={handleAddProcedimento}>
                  <IoAddSharp /> Adicionar
                </AddBtn>
              </AddRowWrapper>
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

export default EditarPlanoPage;
