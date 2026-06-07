import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  SOCKET_CORS_ORIGIN: z.string().default("http://localhost:5173"),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  JWT_SECRET: z.string().default("dev_secret_change_me")
});

export const env = envSchema.parse(process.env);

