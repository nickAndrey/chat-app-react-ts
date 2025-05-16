import LoginForm from '@/views/login/components/LoginForm';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('LoginForm', () => {
  it('Should render LoginForm component', () => {
    render(
      <LoginForm
        fields={{
          name: 'test',
          email: 'test@test.com',
          password: 'test',
        }}
        onSubmit={() => {}}
        onFieldChange={() => {}}
      />
    );

    expect(screen.getByText(/Login/)).toBeInTheDocument();
  });

  it('Should render validation errors', () => {
    const onSubmitFn = vi.fn();

    render(
      <LoginForm
        fields={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={onSubmitFn}
        onFieldChange={() => {}}
      />
    );

    screen.debug();

    expect(onSubmitFn).toBeCalled();
  });
});
