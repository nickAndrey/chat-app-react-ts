import LoginForm from '@/views/login/components/LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('LoginForm', () => {
  const fields = {
    name: '',
    email: '',
    password: '',
  };

  const loginFormErrors = {
    name: 'Name is required',
    email: 'Email is required',
    password: 'Password is required',
  };

  const mockSubmit = vi.fn();
  const mockFieldChange = vi.fn();

  it('Should render LoginForm component', () => {
    render(
      <LoginForm
        fields={fields}
        loginFormErrors={loginFormErrors}
        onSubmit={mockSubmit}
        onFieldChange={mockFieldChange}
      />
    );

    const form = screen.getByRole('form', { name: 'Login' });

    const nameInput = screen.getByPlaceholderText(/Name/);
    const emailInput = screen.getByPlaceholderText(/Email/);
    const passwordInput = screen.getByPlaceholderText(/Password/);

    expect(form).toBeDefined();
    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it('Should render validation errors', () => {
    render(
      <LoginForm
        fields={fields}
        loginFormErrors={loginFormErrors}
        onSubmit={mockSubmit}
        onFieldChange={mockFieldChange}
      />
    );

    const form = screen.getByRole('form', { name: 'Login' });

    fireEvent.submit(form);

    expect(mockSubmit).toBeCalled();
    expect(screen.getByText(loginFormErrors.name)).toBeInTheDocument();
    expect(screen.getByText(loginFormErrors.email)).toBeInTheDocument();
    expect(screen.getByText(loginFormErrors.password)).toBeInTheDocument();
  });
});
