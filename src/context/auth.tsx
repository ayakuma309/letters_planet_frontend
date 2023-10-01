import React, { useContext, useEffect, useState } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: null | {
    id: number;
    username: string;
    email: string;
  };
  login: (token: string) => void;
  logout: () => void;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);

  //tokenがあるならserの情報を取得
  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.auth_token;
    if (token) {
      //tokenをheaderにセット
      apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;

      apiClient
        .get('/users/find')
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //login
  const login = async (token: string) => {
    setCookie(null, 'auth_token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;

    try {
      const res = await apiClient.get('/users/find');
      setUser(res.data.user);
      toast.success('ログインしました');
    } catch (err) {
      toast.error('ログインに失敗しました');
    }
  };

  //logout
  const logout = () => {
    const confirmed = window.confirm('ログアウトしますか？');
    if (confirmed) {
      destroyCookie(null, 'auth_token');
      delete apiClient.defaults.headers['Authorization'];
      setUser(null);
      toast.success('ログアウトしました');
    }
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
