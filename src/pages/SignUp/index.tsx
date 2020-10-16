import React from 'react';

import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

import {
  Container,
  BackgroundOne,
  BackgroundTwo,
  Content,
  Logo 
} from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';

const  SignUp: React.FC = () => {
  return (
    <Container>
      <BackgroundOne />
      <BackgroundTwo />

      <Content>
        <Logo>Teacher Help</Logo>

        <form>
          <h2>Faça seu login</h2>
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

          <Button type="submit">Entrar</Button>
        </form>

        <a href="ddd">
          <FiArrowRight />
          Cadastrar
        </a>

      </Content>
    </Container>
  );
}

export default SignUp;
