import type { User } from '@/shared/types/user';
import { createError } from '@/shared/utils/create-error';
import { createContext, useEffect, useState, type FC, type ReactNode } from 'react';
import USERS from './users.json';

type AuthContextProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  login: (user: Pick<User, 'name' | 'email' | 'password'>) => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(USERS[0]);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: make a request to check if user token still alive.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // TODO: replace with actual API.
  const login = async (user: Pick<User, 'name' | 'email' | 'password'>) => {
    const foundUser = USERS.find(
      (u) => u.email === user.email && u.name === user.name && u.password === user.password
    );

    if (!foundUser) {
      throw createError('User was not found, please check credentials', { code: 'NOT_FOUND' });
    }

    setUser({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isLoading,
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
