'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';
import {
  IoEyeOutline,
  IoPrintOutline,
  IoShareOutline,
  IoFilterOutline,
  IoCloseOutline,
  IoDocumentTextOutline,
  IoBarChartOutline,
  IoChevronDownOutline,
  IoArrowBackOutline,
  IoCloudDownloadOutline,
} from 'react-icons/io5';

import ConfirmModal from '@/components/Modal/ConfirmModal';
import Pagination from '@/components/Pagination/Pagination';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
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

/* ── Animations ─────────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.94); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
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
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
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

/* ── Sub-tabs ────────────────────────────────────────────────────── */
const TabBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0 1.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
`;

const TabBtn = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.1rem;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.gray88};
  cursor: pointer;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  margin-bottom: -1px;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardBody = styled.div`
  padding: 0 1.75rem 1.5rem;
`;

/* ── Table action icons ───────────────────────────────────────────── */
const IconBtn = styled.button<{ $color?: string }>`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ $color, theme }) => $color || theme.colors.primary};
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }
`;

/* ── Filter drawer ───────────────────────────────────────────────── */
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
  padding: 2px;
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

/* ── Print modal ─────────────────────────────────────────────────── */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.18s ease;
`;

const PrintCard = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  padding: 1.75rem 1.75rem 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  animation: ${scaleIn} 0.2s ease;
`;

const PrintTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.35rem;
`;

const PrintSubtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray88};
  margin-bottom: 1.25rem;
`;

const SpecialtyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => theme.colors.grayf5};
  border-radius: 8px;
  margin-bottom: 0.75rem;
`;

const SpecialtyName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const PrintSpecBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 20px;
  padding: 0.45rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.88;
  }
`;

const PrintBackBtn = styled.button`
  width: 100%;
  height: 2.6rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.88;
  }
`;

/* ── Dashboard ───────────────────────────────────────────────────── */
const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.25rem 1.75rem;
`;

const KpiCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 12px;
  padding: 1rem 1.25rem;
`;

const KpiIcon = styled.div<{ $bg: string; $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.2rem;
`;

const KpiInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const KpiLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray88};
`;

const KpiValue = styled.span`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const ChartSection = styled.div`
  margin: 0 1.75rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const ChartTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const ChartLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray88};
`;

const LegendBox = styled.div`
  width: 28px;
  height: 14px;
  border-radius: 3px;
  background: #b8e0c0;
`;

const ExtractBtn = styled.button`
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

/* ── Spinner (Gerando PDF) ───────────────────────────────────────── */
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const SpinnerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
`;

const SpinnerRing = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 5px solid #fce4ec;
  border-top-color: #f284a4;
  animation: ${spin} 0.8s linear infinite;
`;

const SpinnerLabel = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
`;

/* ── Dashboard date filter fields ────────────────────────────────── */
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

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  'Sem assinatura': { bg: '#fff3e0', color: '#e65100' },
  Parcial: { bg: '#e3f2fd', color: '#1565c0' },
  Completo: { bg: '#e8f5e9', color: '#2e7d32' },
};

const AssinadoBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $status }) => BADGE_COLORS[$status]?.bg || '#f5f5f5'};
  color: ${({ $status }) => BADGE_COLORS[$status]?.color || '#666'};
  white-space: nowrap;
`;

const UploadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => theme.colors.grayf5};
  border-radius: 8px;
  margin-bottom: 0.75rem;
`;

const UploadBtn = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 20px;
  padding: 0.45rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.88;
  }
`;

/* ── Detail views ────────────────────────────────────────────────── */
const DetailPage = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  animation: ${fadeIn} 0.22s ease;
`;

const Breadcrumb = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray88};

  span {
    color: ${({ theme }) => theme.colors.gray4c};
  }
`;

const DetailCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.75rem 2rem;
`;

const BackTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
  cursor: pointer;
  width: fit-content;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1rem;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2.5rem;
  margin-top: 1.5rem;
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

const PdfRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
`;

const PdfName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const DownloadBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.7;
  }
`;

const ViewPatientBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.grayf5};
  color: ${({ theme }) => theme.colors.gray4c};
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background 0.15s;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.graydf};
  }
`;

const FullWidthField = styled(InfoField)`
  grid-column: 1 / -1;
`;

/* ── Mock data ───────────────────────────────────────────────────── */
const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const ANOS = ['2023', '2024', '2025', '2026'];

const ESPECIALIDADES = ['Fonoaudiologia', 'Psicologia (ABA)'];

const ASSINADO_VALUES = ['Sem assinatura', 'Parcial', 'Completo'] as const;
type AssinadoStatus = (typeof ASSINADO_VALUES)[number];

const MOCK_ROWS = Array.from({ length: 10 }, (_, i) => ({
  id: `row-${i}`,
  paciente: i % 2 === 0 ? 'Lucas Andrade Silva' : 'Maria Carolina Cardoso',
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
  cpfCnpj: '123.456.789-10',
  data: '19/10/2025',
  plano: 'Unimed',
  sessoes: [
    2,
    3,
    4,
    54,
    12,
    'R$80,00',
    'R$80,00',
    'R$80,00',
    'R$80,00',
    'R$80,00',
  ][i],
  pti: '2-10',
  assinado: ASSINADO_VALUES[i % 3] as AssinadoStatus,
}));

const CHART_DATA = [
  { plano: 'Unimed', receita: 50 },
  { plano: 'Amil', receita: 60 },
  { plano: 'Bradesco Saúde', receita: 40 },
  { plano: 'Hapvida', receita: 80 },
  { plano: 'NotreDame', receita: 50 },
  { plano: 'Porto Saúde', receita: 20 },
  { plano: 'Prevent Senior', receita: 50 },
  { plano: 'Omint', receita: 90 },
];

const EMPRESAS_MOCK = ['Empresa A', 'Empresa B', 'Empresa C'];

const KPI_DATA = [
  {
    label: 'Faturamento bruto',
    value: 'R$120.000,00',
    bg: '#fce4ec',
    color: '#e91e63',
    icon: '💰',
  },
  {
    label: 'Faturamento por planos',
    value: 'R$85.000,00',
    bg: '#e8f5e9',
    color: '#43a047',
    icon: '💳',
  },
  {
    label: 'Faturamento particular',
    value: 'R$85.000,00',
    bg: '#e8f5e9',
    color: '#43a047',
    icon: '💳',
  },
  {
    label: 'Total de consultas',
    value: '20.000',
    bg: '#e3f2fd',
    color: '#1e88e5',
    icon: '📈',
  },
  {
    label: 'Ocupação',
    value: '88%',
    bg: '#f3e5f5',
    color: '#8e24aa',
    icon: '🩺',
  },
  {
    label: 'Ticket médio por sessão',
    value: 'R$92,50',
    bg: '#e0f7fa',
    color: '#00838f',
    icon: '🏷️',
  },
];

type SubTab = 'faturamento' | 'dashboard';
type View = 'list' | 'patient-details' | 'request-details';

/* ── Component ───────────────────────────────────────────────────── */
const FinanceiroPage = () => {
  const [subTab, setSubTab] = useState<SubTab>('faturamento');
  const [page, setPage] = useState(1);
  const [view, setView] = useState<View>('list');
  const [selectedRow, setSelectedRow] = useState(MOCK_ROWS[0]);

  /* filter drawer */
  const [showFilter, setShowFilter] = useState(false);
  const [filterMes, setFilterMes] = useState('');
  const [filterAno, setFilterAno] = useState('');
  const [filterAssinado, setFilterAssinado] = useState('');

  /* dashboard filter */
  const [showDashFilter, setShowDashFilter] = useState(false);
  const [dashDe, setDashDe] = useState('');
  const [dashAte, setDashAte] = useState('');
  const [dashEmpresa, setDashEmpresa] = useState('');

  /* extract PDF */
  const [showGenerating, setShowGenerating] = useState(false);
  const [showExtractSuccess, setShowExtractSuccess] = useState(false);

  /* print / upload */
  const [showPrint, setShowPrint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handlePrint = (especialidade: string) => {
    console.log('Imprimir:', especialidade);
    setShowPrint(false);
    setShowSuccess(true);
  };

  const handleClearFilter = () => {
    setFilterMes('');
    setFilterAno('');
    setFilterAssinado('');
  };

  const handleGenerateExtract = () => {
    setShowGenerating(true);
    setTimeout(() => {
      setShowGenerating(false);
      setShowExtractSuccess(true);
    }, 2000);
  };

  return (
    <>
      {/* ── LIST VIEW ─────────────────────────────────── */}
      {view === 'list' && (
        <Page>
          <Card>
            {/* Header */}
            <CardHeader>
              <Title>Financeiro</Title>
              {subTab === 'faturamento' && (
                <FilterBtn onClick={() => setShowFilter(true)}>
                  <IoFilterOutline size={15} />
                  Filtrar
                </FilterBtn>
              )}
              {subTab === 'dashboard' && (
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <ExtractBtn onClick={handleGenerateExtract}>
                    <IoDocumentTextOutline size={14} />
                    Gerar extrato
                  </ExtractBtn>
                  <FilterBtn onClick={() => setShowDashFilter(true)}>
                    <IoFilterOutline size={15} />
                    Filtrar
                  </FilterBtn>
                </div>
              )}
            </CardHeader>

            {/* Sub-tabs */}
            <TabBar>
              <TabBtn
                $active={subTab === 'faturamento'}
                onClick={() => setSubTab('faturamento')}
              >
                <IoDocumentTextOutline size={15} />
                Faturamento
              </TabBtn>
              <TabBtn
                $active={subTab === 'dashboard'}
                onClick={() => setSubTab('dashboard')}
              >
                <IoBarChartOutline size={15} />
                Dashboard
              </TabBtn>
            </TabBar>

            <CardBody>
              {/* ── FATURAMENTO ─────────────────────────────────── */}
              {subTab === 'faturamento' && (
                <>
                  <TableWrapper>
                    <StyledTable>
                      <Thead>
                        <tr>
                          <Th $sortable>Paciente ↕</Th>
                          <Th>Responsável</Th>
                          <Th>CPF/CNPJ</Th>
                          <Th>Data</Th>
                          <Th>Plano</Th>
                          <Th $sortable>Sessões ↕</Th>
                          <Th>PTI</Th>
                          <Th $sortable>Assinado ↕</Th>
                          <Th style={{ textAlign: 'right' }}>Ações</Th>
                        </tr>
                      </Thead>
                      <Tbody>
                        {MOCK_ROWS.map(row => (
                          <Tr key={row.id}>
                            <Td>{row.paciente}</Td>
                            <Td>{row.responsavel}</Td>
                            <Td>{row.cpfCnpj}</Td>
                            <Td>{row.data}</Td>
                            <Td>{row.plano}</Td>
                            <Td>{row.sessoes}</Td>
                            <Td>{row.pti}</Td>
                            <Td>
                              <AssinadoBadge $status={row.assinado}>
                                {row.assinado}
                              </AssinadoBadge>
                            </Td>
                            <Td>
                              <ActionCell
                                style={{ justifyContent: 'flex-end' }}
                              >
                                <IconBtn
                                  title="Visualizar"
                                  onClick={() => {
                                    setSelectedRow(row);
                                    setView('patient-details');
                                  }}
                                >
                                  <IoEyeOutline />
                                </IconBtn>
                                <IconBtn
                                  title="Imprimir"
                                  onClick={() => setShowPrint(true)}
                                >
                                  <IoPrintOutline />
                                </IconBtn>
                                <IconBtn
                                  title="Importar"
                                  $color="#f284a4"
                                  onClick={() => setShowUpload(true)}
                                >
                                  <IoShareOutline />
                                </IconBtn>
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
                </>
              )}

              {/* ── DASHBOARD ─────────────────────────────────── */}
              {subTab === 'dashboard' && (
                <>
                  <KpiGrid>
                    {KPI_DATA.map(kpi => (
                      <KpiCard key={kpi.label}>
                        <KpiIcon $bg={kpi.bg} $color={kpi.color}>
                          {kpi.icon}
                        </KpiIcon>
                        <KpiInfo>
                          <KpiLabel>{kpi.label}</KpiLabel>
                          <KpiValue>{kpi.value}</KpiValue>
                        </KpiInfo>
                      </KpiCard>
                    ))}
                  </KpiGrid>

                  <ChartSection>
                    <ChartHeader>
                      <ChartTitle>Receitas por plano</ChartTitle>
                      <ChartLegend>
                        <LegendBox />
                        Receitas
                      </ChartLegend>
                    </ChartHeader>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={CHART_DATA}
                        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#f0f0f0"
                        />
                        <XAxis
                          dataKey="plano"
                          tick={{ fontSize: 11, fill: '#999' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: '#999' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          formatter={(v: any) => [`R$${v}.000,00`, 'Receita']}
                          contentStyle={{ borderRadius: 8, fontSize: 12 }}
                        />
                        <Bar
                          dataKey="receita"
                          fill="#b8e0c0"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartSection>
                </>
              )}
            </CardBody>
          </Card>

          {/* ── Filter drawer ─────────────────────────────────── */}
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
                    <DrawerLabel htmlFor="fin-mes">Mês</DrawerLabel>
                    <SelectWrapper>
                      <DrawerSelect
                        id="fin-mes"
                        value={filterMes}
                        onChange={e => setFilterMes(e.target.value)}
                      >
                        <option value="">Selecione ou pesquise</option>
                        {MESES.map(m => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </DrawerSelect>
                      <IoChevronDownOutline />
                    </SelectWrapper>
                  </DrawerField>

                  <DrawerField>
                    <DrawerLabel htmlFor="fin-ano">Ano</DrawerLabel>
                    <SelectWrapper>
                      <DrawerSelect
                        id="fin-ano"
                        value={filterAno}
                        onChange={e => setFilterAno(e.target.value)}
                      >
                        <option value="">Selecione ou pesquise</option>
                        {ANOS.map(a => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </DrawerSelect>
                      <IoChevronDownOutline />
                    </SelectWrapper>
                  </DrawerField>

                  <DrawerField>
                    <DrawerLabel htmlFor="fin-assinado">Assinado</DrawerLabel>
                    <SelectWrapper>
                      <DrawerSelect
                        id="fin-assinado"
                        value={filterAssinado}
                        onChange={e => setFilterAssinado(e.target.value)}
                      >
                        <option value="">Todos</option>
                        {ASSINADO_VALUES.map(v => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </DrawerSelect>
                      <IoChevronDownOutline />
                    </SelectWrapper>
                  </DrawerField>
                </DrawerFields>

                <DrawerFooter>
                  <BtnFull onClick={() => setShowFilter(false)}>
                    Filtrar
                  </BtnFull>
                  <BtnFull $outlined onClick={handleClearFilter}>
                    Limpar
                  </BtnFull>
                </DrawerFooter>
              </Drawer>
            </>
          )}

          {/* ── Print modal ───────────────────────────────────── */}
          {showPrint && (
            <ModalOverlay onClick={() => setShowPrint(false)}>
              <PrintCard onClick={e => e.stopPropagation()}>
                <PrintTitle>Imprimir</PrintTitle>
                <PrintSubtitle>
                  Imprima de acordo com as especialidades:
                </PrintSubtitle>

                {ESPECIALIDADES.map(esp => (
                  <SpecialtyRow key={esp}>
                    <SpecialtyName>{esp}</SpecialtyName>
                    <PrintSpecBtn onClick={() => handlePrint(esp)}>
                      <IoDocumentTextOutline size={14} />
                      Imprimir
                    </PrintSpecBtn>
                  </SpecialtyRow>
                ))}

                <PrintBackBtn onClick={() => setShowPrint(false)}>
                  Voltar
                </PrintBackBtn>
              </PrintCard>
            </ModalOverlay>
          )}

          {/* ── Success modal ─────────────────────────────────── */}
          <ConfirmModal
            isOpen={showSuccess}
            title="Sucesso!"
            message="Solicitação impressa com sucesso!"
            confirmLabel="Voltar"
            confirmVariant="success"
            onConfirm={() => setShowSuccess(false)}
            onCancel={() => setShowSuccess(false)}
          />

          {/* ── Dashboard filter drawer ────────────────────────────── */}
          {showDashFilter && (
            <>
              <DrawerOverlay onClick={() => setShowDashFilter(false)} />
              <Drawer>
                <DrawerHeader>
                  <DrawerTitle>Filtrar/gráficos</DrawerTitle>
                  <CloseBtn onClick={() => setShowDashFilter(false)}>
                    <IoCloseOutline />
                  </CloseBtn>
                </DrawerHeader>
                <DrawerFields>
                  <DrawerField>
                    <DrawerLabel htmlFor="dash-de">De</DrawerLabel>
                    <DateInput
                      id="dash-de"
                      placeholder="dd/mm/aaaa"
                      value={dashDe}
                      onChange={e => setDashDe(e.target.value)}
                    />
                  </DrawerField>
                  <DrawerField>
                    <DrawerLabel htmlFor="dash-ate">Até</DrawerLabel>
                    <DateInput
                      id="dash-ate"
                      placeholder="dd/mm/aaaa"
                      value={dashAte}
                      onChange={e => setDashAte(e.target.value)}
                    />
                  </DrawerField>
                  <DrawerField>
                    <DrawerLabel htmlFor="dash-empresa">Empresa</DrawerLabel>
                    <SelectWrapper>
                      <DrawerSelect
                        id="dash-empresa"
                        value={dashEmpresa}
                        onChange={e => setDashEmpresa(e.target.value)}
                      >
                        <option value="">Selecione ou pesquise</option>
                        {EMPRESAS_MOCK.map(e => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </DrawerSelect>
                      <IoChevronDownOutline />
                    </SelectWrapper>
                  </DrawerField>
                </DrawerFields>
                <DrawerFooter>
                  <BtnFull onClick={() => setShowDashFilter(false)}>
                    Filtrar
                  </BtnFull>
                  <BtnFull
                    $outlined
                    onClick={() => {
                      setDashDe('');
                      setDashAte('');
                      setDashEmpresa('');
                    }}
                  >
                    Limpar
                  </BtnFull>
                </DrawerFooter>
              </Drawer>
            </>
          )}

          {/* ── Generating spinner ────────────────────────────────── */}
          {showGenerating && (
            <SpinnerOverlay>
              <SpinnerCard>
                <SpinnerRing />
                <SpinnerLabel>Gerando PDF...</SpinnerLabel>
              </SpinnerCard>
            </SpinnerOverlay>
          )}

          {/* ── Extract success modal ───────────────────────────── */}
          <ConfirmModal
            isOpen={showExtractSuccess}
            title="Sucesso!"
            message="PDF gerado com sucesso!"
            confirmLabel="Voltar"
            confirmVariant="success"
            onConfirm={() => setShowExtractSuccess(false)}
            onCancel={() => setShowExtractSuccess(false)}
          />

          {/* ── Upload modal (Declaração Atendimento) ─────────── */}
          {showUpload && (
            <ModalOverlay onClick={() => setShowUpload(false)}>
              <PrintCard onClick={e => e.stopPropagation()}>
                <PrintTitle>Declaração Atendimento</PrintTitle>
                <PrintSubtitle>
                  Faça o upload de todos os relatórios de atendimentos assinados
                </PrintSubtitle>

                {ESPECIALIDADES.map(esp => (
                  <UploadRow key={esp}>
                    <SpecialtyName>{esp}</SpecialtyName>
                    <UploadBtn htmlFor={`upload-${esp}`}>
                      <IoCloudDownloadOutline
                        size={14}
                        style={{ transform: 'rotate(180deg)' }}
                      />
                      Upload
                      <input
                        id={`upload-${esp}`}
                        type="file"
                        accept=".pdf,.jpg,.png"
                        style={{ display: 'none' }}
                        onChange={() => {
                          setShowUpload(false);
                          setShowSuccess(true);
                        }}
                      />
                    </UploadBtn>
                  </UploadRow>
                ))}

                <PrintBackBtn onClick={() => setShowUpload(false)}>
                  Voltar
                </PrintBackBtn>
              </PrintCard>
            </ModalOverlay>
          )}
        </Page>
      )}

      {/* ── PATIENT-DETAILS VIEW ──────────────────────── */}
      {view === 'patient-details' && (
        <DetailPage>
          <Breadcrumb>
            Financeiro &rsaquo; Faturamento &rsaquo; <span>Detalhes</span>
          </Breadcrumb>
          <BackTitle onClick={() => setView('list')}>
            <IoArrowBackOutline />
            Detalhes do faturamento – {selectedRow.paciente}
          </BackTitle>
          <DetailCard style={{ padding: '0 0 1.25rem' }}>
            <TableWrapper style={{ padding: '0 1.75rem' }}>
              <StyledTable>
                <Thead>
                  <tr>
                    <Th $sortable>Clínica ⇅</Th>
                    <Th>Profissional</Th>
                    <Th $sortable>Especialidade</Th>
                    <Th $sortable>Data do Agendamento ⇅</Th>
                    <Th $sortable>Presente?</Th>
                    <Th style={{ textAlign: 'right' }}>Ações</Th>
                  </tr>
                </Thead>
                <Tbody>
                  {MOCK_ROWS.map(r => (
                    <Tr key={r.id}>
                      <Td>Unidade 1</Td>
                      <Td>{r.responsavel}</Td>
                      <Td>Fonoaudiologia</Td>
                      <Td>{r.data}</Td>
                      <Td>Sim</Td>
                      <Td>
                        <ActionCell style={{ justifyContent: 'flex-end' }}>
                          <IconBtn
                            title="Ver detalhes"
                            onClick={() => setView('request-details')}
                          >
                            <IoEyeOutline />
                          </IconBtn>
                        </ActionCell>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </StyledTable>
            </TableWrapper>
            <div style={{ padding: '0 1.75rem' }}>
              <Pagination
                currentPage={page}
                totalPages={30}
                totalItems={300}
                itemsPerPage={10}
                onPageChange={setPage}
              />
            </div>
          </DetailCard>
        </DetailPage>
      )}

      {/* ── REQUEST-DETAILS VIEW ─────────────────────── */}
      {view === 'request-details' && (
        <DetailPage>
          <Breadcrumb>
            Financeiro &rsaquo; Faturamento &rsaquo; Detalhes &rsaquo;{' '}
            <span>Detalhes</span>
          </Breadcrumb>
          <BackTitle onClick={() => setView('patient-details')}>
            <IoArrowBackOutline />
            Detalhes da solicitação
          </BackTitle>
          <DetailCard>
            <PdfRow>
              <PdfName>Contrato.pdf</PdfName>
              <DownloadBtn title="Baixar">
                <IoCloudDownloadOutline />
              </DownloadBtn>
            </PdfRow>

            <Link href="/pacientes/1" style={{ textDecoration: 'none' }}>
              <ViewPatientBtn as="span">
                <IoEyeOutline />
                Visualizar todos os dados do paciente
              </ViewPatientBtn>
            </Link>

            <InfoGrid>
              <InfoField>
                <FieldLabel>Nome do paciente</FieldLabel>
                <FieldValue>{selectedRow.paciente}</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>Profissional</FieldLabel>
                <FieldValue>{selectedRow.responsavel}</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>Convênio</FieldLabel>
                <FieldValue>{selectedRow.plano}</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>Data de autorização</FieldLabel>
                <FieldValue>15/04/2026</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>Total de sessões aprovadas por mês</FieldLabel>
                <FieldValue>12 sessões</FieldValue>
              </InfoField>
              <InfoField>
                <FieldLabel>Duração do PTI</FieldLabel>
                <FieldValue>12 meses</FieldValue>
              </InfoField>
              <FullWidthField>
                <FieldLabel>Observações</FieldLabel>
                <FieldValue>Paciente possui muita agitação.</FieldValue>
              </FullWidthField>
            </InfoGrid>
          </DetailCard>
        </DetailPage>
      )}
    </>
  );
};

export default FinanceiroPage;
