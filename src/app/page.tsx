'use client';

import LoginForm from '@/components/Forms/LoginForm/LoginForm';
import RecoveryForm from '@/components/Forms/RecoveryForm/RecoveryForm';
import { useState } from 'react';
import RegisterForm from '@/components/Forms/RegisterForm/RegisterForm';
import { Main } from './styles';

const Login = () => {
  const [steps, setSteps] = useState<'login' | 'Register' | 'Recovery'>(
    'login',
  );

  return (
    <Main>
      {steps === 'login' && (
        <LoginForm
          create={() => setSteps('Register')}
          recovery={() => setSteps('Recovery')}
        />
      )}
      {steps === 'Recovery' && <RecoveryForm back={() => setSteps('login')} />}
      {steps === 'Register' && <RegisterForm back={() => setSteps('login')} />}
    </Main>
  );
};

export default Login;
