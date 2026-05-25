'use client';

import { useState } from 'react';
import { IoAddSharp, IoEyeSharp, IoSearchOutline } from 'react-icons/io5';
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

/* ── White card ──────────────────────────────────────────────────── */
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
`;

/* ── Header ──────────────────────────────────────────────────────── */
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1rem;
`;

const TitleArea = styled.div``;

const Title = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const Subtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray88};
  margin-top: 0.25rem;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

const BtnPrimary = styled.button`
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.55rem 1.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.88;
  }
`;

/* ── Action icons ────────────────────────────────────────────────── */
const IconBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray88};
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Toggle = styled.button<{ $active: boolean }>`
  width: 38px;
  height: 20px;
  border-radius: 12px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : '#ccc'};
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 2px;
    left: ${({ $active }) => ($active ? '20px' : '2px')};
    transition: left 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
`;

/* ── Mock data ───────────────────────────────────────────────────── */
const MOCK_PLANOS = [
  { id: 'pl-1', nome: 'Unimed', ativo: true },
  { id: 'pl-2', nome: 'Amil', ativo: false },
  { id: 'pl-3', nome: 'Bradesco Saúde', ativo: true },
  { id: 'pl-4', nome: 'Hapvida', ativo: false },
  { id: 'pl-5', nome: 'NotreDame Intermédica', ativo: true },
  { id: 'pl-6', nome: 'Porto Saúde', ativo: false },
  { id: 'pl-7', nome: 'Prevent Senior', ativo: true },
  { id: 'pl-8', nome: 'Omint', ativo: false },
];

/* ── Component ───────────────────────────────────────────────────── */
const PlanosDeSaudePage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [planos, setPlanos] = useState(MOCK_PLANOS);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    id: string;
    ativo: boolean;
  }>({
    open: false,
    id: '',
    ativo: false,
  });

  const filtered = planos.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = (id: string, ativo: boolean) => {
    setConfirmModal({ open: true, id, ativo });
  };

  const handleConfirmToggle = () => {
    setPlanos(prev =>
      prev.map(p => (p.id === confirmModal.id ? { ...p, ativo: !p.ativo } : p)),
    );
    setConfirmModal({ open: false, id: '', ativo: false });
  };

  return (
    <Page>
      <Card>
        <Header>
          <TitleArea>
            <Title>Planos de saúde</Title>
            <Subtitle>Gerencie aqui os planos de saúde</Subtitle>
          </TitleArea>

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
              href="/planos-de-saude/cadastrar"
              style={{ textDecoration: 'none' }}
            >
              <BtnPrimary as="span">
                <IoAddSharp /> Novo plano
              </BtnPrimary>
            </Link>
          </SearchRow>
        </Header>

        <TableWrapper>
          <StyledTable>
            <Thead>
              <tr>
                <Th $sortable>Nome do plano ↕</Th>
                <Th style={{ textAlign: 'right' }}>Ações</Th>
              </tr>
            </Thead>
            <Tbody>
              {filtered.map(p => (
                <Tr key={p.id}>
                  <Td>{p.nome}</Td>
                  <Td>
                    <ActionCell style={{ justifyContent: 'flex-end' }}>
                      <Link href={`/planos-de-saude/${p.id}`}>
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

      {/* Confirm Toggle Modal */}
      <ConfirmModal
        isOpen={confirmModal.open}
        title={confirmModal.ativo ? 'Inativar?' : 'Ativar?'}
        message={
          confirmModal.ativo
            ? 'Tem certeza que deseja desativar o plano de saúde?'
            : 'Tem certeza que deseja ativar o plano de saúde?'
        }
        confirmLabel={confirmModal.ativo ? 'Inativar' : 'Ativar'}
        confirmVariant={confirmModal.ativo ? 'warning' : 'success'}
        onConfirm={handleConfirmToggle}
        onCancel={() => setConfirmModal({ open: false, id: '', ativo: false })}
      />
    </Page>
  );
};

export default PlanosDeSaudePage;
