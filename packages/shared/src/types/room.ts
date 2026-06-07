export type RoomState = {
  roomId: string;
  hostUserId: string;
  guestUserId?: string;
  status: "Waiting" | "ReadyCheck" | "InMatch" | "Finished";
  season?: {
    id: string;
    name: string;
    endsAt: string;
  };
  settings: {
    normalizedPvP: boolean;
    turnTimerSeconds: number;
  };
  players: {
    userId: string;
    socketId: string;
    selectedDeckId?: string;
    ready: boolean;
  }[];
};
