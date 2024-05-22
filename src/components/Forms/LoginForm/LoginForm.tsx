import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm, LoginSchema } from '@/validations/LoginSchema';
import { localStorageKeys } from '@/utils/localStorageKeys';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import handleError from '@/utils/handleToast';
import {
  Button,
  Container,
  FormContainer,
  ImageContainer,
  Input,
  LogoImg,
  Image,
  OverlayText,
  SubTitle,
  Title,
  LinkText,
  Label,
  ErrorMessage,
} from './styles';

interface LoginProps {
  recovery: () => void;
}

const LoginForm = ({ recovery }: LoginProps) => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Image alt="" src="/img/logo2.svg" />
        <Title>Seja bem vindo ao WiseTip</Title>
        <SubTitle>Entre na sua conta para acessar as estatísticas.</SubTitle>
        <Label>E-mail</Label>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          {...register('email')}
        />
        {errors?.email?.message && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        <Label>Senha</Label>
        <Input
          type="password"
          placeholder="Digite a senha"
          {...register('password')}
        />
        {errors?.password?.message && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Button type="submit" disabled={isSubmitting}>
          ENTRAR
        </Button>
        <LinkText onClick={recovery}>
          <span>Esqueceu sua senha?</span>
        </LinkText>
        <LinkText>
          Não tem uma conta ainda? <span>Cadastre-se agora.</span>
        </LinkText>
      </FormContainer>

      <ImageContainer>
        <LogoImg alt="" src="/img/logo3.svg" />
        <OverlayText>A PLATAFORMA DE STATS FEITA PARA VOCÊ</OverlayText>
      </ImageContainer>
    </Container>
  );
};

export default LoginForm;
