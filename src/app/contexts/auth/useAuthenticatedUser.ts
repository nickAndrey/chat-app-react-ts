import useAuth from './useAuth';

const useAuthenticatedUser = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) throw new Error('Auth is still loading');
  if (!user) throw new Error('User is not authenticated. This should be impossible here.');

  return user;
};

export default useAuthenticatedUser;
