import type { MatchState } from "@sdg/shared";
import { resolveHealing } from "../engine/resolveHealing";
import { addStatus, removeStatus } from "../engine/resolveStatus";
import { drawCards, updateCharacter, updateTeamByPlayer } from "./effectState";

export function applyResourceEffect(
  state: MatchState,
  effectId: string,
  playerId: string,
  targetCharacterId?: string
): MatchState | undefined {
  switch (effectId) {
    case "draw_2":
      return drawCards(state, playerId, 2);
    case "heal_2":
      return targetCharacterId ? updateCharacter(state, targetCharacterId, (target) => resolveHealing(target, 2)) : undefined;
    case "self_sp_2":
      return targetCharacterId
        ? updateCharacter(state, targetCharacterId, (target) => ({
            ...target,
            spiritualEnergy: Math.min(target.maxSpiritualEnergy, target.spiritualEnergy + 2)
          }))
        : undefined;
    case "self_stamina_2":
      return targetCharacterId
        ? updateCharacter(state, targetCharacterId, (target) => ({
            ...target,
            stamina: Math.min(target.maxStamina, target.stamina + 2)
          }))
        : undefined;
    case "self_buff_2":
      return targetCharacterId ? updateCharacter(state, targetCharacterId, (target) => addStatus(target, "Buff", 2)) : undefined;
    case "self_stamina_1_buff_1":
      return targetCharacterId
        ? updateCharacter(state, targetCharacterId, (target) => addStatus({ ...target, stamina: Math.min(target.maxStamina, target.stamina + 1) }, "Buff", 1))
        : undefined;
    case "self_stamina_1_shield_1":
      return targetCharacterId
        ? updateCharacter(state, targetCharacterId, (target) => addStatus({ ...target, stamina: Math.min(target.maxStamina, target.stamina + 1) }, "Shield", 1))
        : undefined;
    case "self_stamina_1_shield_2":
      return targetCharacterId
        ? updateCharacter(state, targetCharacterId, (target) => addStatus({ ...target, stamina: Math.min(target.maxStamina, target.stamina + 1) }, "Shield", 2))
        : undefined;
    case "remove_seal_gain_sp_1":
      return targetCharacterId
        ? updateCharacter(state, targetCharacterId, (target) => ({
            ...removeStatus(target, "Seal"),
            spiritualEnergy: Math.min(target.maxSpiritualEnergy, target.spiritualEnergy + 1)
          }))
        : undefined;
    case "all_allies_sp_1":
      return updateTeamByPlayer(state, playerId, (target) => ({
        ...target,
        spiritualEnergy: Math.min(target.maxSpiritualEnergy, target.spiritualEnergy + 1)
      }));
    case "all_allies_stamina_1":
      return updateTeamByPlayer(state, playerId, (target) => ({
        ...target,
        stamina: Math.min(target.maxStamina, target.stamina + 1)
      }));
    case "all_allies_heal_2":
      return updateTeamByPlayer(state, playerId, (target) => resolveHealing(target, 2));
    default:
      return undefined;
  }
}

