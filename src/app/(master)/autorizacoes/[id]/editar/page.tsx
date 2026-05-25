'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import styled, { keyframes, css } from 'styled-components';
import {
  IoCaretBack,
  IoSaveOutline,
  IoEyeOutline,
  IoAddOutline,
  IoTrashOutline,
  IoRefreshOutline,
  IoChevronDownOutline,
} from 'react-icons/io5';

/* ── Animations ─────────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeSlide = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Layout ──────────────────────────────────────────────────────── */
const Page = styled.div`
  padding: 1.5rem 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: calc(100vh - 80px);
  animation: ${fadeIn} 0.22s ease;
`;

const Breadcrumb = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray88};
  span {
    color: ${({ theme }) => theme.colors.gray4c};
    font-weight: 500;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BackBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 6px;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.7;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const Subtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray88};
  margin-top: -0.5rem;
`;

/* ── Card ────────────────────────────────────────────────────────── */
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.75rem 2rem;
`;

/* ── Form elements ───────────────────────────────────────────────── */
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

const SelectWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 2.5rem;
  padding: 0 2rem 0 0.875rem;
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

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  background: #fff;
  transition: border-color 0.15s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayb7};
  }
`;

/* ── Patient data card ───────────────────────────────────────────── */
const DataCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-top: 1.25rem;
  animation: ${fadeIn} 0.2s ease;
`;

const DataCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const DataCardTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const ViewAllBtn = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray88};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 20px;
  padding: 0.35rem 0.85rem;
  transition: border-color 0.15s;
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 2.5rem;
  margin-bottom: 1.25rem;
`;

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

const FieldLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray88};
  font-weight: 500;
`;

const FieldValue = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray4c};
  font-weight: 500;
`;

/* ── Plan section ────────────────────────────────────────────────── */
const PlanSection = styled.div`
  border: 1.5px dashed ${({ theme }) => theme.colors.graydf};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-top: 1.25rem;
`;

const PlanTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const AddRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
`;

const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0 1.1rem;
  height: 2.5rem;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
  }
`;

/* ── Procedures table ────────────────────────────────────────────── */
const ProcTable = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  overflow: hidden;
`;

const ProcTableHead = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 0.8fr 0.8fr 80px;
  background: ${({ theme }) => theme.colors.grayf5};
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
`;

const ProcTh = styled.span`
  padding: 0.65rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const ProcRow = styled.div<{ $alt?: boolean; $removed?: boolean }>`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 0.8fr 0.8fr 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
  background: ${({ $alt, theme }) => ($alt ? theme.colors.grayf5 : '#fff')};
  align-items: center;
  opacity: ${({ $removed }) => ($removed ? 0.45 : 1)};
  text-decoration: ${({ $removed }) => ($removed ? 'line-through' : 'none')};
  animation: ${fadeSlide} 0.18s ease;
  &:last-child {
    border-bottom: none;
  }
`;

const ProcTd = styled.div`
  padding: 0.65rem 0.875rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const ProcInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 6px;
  padding: 0.35rem 0.5rem;
  font-size: 0.8125rem;
  outline: none;
  background: #fff;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProcActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.65rem 0.875rem;
`;

const ActionIcon = styled.button<{ $color?: string }>`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ $color }) => $color || '#999'};
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  padding: 3px;
  border-radius: 4px;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.7;
  }
`;

const TotalRow = styled.div`
  padding: 0.75rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
  border-top: 1px solid ${({ theme }) => theme.colors.graydf};
  background: ${({ theme }) => theme.colors.grayf5};
`;

/* ── Footer ──────────────────────────────────────────────────────── */
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
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

const BtnCancel = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  background: #fff;
  border-radius: 8px;
  padding: 0.55rem 1.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
  cursor: pointer;
  transition: border-color 0.15s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const BtnSave = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 0.55rem 1.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
  }
