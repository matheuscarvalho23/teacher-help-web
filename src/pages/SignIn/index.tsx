import React, { useCallback, useRef } from 'react';
import {FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationsErrors from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Link, useHistory } from 'react-router-dom';

import {
  Container,
  Content,
  Background,
  Logo,
  AnimationContainer,
} from './style';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn }   = useAuth();
  const { addToast } = useToast();
  const history      = useHistory();

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

      history.push('/dashboard');
    } catch (err) {

      console.log(err)

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
  }, [signIn, addToast, history]);

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <Logo>Teacher Help</Logo>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" isPass/>

            <Button type="submit">Entrar</Button>
            <a href="ddd">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn/>
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
