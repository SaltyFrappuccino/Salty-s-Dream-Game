import type { DeckBuilderFilter } from "./deckBuilder.types";

export const cardTypeFilters: DeckBuilderFilter[] = [
  "All",
  "Common",
  "Attack",
  "Technique",
  "Support",
  "Defense",
  "Reaction",
  "Ultimate"
];

export function getFilterLabel(filter: DeckBuilderFilter): string {
  if (filter === "All") {
    return "Все";
  }

  if (filter === "Common") {
    return "Общие";
  }

  return filter;
}
