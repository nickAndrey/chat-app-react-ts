import useAuth from '@/app/contexts/auth/useAuth';
import type { User } from '@/shared/types/user';
import { handleError } from '@/shared/utils/handle-error';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const useLoginForm = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState<Pick<User, 'email' | 'password'>>({
    email: '',
    password: '',
  });

  const [loginFormErrors, setLoginFormErrors] = useState<Partial<typeof fields>>({});
  const [apiError, setApiError] = useState('');

  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  /**
   * Validation
   **/
  const onValidate = () => {
    const errors: Partial<User> = {};

    if (!fields.email) {
      errors.email = 'Email is required';
    }

    if (!fields.password) {
      errors.password = 'Password is required';
    }

    setLoginFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Submit and validation call
   **/
  const onSubmit = async () => {
    const isFormValid = onValidate();

    if (!isFormValid) return;

    try {
      await login(fields);
    } catch (err) {
      const { message } = handleError(err);
      setApiError(message);
      console.error(message);
    }
  };

  const onFieldChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form: {
      fields,
      loginFormErrors,
      onSubmit,
      onFieldChange,
    },
    apiError,
  };
};

export default useLoginForm;
