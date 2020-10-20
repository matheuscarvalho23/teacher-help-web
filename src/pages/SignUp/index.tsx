import React, { useCallback, useRef } from 'react';
import {FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationsErrors from '../../utils/getValidationsErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, Logo } from './style';
// import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required.'),
        email: Yup.string().required('E-mail is required').email(),
        password: Yup.string().min(6, 'At least 6 digits'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

    } catch (err) {

      const errors = getValidationsErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <Logo>Teacher Help</Logo>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" isPass={false} />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" isPass={false} />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" isPass/>

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="ddd">
          <FiArrowLeft/>
          Voltar para login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
