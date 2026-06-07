export function createRoomId(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function createMatchId(): string {
  return `match_${Math.random().toString(36).slice(2, 10)}`;
}
