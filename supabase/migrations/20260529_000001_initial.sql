create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.player_wallets (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  yen integer not null default 0,
  summon_tickets integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.character_versions (
  id text primary key,
  base_character_id text not null,
  name text not null,
  version_name text not null,
  display_name text not null,
  role text not null,
  rarity text not null,
  max_hp integer not null,
  starting_spiritual_energy integer not null,
  max_spiritual_energy integer not null,
  starting_stamina integer not null,
  max_stamina integer not null,
  passive_id text not null,
  card_pool jsonb not null default '[]'::jsonb,
  asset_key text not null
);

create table if not exists public.card_definitions (
  id text primary key,
  name text not null,
  description text not null,
  type text not null,
  rarity text not null,
  owner_character_version_id text,
  is_common boolean not null default false,
  cost jsonb not null default '{}'::jsonb,
  effect_id text not null,
  target_mode text not null,
  tags jsonb not null default '[]'::jsonb,
  asset_key text
);

create table if not exists public.player_characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  character_version_id text not null references public.character_versions(id),
  stars integer not null default 0,
  obtained_at timestamptz not null default now(),
  unique(user_id, character_version_id)
);

create table if not exists public.player_character_shards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  character_version_id text not null references public.character_versions(id),
  shards integer not null default 0,
  unique(user_id, character_version_id)
);

create table if not exists public.player_decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  character_1_id text not null,
  character_2_id text not null,
  character_3_id text not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.player_deck_cards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.player_decks(id) on delete cascade,
  card_id text not null references public.card_definitions(id),
  quantity integer not null check (quantity > 0 and quantity <= 2)
);

create table if not exists public.gacha_banners (
  id text primary key,
  name text not null,
  rates jsonb not null default '{}'::jsonb,
  pity_sr integer not null default 10,
  pity_ssr integer not null default 50,
  pity_ur integer not null default 90
);

create table if not exists public.gacha_rolls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  banner_id text not null references public.gacha_banners(id),
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  winner_user_id uuid references public.profiles(id),
  status text not null,
  turn_count integer not null default 0,
  duration_seconds integer not null default 0,
  rewards jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.match_players (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  deck_id uuid,
  result text not null
);

create table if not exists public.match_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.player_wallets enable row level security;
alter table public.character_versions enable row level security;
alter table public.card_definitions enable row level security;
alter table public.player_characters enable row level security;
alter table public.player_character_shards enable row level security;
alter table public.player_decks enable row level security;
alter table public.player_deck_cards enable row level security;
alter table public.gacha_banners enable row level security;
alter table public.gacha_rolls enable row level security;
alter table public.matches enable row level security;
alter table public.match_players enable row level security;
alter table public.match_events enable row level security;

drop policy if exists "profiles_own_access" on public.profiles;
create policy "profiles_own_access" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "wallet_own_access" on public.player_wallets;
create policy "wallet_own_access" on public.player_wallets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "player_characters_own_access" on public.player_characters;
create policy "player_characters_own_access" on public.player_characters
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "player_character_shards_own_access" on public.player_character_shards;
create policy "player_character_shards_own_access" on public.player_character_shards
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "player_decks_own_access" on public.player_decks;
create policy "player_decks_own_access" on public.player_decks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "player_deck_cards_own_access" on public.player_deck_cards;
create policy "player_deck_cards_own_access" on public.player_deck_cards
  for all using (
    exists (
      select 1 from public.player_decks
      where player_decks.id = player_deck_cards.deck_id
      and player_decks.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.player_decks
      where player_decks.id = player_deck_cards.deck_id
      and player_decks.user_id = auth.uid()
    )
  );

drop policy if exists "gacha_rolls_own_access" on public.gacha_rolls;
create policy "gacha_rolls_own_access" on public.gacha_rolls
  for select using (auth.uid() = user_id);

drop policy if exists "catalog_read_authenticated_characters" on public.character_versions;
create policy "catalog_read_authenticated_characters" on public.character_versions
  for select using (auth.role() = 'authenticated');

drop policy if exists "catalog_read_authenticated_cards" on public.card_definitions;
create policy "catalog_read_authenticated_cards" on public.card_definitions
  for select using (auth.role() = 'authenticated');

drop policy if exists "catalog_read_authenticated_banners" on public.gacha_banners;
create policy "catalog_read_authenticated_banners" on public.gacha_banners
  for select using (auth.role() = 'authenticated');

drop policy if exists "match_players_own_history" on public.match_players;
create policy "match_players_own_history" on public.match_players
  for select using (auth.uid() = user_id);

drop policy if exists "matches_participant_history" on public.matches;
create policy "matches_participant_history" on public.matches
  for select using (
    exists (
      select 1 from public.match_players
      where match_players.match_id = matches.id
      and match_players.user_id = auth.uid()
    )
  );

drop policy if exists "match_events_participant_history" on public.match_events;
create policy "match_events_participant_history" on public.match_events
  for select using (
    exists (
      select 1 from public.match_players
      where match_players.match_id = match_events.match_id
      and match_players.user_id = auth.uid()
    )
  );
