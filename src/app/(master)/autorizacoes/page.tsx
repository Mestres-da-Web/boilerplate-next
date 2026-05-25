'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled, { keyframes, css } from 'styled-components';
import {
  IoEyeOutline,
  IoBanOutline,
  IoFilterOutline,
  IoCloseOutline,
  IoSearchOutline,
  IoChevronDownOutline,
} from 'react-icons/io5';

import Pagination from '@/components/Pagination/Pagination';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import {
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  ActionCell,
} from '@/components/Table/styles';

/* ── Animations ─────────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
`;

/* ── Layout ──────────────────────────────────────────────────────── */
const Page = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: calc(100vh - 80px);
  animation: ${fadeIn} 0.25s ease;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

/* ── Header ──────────────────────────────────────────────────────── */
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
  gap: 1rem;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

/* ── Search ──────────────────────────────────────────────────────── */
const SearchWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.gray88};
    font-size: 1rem;
  }
`;

const SearchInput = styled.input`
  height: 2.25rem;
  padding: 0 0.875rem 0 2.25rem;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  width: 220px;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayb7};
  }
`;

const FilterBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
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

/* ── Table customization for wide table ──────────────────────────── */
const WideTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  /* Pink scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary}80
    ${({ theme }) => theme.colors.grayf5};

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grayf5};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    opacity: 0.8;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
    opacity: 1;
  }
`;

const WideTable = styled.table`
  min-width: 1100px;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
`;

/* ── Action icons ─────────────────────────────────────────────────── */
const IconBtn = styled.button<{ $color?: string }>`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ $color, theme }) => $color || theme.colors.primary};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  padding: 3px;
  border-radius: 6px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }
`;

/* ── Filter Drawer ───────────────────────────────────────────────── */
const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 900;
  animation: ${fadeIn} 0.18s ease;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: #fff;
  z-index: 901;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.25rem;
  animation: ${slideRight} 0.22s ease;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DrawerTitle = styled.p`
  font-size: 1.125rem;
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
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.gray4c};
  }
`;

const DrawerFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DrawerField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const DrawerLabel = styled.label`
  font-size: 0.8rem;
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

const DrawerSelect = styled.select`
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

const DateInput = styled.input`
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

const DrawerFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: auto;
`;

const BtnFull = styled.button<{ $outlined?: boolean }>`
  width: 100%;
  height: 2.75rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  ${({ $outlined, theme }) =>
    $outlined
      ? css`
          border: 1px solid ${theme.colors.primary};
          background: transparent;
          color: ${theme.colors.primary};
        `
      : css`
          border: none;
          background: ${theme.colors.primary};
          color: #fff;
        `}

  &:hover {
    opacity: 0.88;
  }
`;

/* ── Mock data ───────────────────────────────────────────────────── */
const PLANOS = ['Unimed', 'Amil', 'Bradesco Saúde', 'Hapvida'];

const MOCK_DATA = Array.from({ length: 10 }, (_, i) => ({
  id: `aut-${i}`,
  paciente: i % 2 === 0 ? 'Lucas Andrade Silva' : 'Maria Carolina Cardoso',
  dataNascimento: '14/08/2018',
  plano: 'Unimed',
  cpf: '123.456.789-10',
  responsavel: [
    'Carolina Ribeiro',
    'Felipe Silva',
    'Eduardo Gonçalves',
    'Brenda Prado',
    'Juliana Lima',
    'Fernanda Cardoso',
    'Theo Alencar',
    'Sofia Albuquerque',
    'Manuela Dias',
    'Denis Santos',
  ][i],
  telefone: '(63) 95432-5646',
  dataAutorizacao: '19/10/2025',
  dataAgendamento: '19/10/2025',
}));

