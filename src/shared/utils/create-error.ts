import type { AppError } from '../types/app-error';

export const createError = (
  message: string,
  options?: {
    code?: string;
    status?: number;
    cause?: unknown;
  }
): AppError => ({
  message,
  ...options,
});
