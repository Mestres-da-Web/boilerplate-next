import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import handleError, { handleSuccess } from '@/utils/handleToast';
import { IRegisterForm, RegisterSchema } from '@/validations/RegisterSchema';
import {
  Container,
  FormContainer,
  Image,
  Title,
  SubTitle,
  Label,
  Input,
  ErrorMessage,
  Button,
  LinkText,
  Span,
} from './styles';

interface RegisterProps {
  back: () => void;
}

const RegisterForm = ({ back }: RegisterProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async () => {
    try {
      setIsSubmitting(true);

      handleSuccess('Nova senha enviada por e-mail.');
      back();
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Image alt="logo" src="/img/logo2.svg" />
        <Title>Cria sua conta</Title>
        <SubTitle>Complete o formulário para começar.</SubTitle>
        <Label>Nome</Label>
        <Input
          type="text"
          placeholder="Digite seu nome completo"
          {...register('name')}
        />
        {errors?.name?.message && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
        <Label>E-mail</Label>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          {...register('email')}
        />
        {errors?.email?.message && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        <Label>E-mail</Label>
        <Input
          type="password"
          placeholder="Digite a senha"
          {...register('password')}
        />
        {errors?.password?.message && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Label>Confimação de senha</Label>
        <Input
          type="password"
          placeholder="Confirme sua senha"
          {...register('confirmPassword')}
        />
        {errors?.confirmPassword?.message && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
        <Button type="submit" disabled={isSubmitting}>
          CADASTRAR
        </Button>
        <LinkText>
          Já tem uma conta? <Span onClick={back}>Entrar.</Span>
        </LinkText>
      </FormContainer>
    </Container>
  );
};

export default RegisterForm;