/* ── Component ───────────────────────────────────────────────────── */
const AutorizacoesPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  /* filter drawer */
  const [showFilter, setShowFilter] = useState(false);
  const [filterPlano, setFilterPlano] = useState('');
  const [filterDe, setFilterDe] = useState('');
  const [filterAte, setFilterAte] = useState('');

  /* block confirm */
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const handleBlock = (id: string) => {
    setSelectedId(id);
    setShowBlockConfirm(true);
  };

  const handleClear = () => {
    setFilterPlano('');
    setFilterDe('');
    setFilterAte('');
  };

  return (
    <Page>
      <Card>
        {/* Header */}
        <CardHeader>
          <Title>Autorizações</Title>
          <HeaderActions>
            <SearchWrapper>
              <IoSearchOutline />
              <SearchInput
                placeholder="Buscar paciente..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </SearchWrapper>
            <AddBtn onClick={() => router.push('/autorizacoes/cadastrar')}>
              + Adicionar
            </AddBtn>
            <FilterBtn onClick={() => setShowFilter(true)}>
              <IoFilterOutline size={15} />
              Filtrar
            </FilterBtn>
          </HeaderActions>
        </CardHeader>

        {/* Wide table */}
        <WideTableWrapper>
          <WideTable>
            <Thead>
              <tr>
                <Th>Ações</Th>
                <Th $sortable>Paciente ↕</Th>
                <Th>Data de nascimento</Th>
                <Th>Plano</Th>
                <Th>CPF do paciente</Th>
                <Th>Responsável</Th>
                <Th>Telefone do responsável</Th>
                <Th>Data de autorização</Th>
                <Th>Data de agendamento</Th>
              </tr>
            </Thead>
            <Tbody>
              {MOCK_DATA.map(row => (
                <Tr key={row.id}>
                  <Td>
                    <ActionCell>
                      <IconBtn
                        title="Visualizar"
                        onClick={() => router.push(`/autorizacoes/${row.id}`)}
                      >
                        <IoEyeOutline />
                      </IconBtn>
                      <IconBtn
                        title="Bloquear"
                        $color="#f284a4"
                        onClick={() => handleBlock(row.id)}
                      >
                        <IoBanOutline />
                      </IconBtn>
                    </ActionCell>
                  </Td>
                  <Td>{row.paciente}</Td>
                  <Td>{row.dataNascimento}</Td>
                  <Td>{row.plano}</Td>
                  <Td>{row.cpf}</Td>
                  <Td>{row.responsavel}</Td>
                  <Td>{row.telefone}</Td>
                  <Td>{row.dataAutorizacao}</Td>
                  <Td>{row.dataAgendamento}</Td>
                </Tr>
              ))}
            </Tbody>
          </WideTable>
        </WideTableWrapper>

        <div style={{ padding: '0 1.75rem' }}>
          <Pagination
            currentPage={page}
            totalPages={30}
            totalItems={300}
            itemsPerPage={10}
            onPageChange={setPage}
          />
        </div>
      </Card>

      {/* ── Filter Drawer ───────────────────────────────────── */}
      {showFilter && (
        <>
          <DrawerOverlay onClick={() => setShowFilter(false)} />
          <Drawer>
            <DrawerHeader>
              <DrawerTitle>Filtrar</DrawerTitle>
              <CloseBtn onClick={() => setShowFilter(false)}>
                <IoCloseOutline />
              </CloseBtn>
            </DrawerHeader>

            <DrawerFields>
              <DrawerField>
                <DrawerLabel htmlFor="aut-plano">Plano</DrawerLabel>
                <SelectWrapper>
                  <DrawerSelect
                    id="aut-plano"
                    value={filterPlano}
                    onChange={e => setFilterPlano(e.target.value)}
                  >
                    <option value="">Todos os planos</option>
                    {PLANOS.map(p => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </DrawerSelect>
                  <IoChevronDownOutline />
                </SelectWrapper>
              </DrawerField>

              <DrawerField>
                <DrawerLabel htmlFor="aut-de">
                  Data de autorização — De
                </DrawerLabel>
                <DateInput
                  id="aut-de"
                  placeholder="dd/mm/aaaa"
                  value={filterDe}
                  onChange={e => setFilterDe(e.target.value)}
                />
              </DrawerField>

              <DrawerField>
                <DrawerLabel htmlFor="aut-ate">
                  Data de autorização — Até
                </DrawerLabel>
                <DateInput
                  id="aut-ate"
                  placeholder="dd/mm/aaaa"
                  value={filterAte}
                  onChange={e => setFilterAte(e.target.value)}
                />
              </DrawerField>
            </DrawerFields>

            <DrawerFooter>
              <BtnFull onClick={() => setShowFilter(false)}>Filtrar</BtnFull>
              <BtnFull $outlined onClick={handleClear}>
                Limpar
              </BtnFull>
            </DrawerFooter>
          </Drawer>
        </>
      )}

      {/* ── Block confirmation modal ────────────────────────── */}
      <ConfirmModal
        isOpen={showBlockConfirm}
        title="Bloquear autorização?"
        message="Tem certeza que deseja bloquear esta autorização? Esta ação não pode ser desfeita."
        confirmLabel="Bloquear"
        confirmVariant="danger"
        onConfirm={() => {
          console.log('Blocked:', selectedId);
          setShowBlockConfirm(false);
        }}
        onCancel={() => setShowBlockConfirm(false)}
      />
    </Page>
  );
};

export default AutorizacoesPage;
