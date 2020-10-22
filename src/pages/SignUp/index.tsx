import React, { useCallback, useRef } from 'react';
import {FiArrowLeft, FiMail, FiLock, FiUser, FiUserCheck } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import getValidationsErrors from '../../utils/getValidationsErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Content,
  Background,
  Logo,
  AnimationContent
} from './style';

interface SignUpFormData {
  name: string;
  email: string;
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef      = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history      = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required.'),
        email: Yup.string().required('E-mail is required').email(),
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(6, 'At least 6 digits'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/teacher', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado !',
        description: 'Você já pode fazer seu login'
      });

    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao realizar o cadastro, tente novamente.'
      });

    }
  }, [addToast, history]);

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContent>
          <Logo>Teacher Help</Logo>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
            <Input name="username" icon={FiUserCheck} type="text" placeholder="Nome de usuário" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" isPass/>

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft/>
            Voltar para login
          </Link>
        </AnimationContent>
      </Content>
    </Container>
  );
};

export default SignUp;
