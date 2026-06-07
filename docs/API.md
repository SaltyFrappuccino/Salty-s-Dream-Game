# API

## HTTP

- `GET /health`
- `GET /api/me`
- `GET /api/player/profile`
- `GET /api/player/wallet`
- `GET /api/player/collection`
- `GET /api/player/decks`
- `POST /api/player/decks`
- `PUT /api/player/decks/:deckId`
- `DELETE /api/player/decks/:deckId`
- `GET /api/catalog/characters`
- `GET /api/catalog/cards`
- `GET /api/catalog/banners`
- `POST /api/gacha/roll`
- `GET /api/matches/history`
- `GET /api/matches/:matchId`

## Socket.IO

- `room:create`
- `room:join`
- `room:leave`
- `room:ready`
- `room:select-deck`
- `room:update-settings`
- `match:start`
- `match:play-card`
- `match:basic-attack`
- `match:defend`
- `match:focus`
- `match:rest`
- `match:discard-dead-card`
- `match:end-turn`
- `match:concede`
- `match:state`
- `match:finished`

