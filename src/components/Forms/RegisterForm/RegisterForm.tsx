import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import handleError, { handleSuccess } from '@/utils/handleToast';
import { IRegisterForm, RegisterSchema } from '@/validations/RegisterSchema';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
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
  FieldRow,
  Field,
  Form,
  TermsText,
} from './styles';

interface RegisterProps {
  back: () => void;
}

const RegisterForm = ({ back }: RegisterProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

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

      handleSuccess('Cadastro realizado com sucesso.');
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
        <Form>
          <Image alt="logo" src="/img/logo2.svg" />
          <Title>Cria sua conta</Title>
          <SubTitle>Complete o formulário para começar.</SubTitle>

          <Field>
            <Label>Nome</Label>
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              {...register('name')}
            />
            {errors?.name?.message && (
              <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>E-mail</Label>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              {...register('email')}
            />
            {errors?.email?.message && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Telefone</Label>
            <Input
              type="text"
              placeholder="Digite seu telefone"
              {...register('phone')}
            />
            {errors?.phone?.message && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </Field>

          <FieldRow>
            <Field>
              <Label style={{ width: '220px' }}>Data de nascimento</Label>
              <Input
                type="date"
                style={{ width: '220px' }}
                {...register('date')}
              />
              {errors?.date?.message && (
                <ErrorMessage>{errors.date.message}</ErrorMessage>
              )}
            </Field>

            <Field>
              <Label style={{ width: '220px' }}>Sexo</Label>
              <Input
                type="text"
                style={{ width: '220px' }}
                placeholder="Digite seu sexo"
                {...register('gender')}
              />
              {errors?.gender?.message && (
                <ErrorMessage>{errors.gender.message}</ErrorMessage>
              )}
            </Field>
          </FieldRow>

          <Field>
            <Label>Profissão</Label>
            <Input
              type="text"
              placeholder="Digite sua profissão"
              {...register('profission')}
            />
            {errors?.profission?.message && (
              <ErrorMessage>{errors.profission.message}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Senha</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              {...register('password')}
            />
            {showPassword ? (
              <IoEyeOutline
                className="icon"
                size={22}
                color="black"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoEyeOffOutline
                className="icon"
                size={22}
                color="black"
                onClick={() => setShowPassword(true)}
              />
            )}
            {errors?.password?.message && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Confirme a senha</Label>
            <Input
              type={showPassConfirm ? 'text' : 'password'}
              placeholder="Digite a novamente a senha"
              {...register('confirmPassword')}
            />
            {showPassConfirm ? (
              <IoEyeOutline
                className="icon"
                size={22}
                color="black"
                onClick={() => setShowPassConfirm(false)}
              />
            ) : (
              <IoEyeOffOutline
                className="icon"
                size={22}
                color="black"
                onClick={() => setShowPassConfirm(true)}
              />
            )}
            {errors?.confirmPassword?.message && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </Field>

          <FieldRow style={{ margin: '2rem 0' }}>
            <LinkText>
              Já tem uma conta? <Span onClick={back}>Entrar.</Span>
            </LinkText>

            <Button type="submit" disabled={isSubmitting}>
              CADASTRAR
            </Button>
          </FieldRow>

          <TermsText>
            Ao clicar em `Cadastrar` você concorda com nossos{' '}
            <Span>termos e condições.</Span>
          </TermsText>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default RegisterForm;
