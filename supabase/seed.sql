insert into public.character_versions (
  id,
  base_character_id,
  name,
  version_name,
  display_name,
  role,
  rarity,
  max_hp,
  starting_spiritual_energy,
  max_spiritual_energy,
  starting_stamina,
  max_stamina,
  passive_id,
  card_pool,
  asset_key
)
values
  ('hinao', 'hinao', 'Хинао', 'База', 'Хинао', 'Support', 'R', 9, 2, 5, 2, 5, 'hinao_passive', '[]'::jsonb, 'hinao')
on conflict (id) do nothing;
