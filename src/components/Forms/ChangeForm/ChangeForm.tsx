import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IChangeForm, ChangeySchema } from '@/validations/LoginSchema';
import { useState } from 'react';
import handleError, { handleSuccess } from '@/utils/handleToast';
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
  BackText,
  Field,
} from './styles';

interface RecoveryProps {
  back: () => void;
}

const ChangeForm = ({ back }: RecoveryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangeForm>({
    resolver: yupResolver(ChangeySchema),
  });

  const onSubmit: SubmitHandler<IChangeForm> = async () => {
    try {
      setIsSubmitting(true);
      handleSuccess('Senha alterada com sucesso.');
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
        <Image src="/img/logo2.svg" alt="logo" />
        <Title>Alterar senha</Title>
        <SubTitle>Crie uma nova senha para sua conta.</SubTitle>

        <Field>
          <Label>Nova senha</Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua nova senha"
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
          <Label>Confirme a nova senha</Label>
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

        <Button type="submit" disabled={isSubmitting}>
          ALTERAR
        </Button>
        <BackText onClick={back}>Voltar</BackText>
      </FormContainer>
    </Container>
  );
};

export default ChangeForm;
