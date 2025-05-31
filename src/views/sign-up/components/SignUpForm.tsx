import { type FC } from 'react';

import type useSignUp from '../hooks/useSignUp';

type FormProps = ReturnType<typeof useSignUp>['form'] & {};

const SignUpForm: FC<FormProps> = ({ fields, errors, onFormSubmit, onFieldChange }) => {
  return (
    <form
      aria-label="Signup"
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit();
      }}
      noValidate
    >
      <h4>Sign Up</h4>

      <input
        type="text"
        placeholder="Username"
        value={fields.username}
        onChange={(e) => onFieldChange('username', e.target.value)}
      />
      {errors && <span className="text-red-500 text-xs">{errors?.username}</span>}

      <input
        type="email"
        placeholder="Email"
        value={fields.email}
        onChange={(e) => onFieldChange('email', e.target.value)}
        autoComplete="username"
      />
      {errors && <span className="text-red-500 text-xs">{errors?.email}</span>}

      <input
        type="password"
        placeholder="Password"
        value={fields.password}
        onChange={(e) => onFieldChange('password', e.target.value)}
        autoComplete="current-password"
      />
      {errors && <span className="text-red-500 text-xs">{errors?.password}</span>}

      <button>Register</button>
    </form>
  );
};

export default SignUpForm;
