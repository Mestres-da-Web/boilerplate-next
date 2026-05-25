'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  IoCaretBack,
  IoSaveOutline,
  IoCloudUploadOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import styled from 'styled-components';

/* ── Layout ───────────────────────────────────────────────────────── */
const Page = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: calc(100vh - 80px);
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.75rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Breadcrumb = styled.p`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.grayb7};
  margin-bottom: 1rem;
  letter-spacing: 0.02em;

  span {
    color: ${({ theme }) => theme.colors.gray4c};
    font-weight: 500;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const BackBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  padding: 4px;
  border-radius: 6px;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.7;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
`;

/* ── Section titles ───────────────────────────────────────────────── */
const SectionLink = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  display: block;
`;

/* ── Sections ─────────────────────────────────────────────────────── */
const Section = styled.fieldset`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.25rem;
`;

const Legend = styled.legend`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray4c};
  padding: 0 0.5rem;
`;

/* ── Grid ─────────────────────────────────────────────────────────── */
const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Row3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr;
  gap: 1rem 1.5rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const FullRow = styled.div`
  margin-top: 1rem;
`;

/* ── Photo area ───────────────────────────────────────────────────── */
const InfoPessoalGrid = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 1rem 1.5rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const PhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const PhotoPlaceholder = styled.div`
  width: 140px;
  height: 140px;
  border: 2px dashed ${({ theme }) => theme.colors.graydf};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grayb7};
  font-size: 3rem;
  background: ${({ theme }) => theme.colors.grayf6};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const SelectImageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 6px;
  overflow: hidden;
  width: fit-content;
`;

const SelectImageText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray88};
  padding: 0.35rem 0.75rem;
`;

const SelectImageBtn = styled.button`
  border: none;
  border-left: 1px solid ${({ theme }) => theme.colors.graydf};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 1rem;
  width: 36px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
  }
`;

const PhotoLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray88};
`;

const PhotoFieldsCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/* ── Form elements ────────────────────────────────────────────────── */
const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  width: 100%;
  transition: border 0.15s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayb7};
  }
`;

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  width: 100%;
  background: #fff;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  outline: none;
  width: 100%;
  min-height: 80px;
  resize: vertical;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayb7};
  }
`;

const CharCount = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.grayb7};
  text-align: right;
  margin-top: 0.15rem;
`;

const CidTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-top: 0.25rem;
  width: fit-content;
  cursor: pointer;
`;

/* ── Radio ────────────────────────────────────────────────────────── */
const RadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray4c};
  cursor: pointer;
  input {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const QuestionLabel = styled.p`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
  margin-top: 1rem;
`;

/* ── Familiar list ────────────────────────────────────────────────── */
const FamiliarSection = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FamiliarItemRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 40px;
  gap: 1rem;
  align-items: end;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const DeleteFamiliarBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.7;
  }
`;

/* ── Footer ───────────────────────────────────────────────────────── */
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.graydf};
`;

const Required = styled.span`
  font-size: 0.75rem;
  color: #f284a4;
`;

const FooterBtns = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const BtnCancel = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.graydf};
  background: #fff;
  border-radius: 8px;
  padding: 0.55rem 1.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray4c};
  cursor: pointer;
  transition: border-color 0.15s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const BtnSave = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 0.55rem 1.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.88;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.error};
`;

/* ── Mock Data ────────────────────────────────────────────────────── */
const MOCK = {
  nome: 'Lucas Andrade Silva',
  foto: 'https://randomuser.me/api/portraits/children/1.jpg',
  rg: '12.456.789-10',
  dataNascimento: '2018-12-12',
  idade: '5 anos, 3 meses e 0 dias',
  cep: '12345-678',
  estado: 'São Paulo - SP',
  cidade: 'São Paulo',
  bairro: 'Vila Madalena',
  logradouro: 'Rua das Flores',
  numero: '100',
  complemento: '-',
  localAtendimento: 'Clínica Matriz',
  planoSaude: 'Unimed',
  numeroCarteirinha: '898 0011 2233',
  cid: 'F084.0',
  empresaFaturamento: 'Exata Assessoria Contábil',
  observacoes: 'Conversão de terapias',
  familiares: [
    { id: 'f1', nome: 'Familiar 1', parentesco: 'Pai' },
    { id: 'f2', nome: 'Familiar 2', parentesco: 'Mãe' },
  ],
};

/* ── Component ────────────────────────────────────────────────────── */
interface PacienteForm {
  nome: string;
  rg: string;
  dataNascimento: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  localAtendimento: string;
  planoSaude: string;
  numeroCarteirinha: string;
  cid: string;
  empresaFaturamento: string;
  observacoes: string;
}

const PacienteDetalhesPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [obsLength, setObsLength] = useState(MOCK.observacoes.length);
  const [vincularFamiliar, setVincularFamiliar] = useState('sim');
  const [familiares, setFamiliares] = useState(MOCK.familiares);

  const MOCK_FAMILIARES = [
    'Familiar 1',
    'Familiar 2',
    'Familiar 3',
    'Familiar 4',
  ];

  const handleAddFamiliar = (nome: string) => {
    if (!nome || familiares.find(f => f.nome === nome)) return;
    setFamiliares(prev => [
      ...prev,
      { id: `f-${Date.now()}`, nome, parentesco: '' },
    ]);
  };

  const handleRemoveFamiliar = (fid: string) => {
    setFamiliares(prev => prev.filter(f => f.id !== fid));
  };

  const handleParentescoChange = (fid: string, parentesco: string) => {
    setFamiliares(prev =>
      prev.map(f => (f.id === fid ? { ...f, parentesco } : f)),
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PacienteForm>({
    defaultValues: {
      nome: MOCK.nome,
      rg: MOCK.rg,
      dataNascimento: MOCK.dataNascimento,
      cep: MOCK.cep,
      estado: MOCK.estado,
      cidade: MOCK.cidade,
      bairro: MOCK.bairro,
      logradouro: MOCK.logradouro,
      numero: MOCK.numero,
      complemento: MOCK.complemento,
      localAtendimento: MOCK.localAtendimento,
      planoSaude: MOCK.planoSaude,
      numeroCarteirinha: MOCK.numeroCarteirinha,
      cid: MOCK.cid,
      empresaFaturamento: MOCK.empresaFaturamento,
      observacoes: MOCK.observacoes,
    },
  });

  const onSubmit = async (data: PacienteForm) => {
    try {
      setIsSubmitting(true);
      console.log('Salvar paciente:', { ...data, familiares });
      router.push('/pacientes');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Card>
        <Breadcrumb>
          Pacientes &nbsp;›&nbsp; Detalhes &nbsp;›&nbsp; Detalhes pessoais
          &nbsp;›&nbsp; <span>Editar</span>
        </Breadcrumb>

        <TitleRow>
          <BackBtn type="button" onClick={() => router.back()} title="Voltar">
            <IoCaretBack />
          </BackBtn>
          <PageTitle>Editar detalhes pessoais - {MOCK.nome}</PageTitle>
        </TitleRow>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ── Informações pessoais ─────────────────────────── */}
          <SectionLink>Informações pessoais</SectionLink>
          <Section>
            <Legend>Informações pessoais</Legend>

            <InfoPessoalGrid>
              <PhotoBox>
                <PhotoLabel>Foto (Opcional)</PhotoLabel>
                <PhotoPlaceholder>
                  <img src={MOCK.foto} alt={MOCK.nome} />
                </PhotoPlaceholder>
                <SelectImageRow>
                  <SelectImageText>Selecionar imagem</SelectImageText>
                  <SelectImageBtn type="button">
                    <IoCloudUploadOutline />
                  </SelectImageBtn>
                </SelectImageRow>
              </PhotoBox>

              <PhotoFieldsCol>
                <FieldGroup>
                  <Label>Nome do paciente *</Label>
                  <Input {...register('nome', { required: 'Obrigatório' })} />
                  {errors.nome && <ErrorMsg>{errors.nome.message}</ErrorMsg>}
                </FieldGroup>

                <FieldGroup>
                  <Label>RG (Opcional)</Label>
                  <Input {...register('rg')} />
                </FieldGroup>

                <Row3>
                  <FieldGroup>
                    <Label>Data de nascimento *</Label>
                    <Input
                      type="date"
                      {...register('dataNascimento', {
                        required: 'Obrigatório',
                      })}
                    />
                    {errors.dataNascimento && (
                      <ErrorMsg>{errors.dataNascimento.message}</ErrorMsg>
                    )}
                  </FieldGroup>
                  <div />
                  <FieldGroup>
                    <Label>Idade</Label>
                    <Input disabled value={MOCK.idade} />
                  </FieldGroup>
                </Row3>
              </PhotoFieldsCol>
            </InfoPessoalGrid>

            <QuestionLabel>Vincular a um familiar cadastrado?</QuestionLabel>
            <RadioRow>
              <RadioLabel>
                <input
                  type="radio"
                  value="sim"
                  checked={vincularFamiliar === 'sim'}
                  onChange={() => setVincularFamiliar('sim')}
                />{' '}
                Sim
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  value="nao"
                  checked={vincularFamiliar === 'nao'}
                  onChange={() => setVincularFamiliar('nao')}
                />{' '}
                Não
              </RadioLabel>
            </RadioRow>

            {vincularFamiliar === 'sim' && (
              <FamiliarSection>
                <FieldGroup>
                  <Label>Familiar</Label>
                  <Select
                    defaultValue=""
                    onChange={e => {
                      handleAddFamiliar(e.target.value);
                      e.target.value = '';
                    }}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {MOCK_FAMILIARES.filter(
                      f => !familiares.find(fam => fam.nome === f),
                    ).map(f => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </Select>
                </FieldGroup>

                {familiares.map(f => (
                  <FamiliarItemRow key={f.id}>
                    <FieldGroup>
                      <Input value={f.nome} readOnly />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Parentesco *</Label>
                      <Select
                        value={f.parentesco}
                        onChange={e =>
                          handleParentescoChange(f.id, e.target.value)
                        }
                      >
                        <option value="">Selecione</option>
                        <option value="Pai">Pai</option>
                        <option value="Mãe">Mãe</option>
                        <option value="Irmão/Irmã">Irmão/Irmã</option>
                        <option value="Avô/Avó">Avô/Avó</option>
                        <option value="Tio/Tia">Tio/Tia</option>
                        <option value="Primo/Prima">Primo/Prima</option>
                        <option value="Outro">Outro</option>
                      </Select>
                    </FieldGroup>
                    <DeleteFamiliarBtn
                      type="button"
                      onClick={() => handleRemoveFamiliar(f.id)}
                      title="Remover familiar"
                    >
                      <IoTrashOutline />
                    </DeleteFamiliarBtn>
                  </FamiliarItemRow>
                ))}
              </FamiliarSection>
            )}
          </Section>

          {/* ── Endereço ─────────────────────────────────────── */}
          <Section>
            <Legend>Endereço</Legend>

            <Row2>
              <FieldGroup>
                <Label>CEP *</Label>
                <Input {...register('cep')} />
              </FieldGroup>
              <FieldGroup>
                <Label>Estado *</Label>
                <Input {...register('estado')} />
              </FieldGroup>
            </Row2>

            <Row2 style={{ marginTop: '1rem' }}>
              <FieldGroup>
                <Label>Cidade *</Label>
                <Input {...register('cidade')} />
              </FieldGroup>
              <FieldGroup>
                <Label>Bairro *</Label>
                <Input {...register('bairro')} />
              </FieldGroup>
            </Row2>

            <Row2 style={{ marginTop: '1rem' }}>
              <FieldGroup>
                <Label>Logradouro *</Label>
                <Input {...register('logradouro')} />
              </FieldGroup>
              <FieldGroup>
                <Label>Número *</Label>
                <Input {...register('numero')} />
              </FieldGroup>
            </Row2>

            <FullRow>
              <FieldGroup>
                <Label>Complemento (Opcional)</Label>
                <Input {...register('complemento')} />
              </FieldGroup>
            </FullRow>
          </Section>

          {/* ── Dados clínicos ───────────────────────────────── */}
          <Section>
            <Legend>Dados clínicos</Legend>

            <Row2>
              <FieldGroup>
                <Label>Local de Atendimento *</Label>
                <Input {...register('localAtendimento')} />
              </FieldGroup>
              <FieldGroup>
                <Label>Plano de saúde *</Label>
                <Select {...register('planoSaude')}>
                  <option value="">Selecione ou pesquise</option>
                  <option value="Unimed">Unimed</option>
                  <option value="Hapvida">Hapvida</option>
                  <option value="Amil">Amil</option>
                </Select>
              </FieldGroup>
            </Row2>

            <Row2 style={{ marginTop: '1rem' }}>
              <FieldGroup>
                <Label>Número da carteirinha *</Label>
                <Input {...register('numeroCarteirinha')} />
              </FieldGroup>
              <FieldGroup>
                <Label>CID *</Label>
                <Select {...register('cid')}>
                  <option value="">Selecione ou pesquise</option>
                  <option value="F084.0">F084.0</option>
                </Select>
                <CidTag>F084.0 ✕</CidTag>
              </FieldGroup>
            </Row2>

            <FullRow>
              <FieldGroup>
                <Label>Empresa de faturamento *</Label>
                <Select {...register('empresaFaturamento')}>
                  <option value="">Selecione ou pesquise</option>
                  <option value="Exata Assessoria Contábil">
                    Exata Assessoria Contábil
                  </option>
                </Select>
              </FieldGroup>
            </FullRow>

            <FullRow>
              <FieldGroup>
                <Label>Observações</Label>
                <TextArea
                  maxLength={500}
                  {...register('observacoes', {
                    onChange: e => setObsLength(e.target.value.length),
                  })}
                />
                <CharCount>{obsLength}/500</CharCount>
              </FieldGroup>
            </FullRow>
          </Section>

          {/* ── Footer ───────────────────────────────────────── */}
          <Footer>
            <Required>*Campos obrigatórios</Required>
            <FooterBtns>
              <BtnCancel type="button" onClick={() => router.back()}>
                Cancelar
              </BtnCancel>
              <BtnSave type="submit" disabled={isSubmitting}>
                <IoSaveOutline /> Salvar
              </BtnSave>
            </FooterBtns>
          </Footer>
        </form>
      </Card>
    </Page>
  );
};

export default PacienteDetalhesPage;
