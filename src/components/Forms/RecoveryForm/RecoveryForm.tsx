import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRecoveryForm, RecoverySchema } from '@/validations/LoginSchema';
import { useState } from 'react';
import handleError, { handleSuccess } from '@/utils/handleToast';
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
} from './styles';

interface RecoveryProps {
  back: () => void;
}

const RecoveryForm = ({ back }: RecoveryProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecoveryForm>({
    resolver: yupResolver(RecoverySchema),
  });

  const onSubmit: SubmitHandler<IRecoveryForm> = async () => {
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
        <Title>Recupere sua senha</Title>
        <SubTitle>Digite o e-mail da sua conta.</SubTitle>
        <Label>E-mail</Label>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          {...register('email')}
        />
        {errors?.email?.message && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        <Button type="submit" disabled={isSubmitting}>
          RECUPERAR
        </Button>
        <BackText onClick={back}>Voltar</BackText>
      </FormContainer>
    </Container>
  );
};

export default RecoveryForm;
