import styled from 'styled-components';

export const MasterLayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.grayf5};
`;

export const MasterLayoutContent = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;

  display: flex;
  flex-direction: column;
`;
