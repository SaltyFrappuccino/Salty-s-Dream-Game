import type { ExportedLocalProfile, ProgressContext } from "@sdg/shared";
import { profileRepository } from "../repositories/profileRepository";
import { walletRepository } from "../repositories/walletRepository";
import { collectionRepository } from "../repositories/collectionRepository";
import { weaponRepository } from "../repositories/weaponRepository";
import { getPlayerSnapshot, replaceLocalPlayerSnapshot } from "../repositories/demoData";
import { supabaseBootstrapService } from "./supabaseBootstrapService";
import { localProfileTransferService } from "./localProfileTransferService";

const starRequirements = [50, 100, 150, 200, 300] as const;

export const playerService = {
  async bootstrap(userId: string, displayName: string, username?: string, progressContext?: ProgressContext) {
    const resolvedUsername = username ?? userId;
    await supabaseBootstrapService.syncPlayer(userId, displayName, resolvedUsername);
    return {
      ...getPlayerSnapshot(userId, displayName, resolvedUsername),
      progressContext
    };
  },
  getProfile(userId: string, displayName: string) {
    return profileRepository.getByUserId(userId, displayName);
  },
  getWallet(userId: string, displayName: string) {
    return walletRepository.getByUserId(userId, displayName);
  },
  getCollection(userId: string, displayName: string) {
    return collectionRepository.getByUserId(userId, displayName);
  },
  getWeapons(userId: string, displayName: string) {
    return weaponRepository.getByUserId(userId, displayName);
  },
  exportLocalProfile(userId: string, displayName: string) {
    return {
      code: localProfileTransferService.export(getPlayerSnapshot(userId, displayName, userId))
    };
  },
  importLocalProfile(userId: string, displayName: string, data: ExportedLocalProfile) {
    replaceLocalPlayerSnapshot(userId, displayName, userId, data);
    return getPlayerSnapshot(userId, displayName, userId);
  },
  decodeLocalProfile(code: string) {
    return localProfileTransferService.import(code);
  },
  equipWeapon(userId: string, displayName: string, characterVersionId: string, weaponDefinitionId?: string) {
    const collection = collectionRepository.getByUserId(userId, displayName);
    const character = collection.find((item) => item.characterVersionId === characterVersionId);
    if (!character) {
      throw new Error("РџРµСЂСЃРѕРЅР°Р¶ РЅРµ РѕС‚РєСЂС‹С‚.");
    }

    if (weaponDefinitionId) {
      const ownedWeapons = weaponRepository.getByUserId(userId, displayName);
      if (!ownedWeapons.some((weapon) => weapon.weaponDefinitionId === weaponDefinitionId)) {
        throw new Error("РћСЂСѓР¶РёРµ РЅРµ РѕС‚РєСЂС‹С‚Рѕ.");
      }
    }

    const updated = collectionRepository.updateCharacter(userId, characterVersionId, (current) => ({
      ...current,
      equippedWeaponId: weaponDefinitionId
    }));

    if (!updated) {
      throw new Error("РќРµ СѓРґР°Р»РѕСЃСЊ СЌРєРёРїРёСЂРѕРІР°С‚СЊ РѕСЂСѓР¶РёРµ.");
    }

    return updated;
  },
  upgradeCharacter(userId: string, displayName: string, characterVersionId: string) {
    const collection = collectionRepository.getByUserId(userId, displayName);
    const character = collection.find((item) => item.characterVersionId === characterVersionId);
    if (!character) {
      throw new Error("РџРµСЂСЃРѕРЅР°Р¶ РЅРµ РѕС‚РєСЂС‹С‚.");
    }

    if (character.stars >= 5) {
      throw new Error("РџРµСЂСЃРѕРЅР°Р¶ СѓР¶Рµ РёРјРµРµС‚ 5 Р·РІС‘Р·Рґ.");
    }

    const requirement = starRequirements[character.stars] ?? 300;
    if (character.shards < requirement) {
      throw new Error("РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ РѕСЃРєРѕР»РєРѕРІ.");
    }

    const updated = collectionRepository.updateCharacter(userId, characterVersionId, (current) => ({
      ...current,
      stars: current.stars + 1,
      shards: current.shards - requirement
    }));

    if (!updated) {
      throw new Error("РќРµ СѓРґР°Р»РѕСЃСЊ СѓР»СѓС‡С€РёС‚СЊ РїРµСЂСЃРѕРЅР°Р¶Р°.");
    }

    return {
      character: updated,
      shardsSpent: requirement,
      nextRequirement: starRequirements[updated.stars]
    };
  }
};

