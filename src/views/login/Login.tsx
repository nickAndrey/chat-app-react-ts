import { type FC } from 'react';
import { NavLink } from 'react-router';
import LoginForm from './components/LoginForm';
import useLoginForm from './hooks/useLoginForm';

const Login: FC = () => {
  const { form, apiError } = useLoginForm();

  return (
    <div className="flex flex-col max-w-[600px] w-full gap-4">
      {apiError && (
        <div className="bg-red-100 rounded-md px-4 py-2">
          <p className="text-sm text-red-500">{apiError}</p>
        </div>
      )}

      <LoginForm {...form} />

      <NavLink to="/sign-up" className="hover:underline self-start">
        Create new user
      </NavLink>
    </div>
  );
};

export default Login;
