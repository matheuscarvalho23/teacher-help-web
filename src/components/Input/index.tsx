import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { useField } from '@unform/core';

import {
  Container,
  Error
} from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  isPass?: boolean;
  type?: string;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, isPass: isPass, type: type, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled]   = useState(false);
  const [showPass, setShowPass]   = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  },[]);

  const {
    fieldName,
    defaultValue,
    error,
    registerField
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      { Icon && <Icon size={20} />  }
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        type={(isPass && !showPass) ? 'password' : 'text' }
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
      {(isPass && !error) && (
        showPass ? (
          <FiEyeOff
            size={20}
            onClick={() => setShowPass(false)}
          />
        ) : (
          <FiEye
            size={20}
            onClick={() => setShowPass(true)}
          />
        )
      )}
    </Container>
  );
}

export default Input;
