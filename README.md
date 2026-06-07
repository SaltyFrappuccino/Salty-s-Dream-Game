# SDG

SDG (`Salty's Dream Game`) — это браузерная сезонная PvP-платформа для локальной игры с друзьями. Внутри временных лобби игроки собирают составы, получают ресурсы, крутят баннеры, строят колоды и дерутся в карточных боях. Проект строится как мультифандомная база: конкретный контент должен жить в отдельных сезонных и тематических пакетах, а не быть жёстко пришитым к одному IP.

## Текущее направление

- Основная игра строится вокруг сезонных лобби на несколько дней.
- Локальный профиль остаётся как оболочка игрока и место для экспорта/импорта.
- `game-core` остаётся чистым боевым ядром без зависимостей от UI и сервера.
- Клиент и сервер должны постепенно уходить от старой single-fandom модели к платформенной.

## Стек

- Frontend: React, Vite, TypeScript, Phaser, Zustand, SCSS Modules
- Backend: Node.js, TypeScript, Fastify, Socket.IO, Zod
- Data: Supabase
- Monorepo: pnpm workspaces

## Структура

```text
apps/
  client/
  server/
packages/
  shared/
  game-core/
supabase/
docs/
```

## Ключевые документы

- Архитектура и новое направление: `docs/SDG_ARCHITECTURE.md`
- Список ассетов: `docs/ASSETS_TODO.md`
- Деплой: `docs/DEPLOYMENT.md`

## Установка

```bash
pnpm install
```

## Разработка

```bash
pnpm dev
pnpm dev:client
pnpm dev:server
```

## Сборка

```bash
pnpm build
```

## Тесты

```bash
pnpm test
```

## Переменные окружения

- Скопировать корневой `.env.example`
- Скопировать `apps/client/.env.example`
- Скопировать `apps/server/.env.example`

## Деплой

### Vercel

- Root Directory: `apps/client`
- Build Command: `pnpm build`
- Output Directory: `dist`

### Render

- Root Directory: `apps/server`
- Build Command: `pnpm install --frozen-lockfile && pnpm build`
- Start Command: `pnpm start`

## Текущее состояние ребрендинга

- Workspace-пакеты уже переведены на `@sdg/*`.
- Базовый UI-бренд переведён на `SDG`.
- Архитектурный вектор переведён на сезонные мультифандомные лобби.
- Контентные данные и часть старых документов ещё требуют дальнейшей чистки под новую модель.
