'use client';

import { useState } from 'react';
import {
  IoDocumentTextOutline,
  IoCalendarOutline,
  IoSearchOutline,
  IoFilterOutline,
  IoEyeSharp,
  IoCloseOutline,
  IoCheckmarkCircleSharp,
} from 'react-icons/io5';
import styled, { keyframes } from 'styled-components';

import Pagination from '@/components/Pagination/Pagination';
import {
  TableWrapper,
  StyledTable,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  ActionCell,
} from '@/components/Table/styles';

/* ── Layout ───────────────────────────────────────────────────────── */
const Page = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: calc(100vh - 80px);
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const MainCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.75rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation: fadeInBackdrop 0.2s ease-out;

  @keyframes fadeInBackdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DrawerCard = styled.div`
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 360px;
  max-width: 100%;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  padding: 2.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 1001;
  animation: slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
`;

const DrawerButtons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: auto;
`;

const DrawerActionBtn = styled.button<{ $outline?: boolean }>`
  flex: 1;
  border: ${({ $outline, theme }) =>
    $outline ? `1px solid ${theme.colors.primary}` : 'none'};
  background: ${({ $outline, theme }) =>
    $outline ? '#fff' : theme.colors.primary};
  color: ${({ $outline, theme }) => ($outline ? theme.colors.primary : '#fff')};
  border-radius: 8px;
  padding: 0.65rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;

  &:hover {
    opacity: 0.88;
    background: ${({ $outline }) => ($outline ? '#fcfcfc' : '')};
  }
`;

/* ── Title Area ───────────────────────────────────────────────────── */
const TitleArea = styled.div`
  margin-bottom: 1.25rem;
`;

const Title = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

/* ── Inner Navigation Tabs ────────────────────────────────────────── */
const TabsRow = styled.div`
  display: flex;
  gap: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
  margin-bottom: 1.5rem;
`;

const SubTabButton = styled.button<{ $active: boolean }>`
  border: none;
  background: transparent;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.grayb7};
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 1.05rem;
  }
`;

/* ── Controls Row ─────────────────────────────────────────────────── */
const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: #f284a4;
  font-size: 1rem;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 24px;
  padding: 0.55rem 0.75rem 0.55rem 2.25rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  transition: border 0.15s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayb7};
  }
`;

const ActionBtn = styled.button<{ $outline?: boolean }>`
  border: ${({ $outline, theme }) =>
    $outline ? `1px solid ${theme.colors.primary}` : 'none'};
  background: ${({ $outline, theme }) =>
    $outline ? '#fff' : theme.colors.primary};
  color: ${({ $outline, theme }) => ($outline ? theme.colors.primary : '#fff')};
  border-radius: 8px;
  padding: 0.55rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;

  &:hover {
    opacity: 0.88;
    background: ${({ $outline }) => ($outline ? '#fcfcfc' : '')};
  }
`;

/* ── Status badge ─────────────────────────────────────────────────── */
const StatusBadge = styled.span<{ $justificada: boolean }>`
  font-weight: 600;
  font-size: 0.8125rem;
  color: ${({ $justificada }) => ($justificada ? '#10b981' : '#ef4444')};
`;

/* ── Sidebar Elements ─────────────────────────────────────────────── */
const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
  padding-bottom: 0.75rem;
`;

const SidebarTitle = styled.h2`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grayb7};
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  padding: 2px;
  border-radius: 4px;
  transition: color 0.15s;
  &:hover {
    color: ${({ theme }) => theme.colors.gray4c};
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
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

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  width: 100%;
  background-color: #fff;
  transition: border 0.15s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/* ── PDF Generation States ────────────────────────────────────────── */
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(242, 132, 164, 0.1);
  border-left-color: #f284a4;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  animation: ${spin} 1s linear infinite;
  margin: 0.5rem auto 1rem;
`;

const StatusWrapper = styled.div`
  text-align: center;
  padding: 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StatusTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const StatusText = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray88};
  margin-bottom: 0.5rem;
`;

const SuccessIcon = styled(IoCheckmarkCircleSharp)`
  color: #10b981;
  font-size: 2.75rem;
  margin-bottom: 0.5rem;
