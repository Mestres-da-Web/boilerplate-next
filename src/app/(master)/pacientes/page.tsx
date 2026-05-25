'use client';

import { useState } from 'react';
import {
  IoAddSharp,
  IoFilterSharp,
  IoEyeSharp,
  IoSearchOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import styled from 'styled-components';

import ConfirmModal from '@/components/Modal/ConfirmModal';
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

/* ── Page wrapper ────────────────────────────────────────────────── */
const Page = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: calc(100vh - 80px);
`;

/* ── Single white card wrapping everything ────────────────────────── */
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-wrap: wrap;
`;

/* ── Search with icon ─────────────────────────────────────────────── */
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  color: #f284a4;
  font-size: 1rem;
  pointer-events: none;
`;

const SearchInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 24px;
  padding: 0.5rem 1rem 0.5rem 2.25rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  width: 260px;
  outline: none;
  transition: border 0.15s;
  background: #fff;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayb7};
  }
`;

/* ── Buttons ──────────────────────────────────────────────────────── */
const BtnPrimary = styled.button`
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.5rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
  }
`;

const BtnOutline = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  background: #fff;
  color: ${({ theme }) => theme.colors.gray4c};
  padding: 0.5rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/* ── Action Icons ─────────────────────────────────────────────────── */
const IconBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray88};
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/* ── Toggle switch ────────────────────────────────────────────────── */
const Toggle = styled.button<{ $active: boolean }>`
  width: 42px;
  height: 22px;
  border-radius: 11px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : '#ccc'};
  position: relative;
  cursor: pointer;
  transition: background 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $active }) => ($active ? '22px' : '2px')};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    transition: left 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
`;

/* ── Filter Drawer ────────────────────────────────────────────────── */
const FilterOverlay = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 200;
  align-items: flex-start;
  justify-content: flex-end;
`;

const FilterPanel = styled.div`
  background: #fff;
  width: 320px;
  height: 100vh;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
  overflow-y: auto;
`;

const FilterTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
  display: block;
  margin-bottom: 0.35rem;
`;

const FilterSelect = styled.select`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
`;

const BtnFilter = styled.button<{ $outline?: boolean }>`
  flex: 1;
  border: ${({ $outline, theme }) =>
    $outline ? `1px solid ${theme.colors.primary}` : 'none'};
  background: ${({ $outline, theme }) =>
    $outline ? 'transparent' : theme.colors.primary};
  color: ${({ $outline, theme }) => ($outline ? theme.colors.primary : '#fff')};
  border-radius: 8px;
  padding: 0.65rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.85;
  }
`;

/* ── Mock data ────────────────────────────────────────────────────── */
const MOCK_PACIENTES = Array.from({ length: 10 }, (_, i) => ({
  id: `p-${i + 1}`,
  nome: [
    'Lucas Andrade Silva',
    'Sofia Menezes Duarte',
    'Rafael Torres Lima',
    'Beatriz Ramos Oliveira',
    'Enzo Martins Costa',
    'Helena Duarte Nogueira',
    'Miguel Rocha Fernandes',
    'Laura Castro Almeida',
    'Pedro Henrique Souza',
    'Valentina Moraes Teixeira',
  ][i],
  cid: 'F084.0',
  idade: [
    '5 anos, 3 meses e 0 dias',
    '5 anos, 8 meses e 15 dias',
    '9 anos, 2 meses e 0 dias',
    '0 anos, 6 meses e 2 dias',
    '3 anos, 6 meses e 20 dias',
    '7 anos, 1 mês e 8 dias',
    '4 anos, 10 meses e 4 dias',
    '2 anos, 0 meses e 15 dias',
    '10 anos, 5 meses e 0 dias',
    '1 ano, 7 meses e 1 dia',
  ][i],
  responsavel: 'Carolina Ribeiro',
  telefone: '(63) 46543-5467',
  ativo: i !== 2,
}));

const PacientesPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    id: string;
    ativo: boolean;
  }>({
    open: false,
    id: '',
    ativo: false,
  });
  const [pacientes, setPacientes] = useState(MOCK_PACIENTES);

  const filtered = pacientes.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = (id: string, ativo: boolean) => {
    setConfirmModal({ open: true, id, ativo });
  };

  const handleConfirmToggle = () => {
    setPacientes(prev =>
      prev.map(p => (p.id === confirmModal.id ? { ...p, ativo: !p.ativo } : p)),
    );
    setConfirmModal({ open: false, id: '', ativo: false });
  };

  return (
    <Page>
      <Card>
        <Header>
          <Title>Pacientes</Title>
          <SearchRow>
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
            <Link
              href="/pacientes/cadastrar"
              style={{ textDecoration: 'none' }}
            >
              <BtnPrimary as="span">
                <IoAddSharp /> Adicionar
              </BtnPrimary>
            </Link>
            <BtnOutline onClick={() => setFilterOpen(true)}>
              <IoFilterSharp /> Filtrar
            </BtnOutline>
          </SearchRow>
        </Header>

        <TableWrapper>
          <StyledTable>
            <Thead>
              <tr>
                <Th $sortable>Nome do paciente ↕</Th>
                <Th $sortable>CID</Th>
                <Th $sortable>Idade</Th>
                <Th $sortable>Responsável</Th>
                <Th $sortable>Telefone do responsável</Th>
                <Th>Ações</Th>
              </tr>
            </Thead>
            <Tbody>
              {filtered.map(p => (
                <Tr key={p.id}>
                  <Td>{p.nome}</Td>
                  <Td>{p.cid}</Td>
                  <Td>{p.idade}</Td>
                  <Td>{p.responsavel}</Td>
                  <Td>{p.telefone}</Td>
                  <Td>
                    <ActionCell>
                      <Link href={`/pacientes/${p.id}`}>
                        <IconBtn as="span" title="Ver detalhes">
                          <IoEyeSharp />
                        </IconBtn>
                      </Link>
                      <Toggle
                        $active={p.ativo}
                        onClick={() => handleToggle(p.id, p.ativo)}
                        title={p.ativo ? 'Inativar' : 'Ativar'}
                      />
                    </ActionCell>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </StyledTable>
        </TableWrapper>

        <Pagination
          currentPage={page}
          totalPages={30}
          totalItems={300}
          itemsPerPage={10}
          onPageChange={setPage}
        />
      </Card>

      {/* Filter Panel */}
      <FilterOverlay $open={filterOpen} onClick={() => setFilterOpen(false)}>
        <FilterPanel onClick={e => e.stopPropagation()}>
          <FilterTitle>Filtrar</FilterTitle>
          <div>
            <FilterLabel>CID</FilterLabel>
            <FilterSelect>
              <option value="">Selecione ou pesquise</option>
              <option>F084.0</option>
            </FilterSelect>
          </div>
          <div>
            <FilterLabel>Empresa</FilterLabel>
            <FilterSelect>
              <option value="">Selecione ou pesquise</option>
            </FilterSelect>
          </div>
          <div>
            <FilterLabel>Plano de saúde</FilterLabel>
            <FilterSelect>
              <option value="">Selecione ou pesquise</option>
            </FilterSelect>
          </div>
          <FilterActions>
            <BtnFilter onClick={() => setFilterOpen(false)}>Filtrar</BtnFilter>
            <BtnFilter $outline onClick={() => setFilterOpen(false)}>
              Limpar
            </BtnFilter>
          </FilterActions>
        </FilterPanel>
      </FilterOverlay>

      {/* Confirm Toggle Modal */}
      <ConfirmModal
        isOpen={confirmModal.open}
        title={confirmModal.ativo ? 'Inativar?' : 'Ativar?'}
        message={
          confirmModal.ativo
            ? 'Tem certeza que deseja desativar o paciente?'
            : 'Tem certeza que deseja ativar o paciente?'
        }
        confirmLabel={confirmModal.ativo ? 'Inativar' : 'Ativar'}
        confirmVariant={confirmModal.ativo ? 'warning' : 'success'}
        onConfirm={handleConfirmToggle}
        onCancel={() => setConfirmModal({ open: false, id: '', ativo: false })}
      />
    </Page>
  );
};

export default PacientesPage;
