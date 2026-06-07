alter table character_versions
  add column if not exists base_stats jsonb not null default '{}'::jsonb;

alter table gacha_banners
  add column if not exists type text not null default 'character';

create table if not exists weapon_definitions (
  id text primary key,
  name text not null,
  description text not null,
  rarity text not null,
  stat_bonuses jsonb not null default '{}'::jsonb,
  asset_key text not null
);

create table if not exists player_weapons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  weapon_definition_id text not null references weapon_definitions(id),
  shards integer not null default 0,
  obtained_at timestamptz not null default now(),
  unique(user_id, weapon_definition_id)
);

create table if not exists player_character_equipment (
  user_id uuid not null references profiles(id) on delete cascade,
  character_version_id text not null,
  weapon_definition_id text references weapon_definitions(id),
  updated_at timestamptz not null default now(),
  primary key (user_id, character_version_id)
);

alter table player_weapons enable row level security;
alter table player_character_equipment enable row level security;
alter table weapon_definitions enable row level security;

create policy "Authenticated users can read weapon catalog"
  on weapon_definitions for select
  to authenticated
  using (true);

create policy "Users can read own weapons"
  on player_weapons for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can manage own weapons"
  on player_weapons for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can read own equipment"
  on player_character_equipment for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can manage own equipment"
  on player_character_equipment for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
