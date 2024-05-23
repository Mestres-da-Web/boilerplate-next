'use client';

import LoginForm from '@/components/Forms/LoginForm/LoginForm';
import RecoveryForm from '@/components/Forms/RecoveryForm/RecoveryForm';
import { useState } from 'react';
import RegisterForm from '@/components/Forms/RegisterForm/RegisterForm';
import ChangeForm from '@/components/Forms/ChangeForm/ChangeForm';
import { Main } from './styles';

const Login = () => {
  const [steps, setSteps] = useState<
    'Login' | 'Register' | 'Recovery' | 'Change'
  >('Login');

  return (
    <Main>
      {steps === 'Login' && (
        <LoginForm
          create={() => setSteps('Register')}
          recovery={() => setSteps('Recovery')}
        />
      )}
      {steps === 'Recovery' && (
        <RecoveryForm
          change={() => setSteps('Change')}
          back={() => setSteps('Login')}
        />
      )}
      {steps === 'Register' && <RegisterForm back={() => setSteps('Login')} />}
      {steps === 'Change' && <ChangeForm back={() => setSteps('Login')} />}
    </Main>
  );
};

export default Login;
