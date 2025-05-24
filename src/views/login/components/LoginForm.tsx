import { type FC } from 'react';
import { tv } from 'tailwind-variants';
import type useLoginForm from '../hooks/useLoginForm';

type FormProps = ReturnType<typeof useLoginForm>['form'] & {};

const LoginForm: FC<FormProps> = ({ fields, loginFormErrors, onSubmit, onFieldChange }) => {
  const loginStyles = tv({
    slots: {
      formStyles: `bg-gray-50 rounded-md px-4 py-8 flex flex-col gap-3 shadow-md shadow-gray-300`,
      titleStyles: `font-light text-center text-lg`,
      inputStyles: `px-4 py-2 rounded-md bg-white focus:shadow-sm shadow-gray-300 hover:shadow-sm inset-shadow-gray-500 outline-hidden transition-all`,
      buttonStyles: `bg-gray-200 py-2 rounded-md hover:cursor-pointer hover:shadow-sm shadow-gray-400 transition-all`,
    },
  });

  const { formStyles, titleStyles, inputStyles, buttonStyles } = loginStyles();

  return (
    <form
      aria-label="Login"
      className={formStyles()}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      noValidate
    >
      <h4 className={titleStyles()}>Login</h4>

      <input
        type="email"
        className={`${inputStyles()} ${loginFormErrors?.email ? 'border border-red-500' : ''}`}
        placeholder="Email"
        value={fields.email}
        onChange={(e) => onFieldChange('email', e.target.value)}
        autoComplete="username"
      />
      {loginFormErrors && <span className="text-red-500 text-xs">{loginFormErrors?.email}</span>}

      <input
        type="password"
        className={`${inputStyles()} ${loginFormErrors?.password ? 'border border-red-500' : ''}`}
        placeholder="Password"
        value={fields.password}
        onChange={(e) => onFieldChange('password', e.target.value)}
        autoComplete="current-password"
      />
      {loginFormErrors && <span className="text-red-500 text-xs">{loginFormErrors?.password}</span>}

      <button className={buttonStyles()}>Sign in</button>
    </form>
  );
};

export default LoginForm;
