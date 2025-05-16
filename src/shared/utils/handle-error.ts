import type { AppError } from '../types/app-error';
import { createError } from './create-error';

export const handleError = (err: unknown): AppError => {
  if (err && typeof err === 'object' && 'message' in err) {
    return err as AppError;
  }

  return createError('An unknown error occurred', {
    cause: err,
    code: 'UNKNOWN',
  });
};
