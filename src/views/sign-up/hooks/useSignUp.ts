import useAuth from '@/app/contexts/auth/useAuth';
import type { User } from '@/shared/types/user';
import { handleError } from '@/shared/utils/handle-error';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const useSignUp = () => {
  const { isLoggedIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [fields, setFields] = useState<Omit<User, 'id'>>({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<typeof fields>>({});
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const validateFields = () => {
    const errors: Record<string, string> = {};

    if (!fields.username) {
      errors.username = 'Name is required';
    }

    if (!fields.email) {
      errors.email = 'Email is required';
    }

    if (!fields.password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onFormSubmit = async () => {
    const isFormValid = validateFields();
    if (!isFormValid) return;

    try {
      await signUp(fields);
    } catch (err) {
      const { message } = handleError(err);
      setApiError(message);
    }
  };

  const onFieldChange = (field: keyof typeof fields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form: {
      fields,
      errors,
      onFormSubmit,
      onFieldChange,
    },
    apiError,
  };
};

export default useSignUp;
