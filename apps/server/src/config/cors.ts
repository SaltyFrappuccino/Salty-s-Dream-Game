import { env } from "./env";

function isAllowedDevOrigin(origin: string): boolean {
  return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
}

export const corsOptions = {
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"],
  async origin(origin: string | undefined) {
    if (!origin || origin === env.CLIENT_ORIGIN || isAllowedDevOrigin(origin)) {
      return true;
    }

    return false;
  },
  credentials: true
};

export function resolveSocketCorsOrigin(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void): void {
  if (!origin || origin === env.SOCKET_CORS_ORIGIN || origin === env.CLIENT_ORIGIN || isAllowedDevOrigin(origin)) {
    callback(null, true);
    return;
  }

  callback(new Error(`Socket CORS origin is not allowed: ${origin}`), false);
}
