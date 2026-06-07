export const logger = {
  info(message: string, payload?: unknown): void {
    console.log(`[info] ${message}`, payload ?? "");
  },
  error(message: string, payload?: unknown): void {
    console.error(`[error] ${message}`, payload ?? "");
  }
};

