import { type FC } from 'react';
import SignUpForm from './components/SignUpForm';
import useSignUp from './hooks/useSignUp';

const SignUp: FC = () => {
  const { fields, errors, onFieldChange, onFormSubmit } = useSignUp();

  return (
    <SignUpForm
      fields={fields}
      errors={errors}
      onFieldChange={onFieldChange}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default SignUp;
