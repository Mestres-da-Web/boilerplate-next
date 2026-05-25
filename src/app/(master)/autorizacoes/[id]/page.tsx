'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import styled, { keyframes } from 'styled-components';
import {
  IoCaretBack,
  IoEyeOutline,
  IoPencilOutline,
  IoCloseOutline,
  IoAddOutline,
  IoTrashOutline,
  IoChevronDownOutline,
  IoSaveOutline,
} from 'react-icons/io5';
import ConfirmModal from '@/components/Modal/ConfirmModal';

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
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const TitleLeft = styled.div`
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
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const TitleBtns = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const BtnCancel = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  border-radius: 8px;
  background: #f284a4;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
  }
`;

const BtnEdit = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
  }
`;

/* ── Patient data card ───────────────────────────────────────────── */
const DataCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.5rem 1.75rem;
`;

const DataCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const SectionTitle = styled.h2`
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
  gap: 1.1rem 2.5rem;
`;

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const FieldLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray88};
`;

const FieldValue = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray4c};
  font-weight: 500;
`;

/* ── Therapy tables ──────────────────────────────────────────────── */
const TableCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TherapyTable = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  overflow: hidden;
`;

const THead = styled.div`
  display: grid;
  grid-template-columns: ${({ style }) =>
    style?.gridTemplateColumns || '1.5fr 1fr 0.8fr 0.8fr'};
  background: ${({ theme }) => theme.colors.grayf5};
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
`;

const Th = styled.span`
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const TRow = styled.div<{ $alt?: boolean; $cols?: string }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols || '1.5fr 1fr 0.8fr 0.8fr'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
  background: ${({ $alt, theme }) => ($alt ? theme.colors.grayf5 : '#fff')};
  align-items: center;
  animation: ${fadeSlide} 0.18s ease;
  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.div`
  padding: 0.65rem 1rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const ActionTd = styled.div`
  padding: 0.65rem 1rem;
  display: flex;
  justify-content: flex-end;
`;

const DeleteBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: #f284a4;
  font-size: 1.1rem;
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
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
  background: ${({ theme }) => theme.colors.grayf5};
  border-top: 1px solid ${({ theme }) => theme.colors.graydf};
`;

/* ── Add session row ─────────────────────────────────────────────── */
const TableFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const AddSessionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
  }
`;

/* ── Add session modal ───────────────────────────────────────────── */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.18s ease;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 2rem 2.25rem;
  width: 420px;
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  animation: ${fadeSlide} 0.2s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray88};
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.colors.gray4c};
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
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayb7};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const BtnOutline = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  background: #fff;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const BtnPrimary = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  &:hover {
    opacity: 0.88;
  }
`;

/* ── Mock data ───────────────────────────────────────────────────── */
const MOCK_PATIENT = {
  nome: 'Lucas Andrade Silva',
  cpf: '123.456.789-10',
  dataNasc: '14/04/2018',
  responsavel: 'Carolina Ribeiro',
  cpfResponsavel: '123.456.789-10',
  telefone: '(63) 95432-5646',
};

interface SessionItem {
  id: string;
  terapia: string;
  terapiasSem: number;
  valorUnit: number;
}

const CONVENIO_SESSIONS: SessionItem[] = [
  { id: 'c1', terapia: 'Anamnese', terapiasSem: 1, valorUnit: 85 },
  { id: 'c2', terapia: 'Psicologia (ABA)', terapiasSem: 4, valorUnit: 36 },
];

