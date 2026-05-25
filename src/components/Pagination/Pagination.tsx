'use client';

import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 0 0;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Info = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray88};
`;

const Pages = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: ${({ $active }) =>
    $active ? '1px solid #F284A4' : '1px solid #ddd'};
  background: ${({ $active }) => ($active ? '#F284A4' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#555')};
  font-size: 0.8125rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    border-color: #f284a4;
    color: #f284a4;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const Ellipsis = styled.span`
  padding: 0 0.25rem;
  color: ${({ theme }) => theme.colors.gray88};
`;

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}: PaginationProps) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems || 0);

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <Wrapper>
      {totalItems !== undefined && (
        <Info>
          Mostrando {start}–{end} de {totalItems}
        </Info>
      )}
      <Pages>
        <PageBtn
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </PageBtn>
        {pages.map((p, i) =>
          p === '...' ? (
            <Ellipsis key={`ellipsis-${i}`}>...</Ellipsis>
          ) : (
            <PageBtn
              key={p}
              $active={p === currentPage}
              onClick={() => onPageChange(p as number)}
            >
              {p}
            </PageBtn>
          ),
        )}
        <PageBtn
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </PageBtn>
      </Pages>
    </Wrapper>
  );
};

export default Pagination;
