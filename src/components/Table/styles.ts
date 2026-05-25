import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
`;

export const Thead = styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.graydf};
`;

export const Th = styled.th<{ $sortable?: boolean }>`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.8125rem;
  color: ${({ $sortable, theme }) =>
    $sortable ? theme.colors.primary : theme.colors.gray88};
  white-space: nowrap;
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  user-select: none;

  &:hover {
    color: ${({ $sortable, theme }) =>
      $sortable ? theme.colors.primaryDark : theme.colors.gray88};
  }
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.graydf};
  transition: background 0.1s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.grayf6};
  }
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.gray4c};
  vertical-align: middle;
  font-size: 0.8125rem;
`;

export const ActionCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
