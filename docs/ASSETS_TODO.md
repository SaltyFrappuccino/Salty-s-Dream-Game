# Список ассетов для SDG

Ниже перечислен базовый набор ассетов уже под новую модель `SDG` как сезонной мультифандомной платформы. Контент должен постепенно переезжать от жёстко прошитых персонажей к сезонным и тематическим пакетам.

## Бренд и общая оболочка

```text
apps/client/public/assets/brand/
  logo-mark.svg
  logo-wordmark.svg
  auth-background.webp
  home-background.webp
  season-hub-background.webp
```

Нужно:

- логометка `SDG`;
- словесный логотип `Salty's Dream Game`;
- тёмные фоны под auth, главный экран и хаб сезона.

## Сезонные пакеты

Рекомендуемая структура:

```text
apps/client/public/assets/seasons/<seasonId>/
  cover.webp
  hub-bg.webp
  gacha-banner.webp
  battle-bg.webp
  roster/
  cards/
  weapons/
  effects/
```

Каждый сезон должен иметь собственный визуальный пакет, не ломая платформенный UI.

## Персонажи

Структура:

```text
apps/client/public/assets/seasons/<seasonId>/roster/<characterId>/
  avatar.png
  portrait.png
  full.png
```

Рекомендации:

- `avatar.png`: квадрат 512x512;
- `portrait.png`: 4:5 или 1024x1280;
- `full.png`: key art 1600px+ по высоте;
- без вшитого текста и без UI-рамок.

## Карты

Структура:

```text
apps/client/public/assets/seasons/<seasonId>/cards/common/
apps/client/public/assets/seasons/<seasonId>/cards/<characterId>/
```

Рекомендации:

- формат `png` или `webp`;
- вертикальный игровой арт;
- текст карты, стоимость и рамка должны рисоваться UI-слоем.

## Оружие и снаряжение

Структура:

```text
apps/client/public/assets/seasons/<seasonId>/weapons/
```

Для каждого предмета нужен:

- квадратный icon art;
- крупный preview art;
- при желании отдельный glow/foil-слой для редкостей.

## UI-иконки

```text
apps/client/public/assets/icons/roles/
apps/client/public/assets/icons/rarity/
apps/client/public/assets/icons/resources/
apps/client/public/assets/icons/statuses/
apps/client/public/assets/icons/seasons/
```

Минимум:

```text
roles/dps.svg
roles/support.svg
roles/tank.svg
roles/specialist.svg

rarity/r.svg
rarity/sr.svg
rarity/ssr.svg
rarity/ur.svg

resources/hp.svg
resources/spiritual-energy.svg
resources/stamina.svg
resources/yen.svg
resources/ticket.svg
resources/season-token.svg

statuses/shield.svg
statuses/wound.svg
statuses/stun.svg
statuses/seal.svg
statuses/buff.svg
statuses/debuff.svg
statuses/mark.svg

seasons/lobby.svg
seasons/contracts.svg
seasons/leaderboard.svg
seasons/archive.svg
```

## Эффекты

```text
apps/client/public/assets/effects/
```

Минимум:

```text
slash.png
heal.png
shield.png
ultimate.png
gacha-seal.png
gacha-light-r.png
gacha-light-sr.png
gacha-light-ssr.png
gacha-light-ur.png
ink-smoke.png
card-spark.png
damage-number.png
season-pulse.png
```

## Аудио

```text
apps/client/public/assets/audio/
```

Минимум:

```text
click.mp3
card-hover.mp3
card-play.mp3
hit.mp3
heal.mp3
shield.mp3
draw.mp3
gacha-roll.mp3
gacha-ssr.mp3
gacha-ur.mp3
victory.mp3
defeat.mp3
season-start.mp3
season-finish.mp3
```

## Промпт для генерации фонов через ChatGPT

```text
Сгенерируй фон для браузерной игры SDG — сезонной мультифандомной PvP-платформы.
Стиль: тёмная аниме-манга эстетика, графит, красные акценты, тонкие золотые линии, чернильная фактура, ощущение закрытого клуба дуэлей.
Формат: 16:9, без текста, без логотипов, без UI, с чистыми зонами под интерфейс.
Назначение: <auth / home / season hub / battle / gacha>.
```
