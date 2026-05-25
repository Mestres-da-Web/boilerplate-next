'use client';

import LoginForm from '@/components/Forms/LoginForm/LoginForm';

import { Main, LeftPanel, RightPanel } from './styles';

const Login = () => {
  return (
    <Main>
      <LeftPanel>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-grupo-estimulos.png" alt="Grupo Estímulos" />
      </LeftPanel>
      <RightPanel>
        <LoginForm />
      </RightPanel>
    </Main>
  );
};

export default Login;
