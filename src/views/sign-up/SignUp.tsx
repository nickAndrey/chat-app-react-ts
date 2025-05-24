import { type FC } from 'react';
import SignUpForm from './components/SignUpForm';
import useSignUp from './hooks/useSignUp';

const SignUp: FC = () => {
  const { form, apiError } = useSignUp();

  return (
    <div className="flex flex-col max-w-[600px] w-full gap-4">
      {apiError && (
        <div className="bg-red-100 rounded-md px-4 py-2">
          <p className="text-sm text-red-500">{apiError}</p>
        </div>
      )}

      <SignUpForm {...form} />
    </div>
  );
};

export default SignUp;
