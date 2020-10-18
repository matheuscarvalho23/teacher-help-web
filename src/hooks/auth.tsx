import React, { createContext, useCallback, useState, useContext } from "react";

import api from '../services/api';

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@TeacherHelp:token');
    const user  = localStorage.getItem('@TeacherHelp:user');

    if (token && user) {
      return { token, user: JSON.parse(user)}
    }

    return {} as AuthState;
  });

  // Método de Logout
  const signOut = useCallback(() => {
    localStorage.remove('@TeacherHelp:token');
    localStorage.remove('@TeacherHelp:user');

    setData({} as AuthState);
  }, []);

  // Método de Login
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data.list;

    localStorage.setItem('@TeacherHelp:token',token);
    localStorage.setItem('@TeacherHelp:user',JSON.stringify(user));

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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