import type { User } from '@/shared/types/user';
import { createContext, useEffect, useState, type FC, type ReactNode } from 'react';

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
  const [user, setUser] = useState<User | null>(null);
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
    console.log(user);
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
