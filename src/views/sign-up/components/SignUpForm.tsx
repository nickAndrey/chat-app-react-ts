import { type FC } from 'react';
import { tv } from 'tailwind-variants';
import type useSignUp from '../hooks/useSignUp';

type FormProps = ReturnType<typeof useSignUp> & {};

const SignUpForm: FC<FormProps> = ({ fields, errors, onFormSubmit, onFieldChange }) => {
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
      aria-label="Signup"
      className={formStyles()}
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit();
      }}
      noValidate
    >
      <h4 className={titleStyles()}>Sign Up</h4>

      <input
        type="text"
        className={`${inputStyles()} ${errors?.name ? 'border border-red-500' : ''}`}
        placeholder="Name"
        value={fields.name}
        onChange={(e) => onFieldChange('name', e.target.value)}
      />
      {errors && <span className="text-red-500 text-xs">{errors?.name}</span>}

      <input
        type="email"
        className={`${inputStyles()} ${errors?.email ? 'border border-red-500' : ''}`}
        placeholder="Email"
        value={fields.email}
        onChange={(e) => onFieldChange('email', e.target.value)}
        autoComplete="username"
      />
      {errors && <span className="text-red-500 text-xs">{errors?.email}</span>}

      <input
        type="password"
        className={`${inputStyles()} ${errors?.password ? 'border border-red-500' : ''}`}
        placeholder="Password"
        value={fields.password}
        onChange={(e) => onFieldChange('password', e.target.value)}
        autoComplete="current-password"
      />
      {errors && <span className="text-red-500 text-xs">{errors?.password}</span>}

      <button className={buttonStyles()}>Register</button>
    </form>
  );
};

export default SignUpForm;
