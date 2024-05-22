'use client';

import LoginForm from '@/components/Forms/LoginForm/LoginForm';
import RecoveryForm from '@/components/Forms/RecoveryForm/RecoveryForm';
import { useState } from 'react';
import { Main } from './styles';

const Login = () => {
  const [steps, setSteps] = useState<'login' | 'Register' | 'Recovery'>(
    'login',
  );

  return (
    <Main>
      {steps === 'login' && <LoginForm recovery={() => setSteps('Recovery')} />}
      {steps === 'Recovery' && <RecoveryForm back={() => setSteps('login')} />}
    </Main>
  );
};

export default Login;
