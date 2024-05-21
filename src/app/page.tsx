'use client';

import { useState } from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import handleError from '@/utils/handleToast';
import { useAuth } from '@/hooks/useAuth';
import { localStorageKeys } from '@/utils/localStorageKeys';
import { ILoginForm, LoginSchema } from '@/validations/LoginSchema';
import Button from '@/components/Button/Button';
import {
  ErrorMessage,
  FormContainer,
  FullPage,
  InputSection,
  LoginInput,
  LoginLabel,
  LoginTitle,
  LogoImg,
  RegisterText,
  Label,
} from './styles';

const Login = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [show, setShow] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async () => {
    try {
      setIsSubmitting(true);

      setUser({ id: 1, username: 'Apostador', email: 'apostador@gmail.com' });

      localStorage.setItem(localStorageKeys.accessToken, '123');
      localStorage.setItem(
        localStorageKeys.user,
        JSON.stringify({
          id: 1,
          username: 'Apostador',
          email: 'apostador@gmail.com',
        }),
      );
      localStorage.setItem(localStorageKeys.refreshToken, '123');

      router.push('/users');
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FullPage>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <LogoImg src="/img/logo.svg" alt="Logomarca Manual Predial" />

        <LoginTitle>Área do administrador</LoginTitle>

        <InputSection>
          <LoginLabel>E-mail</LoginLabel>
          <LoginInput placeholder="Insira seu e-mail" {...register('email')} />
          {errors?.email?.message && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </InputSection>

        <InputSection>
          <LoginLabel>Senha</LoginLabel>
          <LoginInput
            placeholder="Insira sua senha"
            type={show ? 'text' : 'password'}
            {...register('password')}
          />
          {show ? (
            <VscEye className="icon" size={22} onClick={() => setShow(false)} />
          ) : (
            <VscEyeClosed
              className="icon"
              size={22}
              onClick={() => setShow(true)}
            />
          )}
          {errors?.password?.message && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputSection>

        <RegisterText style={{ margin: '-0.6rem 0 1rem 0' }}>
          <input
            type="checkbox"
            id="check"
            name="check"
            checked={checked}
            onClick={() => setIsChecked(!checked)}
          />
          <Label htmlFor="check">Lembrar-me</Label>
        </RegisterText>

        <Button
          type="submit"
          text="Entrar"
          disabled={isSubmitting}
          style={{
            width: '280px',
            maxWidth: '100%',
            height: '40px',
            marginBottom: '2rem',
          }}
        />
      </FormContainer>
    </FullPage>
  );
};

export default Login;
