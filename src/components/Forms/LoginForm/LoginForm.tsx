import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm, LoginSchema } from '@/validations/LoginSchema';
import { localStorageKeys } from '@/utils/localStorageKeys';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import handleError from '@/utils/handleToast';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
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
  Span,
  RegisterText,
  CheckboxLabel,
  Field,
} from './styles';

interface LoginProps {
  recovery: () => void;
  create: () => void;
}

const LoginForm = ({ recovery, create }: LoginProps) => {
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

      router.push('/home');
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

        <Field>
          <Label>Senha</Label>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Digite a senha"
            {...register('password')}
          />
          {show ? (
            <IoEyeOutline
              className="icon"
              size={22}
              color="black"
              onClick={() => setShow(false)}
            />
          ) : (
            <IoEyeOffOutline
              className="icon"
              size={22}
              color="black"
              onClick={() => setShow(true)}
            />
          )}
          {errors?.password?.message && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </Field>

        <RegisterText>
          <input
            type="checkbox"
            id="check"
            name="check"
            checked={checked}
            onClick={() => setIsChecked(!checked)}
          />
          <CheckboxLabel>Lembrar-me</CheckboxLabel>
        </RegisterText>
        <Button type="submit" disabled={isSubmitting}>
          ENTRAR
        </Button>
        <LinkText>
          <Span onClick={recovery}>Esqueceu sua senha?</Span>
        </LinkText>
        <LinkText>
          Não tem uma conta ainda?{' '}
          <Span onClick={create}>Cadastre-se agora.</Span>
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
