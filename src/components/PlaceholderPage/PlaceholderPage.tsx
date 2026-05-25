'use client';

import styled from 'styled-components';
import { IoPeopleSharp } from 'react-icons/io5';

const Page = styled.div`
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 60vh;
  color: ${({ theme }) => theme.colors.grayb7};
`;

const Icon = styled.div`
  font-size: 3rem;
`;

const Msg = styled.p`
  font-size: 1.1rem;
`;

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <Page>
      <Icon>
        <IoPeopleSharp />
      </Icon>
      <Msg>{title} — em breve</Msg>
    </Page>
  );
};

export default PlaceholderPage;
