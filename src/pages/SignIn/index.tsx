import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import {
  Container,
  Background,
  Content,
  Logo 
} from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationsErrors from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { signIn }   = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail is required').email(),
        password: Yup.string().required('Password is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Erro de autenticação',
        description: 'Ocorreu um erro ao realizar o login, cheque as credenciais.'
      });

    }
  }, [signIn, addToast]);

  return (
    <Container>
      <Background />

      <Content>
        <Logo>Teacher Help</Logo>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Faça seu login</h2>
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

          <Button type="submit">Entrar</Button>
        </Form>

        <a href="ddd">
          <FiArrowRight />
          Cadastrar
        </a>

      </Content>
    </Container>
  );
}

export default SignIn;
