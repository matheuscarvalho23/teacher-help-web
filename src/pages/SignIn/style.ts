import styled from 'styled-components';
import { shade } from 'polished';

import register from '../../assets/register.svg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Logo = styled.div`
  font-size: 50px;
  color: var(--tertiary);
  font-family: "Courgette", serif;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;

  background: var(--primary);

  border-left: solid 4px var(--secondary);

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
  
    h2 {
      margin-bottom: 24px;
      color: #f4ede8;
    }  
  }

  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }

  > a {
    color: #FF9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#FF9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${[register]}) no-repeat center;
  background-size: cover;
`;
