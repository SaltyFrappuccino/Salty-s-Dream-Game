# Deployment

## Frontend / Vercel

- Root Directory: `apps/client`
- Build Command: `pnpm build`
- Output Directory: `dist`
- Install Command: `pnpm install --frozen-lockfile`

## Backend / Render

- Root Directory: `apps/server`
- Build Command: `pnpm install --frozen-lockfile && pnpm build`
- Start Command: `pnpm start`

## Supabase

- SQL-модели лежат в `supabase/migrations`
- Переменные окружения разделены между клиентом и сервером

