import type { PublicUser, User } from '@/shared/types/user';
import { createError } from '@/shared/utils/create-error';
import { createContext, useEffect, useState, type FC, type ReactNode } from 'react';

type AuthContextProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: PublicUser;
  login: (user: Pick<User, 'email' | 'password'>) => Promise<void>;
  signUp: (user: Omit<User, 'id'>) => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * every time user refresh the page, make a request to check if refresh token valid and if so - return new access token
   * user have to be remain logged in
   *
   */
  useEffect(() => {
    const controller = new AbortController();

    async function refreshToken() {
      const url = `${import.meta.env.VITE_API_URL}/auth/refresh-token`;

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        signal: controller.signal,
      });

      const { data } = await response.json();
      setIsLoading(false);

      if (response.status === 401) {
        setUser(null);
        setIsLoading(false);
        localStorage.removeItem('accessToken');
        return;
      }

      if (!response.ok) {
        throw createError(data?.msg || 'Unknown error during refresh', { cause: data });
      }

      const { user, accessToken } = data as { user: PublicUser; accessToken: string };

      setUser(user);
      localStorage.setItem('accessToken', accessToken);
    }

    refreshToken();

    return () => {
      controller.abort();
    };
  }, []);

  const login = async (userDTO: Pick<User, 'email' | 'password'>) => {
    const url = `${import.meta.env.VITE_API_URL}/auth/login`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userDTO),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const { data, error } = await response.json();

    if (!response.ok) throw createError(error.msg, { cause: error });

    const { user, accessToken } = data as { user: PublicUser; accessToken: string };

    setUser(user);
    localStorage.setItem('accessToken', accessToken);
  };

  const signUp = async (userDTO: Omit<User, 'id'>) => {
    const url = `${import.meta.env.VITE_API_URL}/auth/sign-up`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userDTO),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const { data, error } = await response.json();

    if (!response.ok) throw createError(error.msg, { cause: error });

    const { user, accessToken } = data as { user: PublicUser; accessToken: string };

    setUser(user);
    localStorage.setItem('accessToken', accessToken);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isLoading,
        user: (() => {
          if (isLoading) return {} as PublicUser;
          if (!user) throw new Error('User is not available but marked as logged in');
          return user;
        })(),
        login,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
