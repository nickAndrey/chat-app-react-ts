import { type FC } from 'react';

import type useLoginForm from '../hooks/useLoginForm';

type FormProps = ReturnType<typeof useLoginForm>['form'] & {};

const LoginForm: FC<FormProps> = ({ fields, loginFormErrors, onSubmit, onFieldChange }) => {
  return (
    <form
      aria-label="Login"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      noValidate
    >
      <h4>Login</h4>

      <input
        type="email"
        placeholder="Email"
        value={fields.email}
        onChange={(e) => onFieldChange('email', e.target.value)}
        autoComplete="username"
      />
      {loginFormErrors && <span className="text-red-500 text-xs">{loginFormErrors?.email}</span>}

      <input
        type="password"
        placeholder="Password"
        value={fields.password}
        onChange={(e) => onFieldChange('password', e.target.value)}
        autoComplete="current-password"
      />
      {loginFormErrors && <span className="text-red-500 text-xs">{loginFormErrors?.password}</span>}

      <button>Sign in</button>
    </form>
  );
};

export default LoginForm;
