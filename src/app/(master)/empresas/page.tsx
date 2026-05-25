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
const MOCK_EMPRESAS = [
  { id: 'emp-1', nome: 'Exata Assessoria Contábil', ativo: true },
  { id: 'emp-2', nome: 'Primo Consultoria Contábil', ativo: false },
  { id: 'emp-3', nome: 'Astorias Contabilidade e Gestão', ativo: true },
  { id: 'emp-4', nome: 'Meta Soluções Contábeis', ativo: false },
  { id: 'emp-5', nome: 'Value Contabilidade Empresarial', ativo: true },
  { id: 'emp-6', nome: 'Ápice Assessoria Contábil e Fiscal', ativo: false },
  { id: 'emp-7', nome: 'Prisma Contabilidade Associados', ativo: true },
  { id: 'emp-8', nome: 'Integra Gestão Contábil', ativo: false },
  { id: 'emp-9', nome: 'Logike Contabilidade Digital', ativo: true },
  { id: 'emp-10', nome: 'Aliança Assessoria Contábil', ativo: false },
];

/* ── Component ───────────────────────────────────────────────────── */
const EmpresasPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [empresas, setEmpresas] = useState(MOCK_EMPRESAS);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    id: string;
    ativo: boolean;
  }>({
    open: false,
    id: '',
    ativo: false,
  });

  const filtered = empresas.filter(e =>
    e.nome.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = (id: string, ativo: boolean) => {
    setConfirmModal({ open: true, id, ativo });
  };

  const handleConfirmToggle = () => {
    setEmpresas(prev =>
      prev.map(e => (e.id === confirmModal.id ? { ...e, ativo: !e.ativo } : e)),
    );
    setConfirmModal({ open: false, id: '', ativo: false });
  };

  return (
    <Page>
      <Card>
        <Header>
          <TitleArea>
            <Title>Empresas</Title>
            <Subtitle>Gerencie aqui as empresas</Subtitle>
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
            <Link href="/empresas/cadastrar" style={{ textDecoration: 'none' }}>
              <BtnPrimary as="span">
                <IoAddSharp /> Nova empresa
              </BtnPrimary>
            </Link>
          </SearchRow>
        </Header>

        <TableWrapper>
          <StyledTable>
            <Thead>
              <tr>
                <Th $sortable>Nome da empresa ↕</Th>
                <Th style={{ textAlign: 'right' }}>Ações</Th>
              </tr>
            </Thead>
            <Tbody>
              {filtered.map(e => (
                <Tr key={e.id}>
                  <Td>{e.nome}</Td>
                  <Td>
                    <ActionCell style={{ justifyContent: 'flex-end' }}>
                      <Link href={`/empresas/${e.id}`}>
                        <IconBtn as="span" title="Ver detalhes">
                          <IoEyeSharp />
                        </IconBtn>
                      </Link>
                      <Toggle
                        $active={e.ativo}
                        onClick={() => handleToggle(e.id, e.ativo)}
                        title={e.ativo ? 'Inativar' : 'Ativar'}
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
            ? 'Tem certeza que deseja desativar a empresa?'
            : 'Tem certeza que deseja ativar a empresa?'
        }
        confirmLabel={confirmModal.ativo ? 'Inativar' : 'Ativar'}
        confirmVariant={confirmModal.ativo ? 'warning' : 'success'}
        onConfirm={handleConfirmToggle}
        onCancel={() => setConfirmModal({ open: false, id: '', ativo: false })}
      />
    </Page>
  );
};

export default EmpresasPage;
