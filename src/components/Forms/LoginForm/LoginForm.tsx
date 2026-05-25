import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ILoginForm, LoginSchema } from '@/validations/LoginSchema';
import { localStorageKeys } from '@/utils/localStorageKeys';
import { useAuth } from '@/hooks/useAuth';
import handleError from '@/utils/handleToast';

import {
  Button,
  Container,
  FormContainer,
  Input,
  SubTitle,
  Title,
  Label,
  ErrorMessage,
  RegisterText,
  CheckboxLabel,
  Field,
  LogoWrapper,
  BottomRow,
  ForgotLink,
} from './styles';

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setIsChecked] = useState(false);
  const [show, setShow] = useState<boolean>(false);

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

      setUser({ id: 1, username: 'User Test', email: 'user@gmail.com' });

      localStorage.setItem(localStorageKeys.accessToken, '123');
      localStorage.setItem(
        localStorageKeys.user,
        JSON.stringify({
          id: 1,
          username: 'User Test',
          email: 'user@gmail.com',
        }),
      );
      localStorage.setItem(localStorageKeys.refreshToken, '123');

      router.push('/home');
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <LogoWrapper>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/heart-logo.svg" alt="Estímulos" />
      </LogoWrapper>

      <Title>Área de acesso</Title>
      <SubTitle>Insira seus dados para continuar</SubTitle>

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Label>E-mail</Label>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          {...register('email')}
        />
        {errors?.email?.message && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}

        <Field>
          <Label>Senha</Label>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Digite sua senha"
            {...register('password')}
          />
          {show ? (
            <IoEyeOutline
              className="icon"
              size={20}
              onClick={() => setShow(false)}
            />
          ) : (
            <IoEyeOffOutline
              className="icon"
              size={20}
              onClick={() => setShow(true)}
            />
          )}
          {errors?.password?.message && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </Field>

        <BottomRow>
          <RegisterText>
            <input
              type="checkbox"
              id="check"
              name="check"
              checked={checked}
              onClick={() => setIsChecked(!checked)}
            />
            <CheckboxLabel htmlFor="check">Manter conectado</CheckboxLabel>
          </RegisterText>
          <ForgotLink href="#">Esqueceu a senha?</ForgotLink>
        </BottomRow>

        <Button type="submit" disabled={isSubmitting}>
          Entrar
        </Button>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
