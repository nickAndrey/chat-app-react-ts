import { useState } from 'react';

const useSignUp = () => {
  // fields: Form;
  //   loginFormErrors?: Partial<Form>;
  //   onSubmit: () => void;
  //   onFieldChange: (field: string, value: string) => void;

  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<typeof fields>>({});

  const validateFields = () => {
    const errors: Record<string, string> = {};

    if (!fields.name) {
      errors.name = 'Name is required';
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

  const onFormSubmit = () => {
    const isFormValid = validateFields();

    if (isFormValid) {
      console.log(fields);
    }
  };

  const onFieldChange = (field: keyof typeof fields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return {
    fields,
    errors,
    onFormSubmit,
    onFieldChange,
  };
};

export default useSignUp;
