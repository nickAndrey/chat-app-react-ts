export type AppError = {
  message: string;
  code?: string;
  cause?: unknown; // optional raw error
  status?: number; // e.g. from HTTP
};
