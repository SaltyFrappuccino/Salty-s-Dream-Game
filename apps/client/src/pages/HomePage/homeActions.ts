export type HomeAction = {
  description: string;
  kicker: string;
  label: string;
  tone: "red" | "gold" | "blue" | "violet" | "steel";
  to: string;
};

export const homeActions: HomeAction[] = [
  {
    description: "Персонажи, оружие и сезонные находки текущего лобби.",
    kicker: "Ростер",
    label: "Коллекция",
    tone: "gold",
    to: "/collection"
  },
  {
    description: "Собери сезонную колоду под состав и стиль боя своей команды.",
    kicker: "Тактика",
    label: "Колоды",
    tone: "steel",
    to: "/decks"
  },
  {
    description: "Крути сезонные баннеры, добирай состав и открывай снаряжение.",
    kicker: "Баннеры",
    label: "Призыв",
    tone: "red",
    to: "/gacha"
  },
  {
    description: "Создай недельное лобби, задай правила сезона и позови друзей.",
    kicker: "Сезон",
    label: "Лобби",
    tone: "violet",
    to: "/lobby"
  },
  {
    description: "Смотри бои, награды и хронику завершённых сезонов.",
    kicker: "Архив",
    label: "История",
    tone: "blue",
    to: "/matches"
  }
];
