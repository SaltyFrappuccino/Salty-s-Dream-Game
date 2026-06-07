export function getResultLabel(result?: string): string {
  if (result === "win") {
    return "Победа";
  }
  if (result === "loss") {
    return "Поражение";
  }
  return "Ничья";
}
