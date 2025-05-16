import type { User } from '@/shared/types/user';
import { createError } from '@/shared/utils/create-error';
import { createContext, useState, type FC, type ReactNode } from 'react';
import USERS from './users.json';

type AuthContextProps = {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: Pick<User, 'name' | 'email' | 'password'>) => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