`;

/* ── Mock data ───────────────────────────────────────────────────── */
const MOCK_PACIENTES = [
  {
    id: '1',
    nome: 'Lucas Andrade Silva',
    cpf: '123.456.789-10',
    dataNasc: '14/04/2018',
    responsavel: 'Carolina Ribeiro',
    cpfResponsavel: '123.456.789-10',
    telefone: '(63) 95432-5646',
    plano: 'Unimed',
  },
  {
    id: '2',
    nome: 'Maria Carolina Cardoso',
    cpf: '987.654.321-00',
    dataNasc: '03/04/2019',
    responsavel: 'Felipe Silva',
    cpfResponsavel: '111.222.333-44',
    telefone: '(63) 98765-4321',
    plano: 'Amil',
  },
];

const ESPECIALIDADES = [
  { label: 'Anamnese', terapiasSem: 1, sessoesPlan: 1, valorUnit: 85 },
  { label: 'Psicologia (ABA)', terapiasSem: 4, sessoesPlan: 4, valorUnit: 90 },
  { label: 'Fonoaudiologia', terapiasSem: 2, sessoesPlan: 2, valorUnit: 80 },
  {
    label: 'Terapia Ocupacional',
    terapiasSem: 3,
    sessoesPlan: 3,
    valorUnit: 75,
  },
];

interface ProcItem {
  id: string;
  especialidade: string;
  terapiasSem: number;
  sessoesPlan: number;
  valorUnit: number;
  removido?: boolean;
}

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* ── Component ───────────────────────────────────────────────────── */
const EditarAutorizacaoPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  /* Pre-populate with existing data */
  const [selectedPacId, setSelectedPacId] = useState('1');
  const [selectedPlano, setSelectedPlano] = useState('Unimed');

  const [newEsp, setNewEsp] = useState('');
  const [newQtd, setNewQtd] = useState('');

  const [procs, setProcs] = useState<ProcItem[]>([
    {
      id: 'p1',
      especialidade: 'Anamnese',
      terapiasSem: 1,
      sessoesPlan: 1,
      valorUnit: 85,
    },
    {
      id: 'p2',
      especialidade: 'Psicologia (ABA)',
      terapiasSem: 4,
      sessoesPlan: 4,
      valorUnit: 90,
    },
  ]);

  const paciente = MOCK_PACIENTES.find(p => p.id === selectedPacId);

  const handleSelectPac = (pacId: string) => {
    setSelectedPacId(pacId);
    const pac = MOCK_PACIENTES.find(p => p.id === pacId);
    if (pac) setSelectedPlano(pac.plano);
  };

  const handleAddProc = () => {
    if (!newEsp) return;
    const esp = ESPECIALIDADES.find(e => e.label === newEsp);
    if (!esp) return;
    const qtd = Number(newQtd) || esp.sessoesPlan;
    setProcs(prev => [
      ...prev,
      {
        id: `proc-${Date.now()}`,
        especialidade: esp.label,
        terapiasSem: esp.terapiasSem,
        sessoesPlan: qtd,
        valorUnit: esp.valorUnit,
        removido: false,
      },
    ]);
    setNewEsp('');
    setNewQtd('');
  };

  const toggleRemove = (procId: string) => {
    setProcs(prev =>
      prev.map(p => (p.id === procId ? { ...p, removido: !p.removido } : p)),
    );
  };

  const activeProcs = procs.filter(p => !p.removido);
  const total = activeProcs.reduce(
    (acc, p) => acc + p.sessoesPlan * p.valorUnit * 4,
    0,
  );

  return (
    <Page>
      {/* Breadcrumb */}
      <Breadcrumb>
        Autorizações &nbsp;›&nbsp; Detalhes &nbsp;›&nbsp; <span>Editar</span>
      </Breadcrumb>

      <TitleRow>
        <BackBtn onClick={() => router.back()} title="Voltar">
          <IoCaretBack />
        </BackBtn>
        <PageTitle>Editar autorização</PageTitle>
      </TitleRow>

      <Subtitle>
        Primeiro selecione o paciente que vai estar vinculado na autorização:
      </Subtitle>

      <Card>
        {/* Patient search */}
        <FieldGroup>
          <Label htmlFor="pac-select">Paciente</Label>
          <SelectWrapper>
            <Select
              id="pac-select"
              value={selectedPacId}
              onChange={e => handleSelectPac(e.target.value)}
            >
              <option value="">Selecione ou pesquise</option>
              {MOCK_PACIENTES.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </Select>
            <IoChevronDownOutline />
          </SelectWrapper>
        </FieldGroup>

        {/* Patient data */}
        {paciente && (
          <DataCard>
            <DataCardHeader>
              <DataCardTitle>Dados do paciente</DataCardTitle>
              <ViewAllBtn href={`/pacientes/${paciente.id}`}>
                <IoEyeOutline />
                Visualizar todos os dados do paciente
              </ViewAllBtn>
            </DataCardHeader>

            <InfoGrid>
              <InfoField>
                <FieldLabel>Nome do paciente</FieldLabel>
                <FieldValue>{paciente.nome}</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>CPF do paciente</FieldLabel>
                <FieldValue>{paciente.cpf}</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>Data de nascimento</FieldLabel>
                <FieldValue>{paciente.dataNasc}</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>Responsável</FieldLabel>
                <FieldValue>{paciente.responsavel}</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>CPF do responsável</FieldLabel>
                <FieldValue>{paciente.cpfResponsavel}</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>Telefone</FieldLabel>
                <FieldValue>{paciente.telefone}</FieldValue>
              </InfoField>
            </InfoGrid>

            {/* Plan select */}
            <FieldGroup>
              <Label htmlFor="plano-select">Plano de saúde *</Label>
              <SelectWrapper>
                <Select
                  id="plano-select"
                  value={selectedPlano}
                  onChange={e => setSelectedPlano(e.target.value)}
                >
                  <option value="">Selecione ou pesquise</option>
                  <option value="Unimed">Unimed</option>
                  <option value="Amil">Amil</option>
                  <option value="Hapvida">Hapvida</option>
                  <option value="Bradesco Saúde">Bradesco Saúde</option>
                </Select>
                <IoChevronDownOutline />
              </SelectWrapper>
            </FieldGroup>

            {/* Plan procedures section */}
            {selectedPlano && (
              <PlanSection>
                <PlanTitle>Plano {selectedPlano}</PlanTitle>

                <AddRow>
                  <FieldGroup>
                    <Label htmlFor="esp-select">Especialidade</Label>
                    <SelectWrapper>
                      <Select
                        id="esp-select"
                        value={newEsp}
                        onChange={e => setNewEsp(e.target.value)}
                      >
                        <option value="">Selecione ou pesquise</option>
                        {ESPECIALIDADES.map(e => (
                          <option key={e.label} value={e.label}>
                            {e.label}
                          </option>
                        ))}
                      </Select>
                      <IoChevronDownOutline />
                    </SelectWrapper>
                  </FieldGroup>

                  <FieldGroup>
                    <Label htmlFor="qtd-input">Quantidade de sessões *</Label>
                    <Input
                      id="qtd-input"
                      type="number"
                      min={1}
                      placeholder="Digite a quantidade de sessões"
                      value={newQtd}
                      onChange={e => setNewQtd(e.target.value)}
                    />
                  </FieldGroup>

                  <AddBtn type="button" onClick={handleAddProc}>
                    <IoAddOutline size={16} />
                    Adicionar
                  </AddBtn>
                </AddRow>

                <ProcTable>
                  <ProcTableHead>
                    <ProcTh>Especialidade</ProcTh>
                    <ProcTh>Terapias autorizadas semanais</ProcTh>
                    <ProcTh>Sessões autorizadas pelo plano</ProcTh>
                    <ProcTh>Valor Unitário</ProcTh>
                    <ProcTh>Valor Total</ProcTh>
                    <ProcTh>Ações</ProcTh>
                  </ProcTableHead>

                  {procs.map((proc, idx) => (
                    <ProcRow
                      key={proc.id}
                      $alt={idx % 2 === 1}
                      $removed={proc.removido}
                    >
                      <ProcTd>{proc.especialidade}</ProcTd>
                      <ProcTd>
                        <ProcInput
                          type="number"
                          min={1}
                          value={proc.terapiasSem}
                          disabled={proc.removido}
                          onChange={e =>
                            setProcs(prev =>
                              prev.map(p =>
                                p.id === proc.id
                                  ? {
                                      ...p,
                                      terapiasSem: Number(e.target.value),
                                    }
                                  : p,
                              ),
                            )
                          }
                        />
                      </ProcTd>
                      <ProcTd>
                        <ProcInput
                          type="number"
                          min={1}
                          value={proc.sessoesPlan}
                          disabled={proc.removido}
                          onChange={e =>
                            setProcs(prev =>
                              prev.map(p =>
                                p.id === proc.id
                                  ? {
                                      ...p,
                                      sessoesPlan: Number(e.target.value),
                                    }
                                  : p,
                              ),
                            )
                          }
                        />
                      </ProcTd>
                      <ProcTd>{fmt(proc.valorUnit)}</ProcTd>
                      <ProcTd>
                        {fmt(proc.sessoesPlan * proc.valorUnit * 4)}
                      </ProcTd>
                      <ProcActions>
                        <ActionIcon
                          type="button"
                          $color="#f284a4"
                          title={proc.removido ? 'Restaurar' : 'Remover'}
                          onClick={() => toggleRemove(proc.id)}
                        >
                          {proc.removido ? (
                            <IoRefreshOutline />
                          ) : (
                            <IoTrashOutline />
                          )}
                        </ActionIcon>
                        {!proc.removido && (
                          <ActionIcon
                            type="button"
                            $color="#43a047"
                            title="Restaurar valores"
                            onClick={() => {
                              const orig = ESPECIALIDADES.find(
                                e => e.label === proc.especialidade,
                              );
                              if (!orig) return;
                              setProcs(prev =>
                                prev.map(p =>
                                  p.id === proc.id
                                    ? {
                                        ...p,
                                        terapiasSem: orig.terapiasSem,
                                        sessoesPlan: orig.sessoesPlan,
                                      }
                                    : p,
                                ),
                              );
                            }}
                          >
                            <IoRefreshOutline />
                          </ActionIcon>
                        )}
                      </ProcActions>
                    </ProcRow>
                  ))}

                  <TotalRow>Total geral: {fmt(total)}</TotalRow>
                </ProcTable>
              </PlanSection>
            )}
          </DataCard>
        )}

        {/* Footer */}
        <Footer>
          <Required>*Campos obrigatórios</Required>
          <FooterBtns>
            <BtnCancel type="button" onClick={() => router.back()}>
              Cancelar
            </BtnCancel>
            <BtnSave
              type="button"
              onClick={() => router.push(`/autorizacoes/${id}`)}
            >
              <IoSaveOutline />
              Salvar
            </BtnSave>
          </FooterBtns>
        </Footer>
      </Card>
    </Page>
  );
};

export default EditarAutorizacaoPage;
