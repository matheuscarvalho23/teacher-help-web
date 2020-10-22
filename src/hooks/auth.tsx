import React, { createContext, useCallback, useState, useContext } from "react";

import api from '../services/api';

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  teacher: object;
}

interface AuthContextData {
  teacher: object;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@TeacherHelp:token');
    const teacher  = localStorage.getItem('@TeacherHelp:teacher');

    if (token && teacher) {
      return { token, teacher: JSON.parse(teacher)}
    }

    return {} as AuthState;
  });

  // Método de Logout
  const signOut = useCallback(() => {
    localStorage.remove('@TeacherHelp:token');
    localStorage.remove('@TeacherHelp:teacher');

    setData({} as AuthState);
  }, []);

  // Método de Login
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, teacher } = response.data.return;

    localStorage.setItem('@TeacherHelp:token',token);
    localStorage.setItem('@TeacherHelp:teacher',JSON.stringify(teacher));

    setData({ token, teacher });
  }, []);

  return (
    <AuthContext.Provider value={{ teacher: data.teacher, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook de autenticação
 *
 * @export
 * @returns {AuthContextData}
 */
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
