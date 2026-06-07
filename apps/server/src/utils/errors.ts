import type { ApiError } from "@sdg/shared";

export function apiError(code: string, message: string, details?: unknown): ApiError {
  return {
    code,
    message,
    details
  };
}


