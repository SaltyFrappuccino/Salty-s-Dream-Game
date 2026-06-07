import type { StatusEffect } from "@sdg/shared";

export function getStatusValue(statuses: StatusEffect[], type: StatusEffect["type"]): number {
  return statuses
    .filter((status) => status.type === type)
    .reduce((sum, status) => sum + status.value, 0);
}


