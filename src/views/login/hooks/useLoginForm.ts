import useAuth from '@/app/contexts/auth/useAuth';
import { handleError } from '@/shared/utils/handle-error';
import { useState } from 'react';
import type { Form } from '../types/form';

const useLoginForm = () => {
  const [loginForm, setLoginForm] = useState<Form>({
    name: '',
    email: '',
    password: '',
  });
  const [loginFormErrors, setLoginFormErrors] = useState<Partial<Form>>({});
  const [apiError, setApiError] = useState('');

  const { login } = useAuth();

  /**
   * Validation
   **/
  const onValidate = () => {
    const errors: Partial<Form> = {};

    if (!loginForm.name) {
      errors.name = 'Name is required';
    }

    if (!loginForm.email) {
      errors.email = 'Email is required';
    }

    if (!loginForm.password) {
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
      await login(loginForm);
    } catch (err) {
      const { message } = handleError(err);
      setApiError(message);
      console.error(message);
    }
  };

  const onFieldChange = (field: string, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    loginForm,
    loginFormErrors,
    apiError,
    onSubmit,
    onFieldChange,
  };
};

export default useLoginForm;