`;

/* ── Mock Data ────────────────────────────────────────────────────── */
const MOCK_EXTRATOS = [
  {
    id: '1',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Carolina Ribeiro',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
  {
    id: '2',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Felipe Silva',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
  {
    id: '3',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Eduardo Gonçalves',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
  {
    id: '4',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Brenda Prado',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
  {
    id: '5',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Juliana Lima',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
  {
    id: '6',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Fernanda Cardoso',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
  {
    id: '7',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Theo Alencar',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
  {
    id: '8',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Sofia Albuquerque',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
  {
    id: '9',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Manuela Dias',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
  {
    id: '10',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Denis Santos',
    dataHora: '19/10/2025 - 10:25h',
    valor: 'R$85,00',
  },
];

const MOCK_FALTAS = [
  {
    id: '1',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Carolina Ribeiro',
    valor: 'R$85,00',
    status: 'Justificada',
    motivo: 'Motivos pessoais',
  },
  {
    id: '2',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Felipe Silva',
    valor: 'R$85,00',
    status: 'Não justificada',
    motivo: '',
  },
  {
    id: '3',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Eduardo Gonçalves',
    valor: 'R$85,00',
    status: 'Justificada',
    motivo: 'Consulta médica de emergência',
  },
  {
    id: '4',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Brenda Prado',
    valor: 'R$85,00',
    status: 'Não justificada',
    motivo: '',
  },
  {
    id: '5',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Juliana Lima',
    valor: 'R$85,00',
    status: 'Justificada',
    motivo: 'Falta de transporte',
  },
  {
    id: '6',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Fernanda Cardoso',
    valor: 'R$85,00',
    status: 'Não justificada',
    motivo: '',
  },
  {
    id: '7',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Theo Alencar',
    valor: 'R$85,00',
    status: 'Justificada',
    motivo: 'Problemas familiares',
  },
  {
    id: '8',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Sofia Albuquerque',
    valor: 'R$85,00',
    status: 'Não justificada',
    motivo: '',
  },
  {
    id: '9',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Lucas Andrade Silva',
    profissional: 'Manuela Dias',
    valor: 'R$85,00',
    status: 'Justificada',
    motivo: 'Motivos pessoais',
  },
  {
    id: '10',
    dataHora: '19/10/2025 - 10:25h',
    paciente: 'Maria Carolina Cardoso',
    profissional: 'Denis Santos',
    valor: 'R$85,00',
    status: 'Não justificada',
    motivo: '',
  },
];

type FaltaItem = {
  id: string;
  dataHora: string;
  paciente: string;
  profissional: string;
  valor: string;
  status: string;
  motivo: string;
};

/* ── Main Component ───────────────────────────────────────────────── */
const OperacionalPage = () => {
  const [activeSubTab, setActiveSubTab] = useState<'extratos' | 'faltas'>(
    'extratos',
  );
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  /* Sidebar/Modal States */
  const [filterOpen, setFilterOpen] = useState(false);
  const [pdfState, setPdfState] = useState<'idle' | 'generating' | 'success'>(
    'idle',
  );
  const [selectedFalta, setSelectedFalta] = useState<FaltaItem | null>(null);

  /* Checkbox State (for statements) */
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  /* Filter fields */
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filterProf, setFilterProf] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(MOCK_EXTRATOS.map(r => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rId => rId !== id));
    }
  };

  const handleGeneratePdf = () => {
    setPdfState('generating');
    setTimeout(() => {
      setPdfState('success');
    }, 1500);
  };

  const handleClearFilters = () => {
    setDateFrom('');
    setDateTo('');
    setFilterProf('');
    setFilterStatus('');
  };

  // Filter items
  const filteredExtratos = MOCK_EXTRATOS.filter(item => {
    const matchesSearch = item.paciente
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesProf = filterProf ? item.profissional === filterProf : true;
    return matchesSearch && matchesProf;
  });

  const filteredFaltas = MOCK_FALTAS.filter(item => {
    const matchesSearch = item.paciente
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <Page>
      <ContentLayout>
        <MainCard>
          <TitleArea>
            <Title>Operacional</Title>
          </TitleArea>

          <TabsRow>
            <SubTabButton
              type="button"
              $active={activeSubTab === 'extratos'}
              onClick={() => {
                setActiveSubTab('extratos');
                setSelectedFalta(null);
                setFilterOpen(false);
              }}
            >
              <IoDocumentTextOutline />
              Extratos de atendimento
            </SubTabButton>
            <SubTabButton
              type="button"
              $active={activeSubTab === 'faltas'}
              onClick={() => {
                setActiveSubTab('faltas');
                setSelectedFalta(null);
                setFilterOpen(false);
              }}
            >
              <IoCalendarOutline />
              Registros de faltas
            </SubTabButton>
          </TabsRow>

          <ControlsRow>
            <SearchWrapper>
              <SearchIcon>
                <IoSearchOutline />
              </SearchIcon>
              <SearchInput
                placeholder="Busque pelo nome"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </SearchWrapper>

            {activeSubTab === 'extratos' && (
              <ActionBtn type="button" onClick={handleGeneratePdf}>
                <IoDocumentTextOutline /> Gerar extrato
              </ActionBtn>
            )}

            <ActionBtn
              type="button"
              $outline
              onClick={() => {
                setFilterOpen(prev => !prev);
                setSelectedFalta(null);
              }}
            >
              <IoFilterOutline /> Filtrar
            </ActionBtn>
          </ControlsRow>

          {activeSubTab === 'extratos' ? (
            <TableWrapper>
              <StyledTable>
                <Thead>
                  <tr>
                    <Th style={{ width: '50px' }}>
                      <input
                        type="checkbox"
                        checked={
                          selectedRows.length === MOCK_EXTRATOS.length &&
                          MOCK_EXTRATOS.length > 0
                        }
                        onChange={e => handleSelectAll(e.target.checked)}
                      />
                    </Th>
                    <Th $sortable>Paciente ↕</Th>
                    <Th>Profissional</Th>
                    <Th>Data/Hora</Th>
                    <Th>Valor da consulta</Th>
                  </tr>
                </Thead>
                <Tbody>
                  {filteredExtratos.map(item => (
                    <Tr key={item.id}>
                      <Td>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={e =>
                            handleSelectRow(item.id, e.target.checked)
                          }
                        />
                      </Td>
                      <Td style={{ fontWeight: 500 }}>{item.paciente}</Td>
                      <Td>{item.profissional}</Td>
                      <Td>{item.dataHora}</Td>
                      <Td>{item.valor}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </StyledTable>
            </TableWrapper>
          ) : (
            <TableWrapper>
              <StyledTable>
                <Thead>
                  <tr>
                    <Th $sortable>Data/Hora ↕</Th>
                    <Th>Paciente</Th>
                    <Th>Profissional</Th>
                    <Th>Valor da consulta</Th>
                    <Th>Status</Th>
                    <Th style={{ textAlign: 'center' }}>Selecione</Th>
                  </tr>
                </Thead>
                <Tbody>
                  {filteredFaltas.map(item => (
                    <Tr key={item.id}>
                      <Td>{item.dataHora}</Td>
                      <Td style={{ fontWeight: 500 }}>{item.paciente}</Td>
                      <Td>{item.profissional}</Td>
                      <Td>{item.valor}</Td>
                      <Td>
                        <StatusBadge
                          $justificada={item.status === 'Justificada'}
                        >
                          {item.status}
                        </StatusBadge>
                      </Td>
                      <Td style={{ textAlign: 'center' }}>
                        {item.status === 'Justificada' ? (
                          <ActionCell style={{ justifyContent: 'center' }}>
                            <ActionBtn
                              type="button"
                              $outline
                              style={{
                                padding: '4px 8px',
                                borderRadius: '6px',
                              }}
                              onClick={() => {
                                setSelectedFalta(item);
                                setFilterOpen(false);
                              }}
                              title="Visualizar motivo"
                            >
                              <IoEyeSharp size={14} />
                            </ActionBtn>
                          </ActionCell>
                        ) : (
                          '-'
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </StyledTable>
            </TableWrapper>
          )}

          <Pagination
            currentPage={page}
            totalPages={30}
            totalItems={300}
            itemsPerPage={10}
            onPageChange={setPage}
          />
        </MainCard>

        {/* Backdrop Overlay */}
        {(filterOpen || pdfState !== 'idle' || selectedFalta !== null) && (
          <Backdrop
            onClick={() => {
              setFilterOpen(false);
              setPdfState('idle');
              setSelectedFalta(null);
            }}
          />
        )}

        {/* ── Filter Sidebar ────────────────────────────────────────── */}
        {filterOpen && (
          <DrawerCard>
            <SidebarHeader>
              <SidebarTitle>Filtrar</SidebarTitle>
              <CloseBtn type="button" onClick={() => setFilterOpen(false)}>
                <IoCloseOutline />
              </CloseBtn>
            </SidebarHeader>

            <DrawerContent>
              <FieldGroup>
                <Label>De</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                />
              </FieldGroup>

              <FieldGroup>
                <Label>Até</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                />
              </FieldGroup>

              {activeSubTab === 'extratos' ? (
                <FieldGroup>
                  <Label>Profissional</Label>
                  <Select
                    value={filterProf}
                    onChange={e => setFilterProf(e.target.value)}
                  >
                    <option value="">Selecione ou pesquise</option>
                    <option value="Carolina Ribeiro">Carolina Ribeiro</option>
                    <option value="Felipe Silva">Felipe Silva</option>
                    <option value="Eduardo Gonçalves">Eduardo Gonçalves</option>
                    <option value="Brenda Prado">Brenda Prado</option>
                    <option value="Juliana Lima">Juliana Lima</option>
                  </Select>
                </FieldGroup>
              ) : (
                <FieldGroup>
                  <Label>Status</Label>
                  <Select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Justificada">Justificada</option>
                    <option value="Não justificada">Não justificada</option>
                  </Select>
                </FieldGroup>
              )}
            </DrawerContent>

            <DrawerButtons>
              <DrawerActionBtn
                type="button"
                onClick={() => setFilterOpen(false)}
              >
                Filtrar
              </DrawerActionBtn>
              <DrawerActionBtn
                type="button"
                $outline
                onClick={handleClearFilters}
              >
                Limpar
              </DrawerActionBtn>
            </DrawerButtons>
          </DrawerCard>
        )}

        {/* ── PDF Generation Sidebar States ─────────────────────────── */}
        {activeSubTab === 'extratos' && pdfState !== 'idle' && (
          <DrawerCard>
            <SidebarHeader>
              <SidebarTitle>Gerar extrato</SidebarTitle>
              <CloseBtn type="button" onClick={() => setPdfState('idle')}>
                <IoCloseOutline />
              </CloseBtn>
            </SidebarHeader>

            <DrawerContent>
              {pdfState === 'generating' && (
                <StatusWrapper>
                  <Spinner />
                  <StatusTitle>Gerando PDF...</StatusTitle>
                  <StatusText>Por favor, aguarde um instante</StatusText>
                </StatusWrapper>
              )}

              {pdfState === 'success' && (
                <StatusWrapper>
                  <SuccessIcon />
                  <StatusTitle>Sucesso!</StatusTitle>
                  <StatusText>PDF gerado com sucesso!</StatusText>
                  <ActionBtn
                    type="button"
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      background: '#22c55e',
                    }}
                    onClick={() => setPdfState('idle')}
                  >
                    Voltar
                  </ActionBtn>
                </StatusWrapper>
              )}
            </DrawerContent>
          </DrawerCard>
        )}

        {/* ── Lack Details Modal/Sidebar ───────────────────────────── */}
        {activeSubTab === 'faltas' && selectedFalta && (
          <DrawerCard>
            <SidebarHeader>
              <SidebarTitle>Motivo de falta</SidebarTitle>
              <CloseBtn type="button" onClick={() => setSelectedFalta(null)}>
                <IoCloseOutline />
              </CloseBtn>
            </SidebarHeader>

            <DrawerContent>
              <FieldGroup>
                <Label>Observações</Label>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: '#4c4c4c',
                    background: '#f6f9fa',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  {selectedFalta.motivo || 'Nenhuma observação informada.'}
                </p>
              </FieldGroup>
            </DrawerContent>

            <DrawerButtons>
              <DrawerActionBtn
                type="button"
                onClick={() => setSelectedFalta(null)}
              >
                Voltar
              </DrawerActionBtn>
            </DrawerButtons>
          </DrawerCard>
        )}
      </ContentLayout>
    </Page>
  );
};

export default OperacionalPage;
