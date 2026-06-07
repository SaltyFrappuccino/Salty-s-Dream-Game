export type SeasonThemePack = {
  id: string;
  name: string;
  description: string;
  heroAssetKey?: string;
};

export type SeasonLobby = {
  id: string;
  name: string;
  joinCode: string;
  createdAt: string;
  endsAt: string;
  createdByUserId: string;
  status: "Active" | "Expired";
  theme?: SeasonThemePack;
};