const AVAILABLE_THERAPIES = [
  { label: 'Anamnese', valorUnit: 85 },
  { label: 'Psicologia (ABA)', valorUnit: 36 },
  { label: 'Fonoaudiologia', valorUnit: 90 },
  { label: 'Terapia Ocupacional', valorUnit: 80 },
];

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* ── Component ───────────────────────────────────────────────────── */
const AutrizacaoDetalhesPage = () => {
  const router = useRouter();
  const params = useParams();

  /* sessions for scheduling */
  const [agendSessions, setAgendSessions] = useState<SessionItem[]>([
    { id: 'a1', terapia: 'Anamnese', terapiasSem: 1, valorUnit: 85 },
    { id: 'a2', terapia: 'Psicologia (ABA)', terapiasSem: 4, valorUnit: 36 },
  ]);

  /* add session modal */
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTerapia, setNewTerapia] = useState('');
  const [newQtd, setNewQtd] = useState('');

  /* delete confirmation */
  const [deleteId, setDeleteId] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /* cancel authorization confirm */
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const totalConvenio = CONVENIO_SESSIONS.reduce(
    (acc, s) => acc + s.terapiasSem * s.valorUnit * 4,
    0,
  );
  const totalAgend = agendSessions.reduce(
    (acc, s) => acc + s.terapiasSem * s.valorUnit * 4,
    0,
  );

  const handleAddSession = () => {
    if (!newTerapia) return;
    const therapy = AVAILABLE_THERAPIES.find(t => t.label === newTerapia);
    if (!therapy) return;
    setAgendSessions(prev => [
      ...prev,
      {
        id: `a-${Date.now()}`,
        terapia: therapy.label,
        terapiasSem: Number(newQtd) || 1,
        valorUnit: therapy.valorUnit,
      },
    ]);
    setNewTerapia('');
    setNewQtd('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setAgendSessions(prev => prev.filter(s => s.id !== deleteId));
    setShowDeleteConfirm(false);
  };

  return (
    <Page>
      {/* Breadcrumb */}
      <Breadcrumb>
        Aprovações &nbsp;›&nbsp; <span>Detalhes</span>
      </Breadcrumb>

      {/* Title row */}
      <TitleRow>
        <TitleLeft>
          <BackBtn onClick={() => router.back()} title="Voltar">
            <IoCaretBack />
          </BackBtn>
          <PageTitle>Detalhes da autorização – {MOCK_PATIENT.nome}</PageTitle>
        </TitleLeft>
        <TitleBtns>
          <BtnCancel onClick={() => setShowCancelConfirm(true)}>
            <IoCloseOutline size={15} />
            Cancelar
          </BtnCancel>
          <BtnEdit
            onClick={() => router.push(`/autorizacoes/${params?.id}/editar`)}
          >
            <IoPencilOutline size={14} />
            Editar
          </BtnEdit>
        </TitleBtns>
      </TitleRow>

      {/* Patient data */}
      <DataCard>
        <DataCardHeader>
          <SectionTitle>Dados do paciente</SectionTitle>
          <ViewAllBtn href="/pacientes/1">
            <IoEyeOutline />
            Visualizar todos os dados do paciente
          </ViewAllBtn>
        </DataCardHeader>

        <InfoGrid>
          <InfoField>
            <FieldLabel>Nome do paciente</FieldLabel>
            <FieldValue>{MOCK_PATIENT.nome}</FieldValue>
          </InfoField>
          <InfoField>
            <FieldLabel>CPF do paciente</FieldLabel>
            <FieldValue>{MOCK_PATIENT.cpf}</FieldValue>
          </InfoField>
          <InfoField>
            <FieldLabel>Data de nascimento</FieldLabel>
            <FieldValue>{MOCK_PATIENT.dataNasc}</FieldValue>
          </InfoField>
          <InfoField>
            <FieldLabel>Responsável</FieldLabel>
            <FieldValue>{MOCK_PATIENT.responsavel}</FieldValue>
          </InfoField>
          <InfoField>
            <FieldLabel>CPF do responsável</FieldLabel>
            <FieldValue>{MOCK_PATIENT.cpfResponsavel}</FieldValue>
          </InfoField>
          <InfoField>
            <FieldLabel>Telefone</FieldLabel>
            <FieldValue>{MOCK_PATIENT.telefone}</FieldValue>
          </InfoField>
        </InfoGrid>
      </DataCard>

      {/* Terapias autorizadas pelo convênio */}
      <TableCard>
        <SectionTitle>Terapias autorizadas pelo convênio</SectionTitle>

        <TherapyTable>
          <THead style={{ gridTemplateColumns: '1.5fr 1fr 0.8fr 0.8fr' }}>
            <Th>Terapias</Th>
            <Th>Terapias autorizadas semanais</Th>
            <Th>Valor unitário</Th>
            <Th>Valor mensal</Th>
          </THead>

          {CONVENIO_SESSIONS.map((s, idx) => (
            <TRow key={s.id} $alt={idx % 2 === 1} $cols="1.5fr 1fr 0.8fr 0.8fr">
              <Td>{s.terapia}</Td>
              <Td>{s.terapiasSem}</Td>
              <Td>{fmt(s.valorUnit)}</Td>
              <Td>{fmt(s.terapiasSem * s.valorUnit * 4)}</Td>
            </TRow>
          ))}

          <TotalRow>Total geral: {fmt(totalConvenio)}</TotalRow>
        </TherapyTable>
      </TableCard>

      {/* Terapias autorizadas para agendamento */}
      <TableCard>
        <SectionTitle>Terapias autorizadas para agendamento</SectionTitle>

        <TherapyTable>
          <THead style={{ gridTemplateColumns: '1.5fr 1fr 0.8fr 0.8fr 60px' }}>
            <Th>Terapias</Th>
            <Th>Terapias autorizadas semanais</Th>
            <Th>Valor unitário</Th>
            <Th>Valor mensal</Th>
            <Th>Ações</Th>
          </THead>

          {agendSessions.map((s, idx) => (
            <TRow
              key={s.id}
              $alt={idx % 2 === 1}
              $cols="1.5fr 1fr 0.8fr 0.8fr 60px"
            >
              <Td>{s.terapia}</Td>
              <Td>{s.terapiasSem}</Td>
              <Td>{fmt(s.valorUnit)}</Td>
              <Td>{fmt(s.terapiasSem * s.valorUnit * 4)}</Td>
              <ActionTd>
                <DeleteBtn title="Remover" onClick={() => handleDelete(s.id)}>
                  <IoTrashOutline />
                </DeleteBtn>
              </ActionTd>
            </TRow>
          ))}

          <TotalRow>Total geral: {fmt(totalAgend)}</TotalRow>
        </TherapyTable>

        <TableFooter>
          <AddSessionBtn onClick={() => setShowAddModal(true)}>
            <IoAddOutline size={15} />
            Adicionar
          </AddSessionBtn>
        </TableFooter>
      </TableCard>

      {/* ── Add session modal ──────────────────────────────────── */}
      {showAddModal && (
        <ModalOverlay onClick={() => setShowAddModal(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Liberar sessões para agendamento</ModalTitle>
              <CloseBtn onClick={() => setShowAddModal(false)}>
                <IoCloseOutline />
              </CloseBtn>
            </ModalHeader>

            <FieldGroup>
              <Label htmlFor="ther-select">Terapia</Label>
              <SelectWrapper>
                <Select
                  id="ther-select"
                  value={newTerapia}
                  onChange={e => setNewTerapia(e.target.value)}
                >
                  <option value="">Selecione ou pesquise</option>
                  {AVAILABLE_THERAPIES.map(t => (
                    <option key={t.label} value={t.label}>
                      {t.label}
                    </option>
                  ))}
                </Select>
                <IoChevronDownOutline />
              </SelectWrapper>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="qty-input">Quantidade de sessões *</Label>
              <Input
                id="qty-input"
                type="number"
                min={1}
                placeholder="Digite a quantidade de sessões"
                value={newQtd}
                onChange={e => setNewQtd(e.target.value)}
              />
            </FieldGroup>

            <ModalFooter>
              <BtnOutline onClick={() => setShowAddModal(false)}>
                Cancelar
              </BtnOutline>
              <BtnPrimary onClick={handleAddSession}>
                <IoSaveOutline size={14} />
                Liberar
              </BtnPrimary>
            </ModalFooter>
          </Modal>
        </ModalOverlay>
      )}

      {/* ── Delete confirmation ────────────────────────────────── */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Remover terapia?"
        message="Deseja remover esta terapia das sessões autorizadas para agendamento?"
        confirmLabel="Remover"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* ── Cancel authorization confirmation ──────────────────── */}
      <ConfirmModal
        isOpen={showCancelConfirm}
        title="Cancelar autorização?"
        message="Tem certeza que deseja cancelar esta autorização? Esta ação não poderá ser desfeita."
        confirmLabel="Sim, cancelar"
        confirmVariant="danger"
        onConfirm={() => {
          setShowCancelConfirm(false);
          router.push('/autorizacoes');
        }}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </Page>
  );
};

export default AutrizacaoDetalhesPage;
