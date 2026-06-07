import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import type { ExportedLocalProfile, PlayerSnapshot } from "@sdg/shared";

const formatPrefix = "SDG1";

function getSecretKey() {
  return createHash("sha256").update("sdg-local-profile-transfer-v1").digest();
}

function toBase64Url(buffer: Uint8Array): string {
  return Buffer.from(buffer).toString("base64url");
}

function fromBase64Url(value: string): Buffer {
  return Buffer.from(value, "base64url");
}

function toExportedProfile(snapshot: PlayerSnapshot): ExportedLocalProfile {
  return {
    version: 1,
    profile: {
      id: snapshot.profile.id,
      username: snapshot.profile.username,
      displayName: snapshot.profile.displayName
    },
    wallet: {
      yen: snapshot.wallet.yen,
      summonTickets: snapshot.wallet.summonTickets
    },
    collection: snapshot.collection.map((character) => ({
      characterVersionId: character.characterVersionId,
      stars: character.stars,
      shards: character.shards,
      equippedWeaponId: character.equippedWeaponId
    })),
    weapons: snapshot.weapons.map((weapon) => ({
      weaponDefinitionId: weapon.weaponDefinitionId,
      shards: weapon.shards
    })),
    decks: snapshot.decks.map((deck) => ({
      id: deck.id,
      name: deck.name,
      characterIds: deck.characterIds,
      cards: deck.cards.map((card) => ({
        cardId: card.cardId,
        quantity: card.quantity
      }))
    }))
  };
}

export const localProfileTransferService = {
  export(snapshot: PlayerSnapshot): string {
    const payload = Buffer.from(JSON.stringify(toExportedProfile(snapshot)), "utf8");
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", getSecretKey(), iv);
    const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);
    const tag = cipher.getAuthTag();

    return `${formatPrefix}.${toBase64Url(iv)}.${toBase64Url(tag)}.${toBase64Url(encrypted)}`;
  },
  import(code: string): ExportedLocalProfile {
    const [prefix, ivPart, tagPart, payloadPart] = code.trim().split(".");

    if (prefix !== formatPrefix || !ivPart || !tagPart || !payloadPart) {
      throw new Error("Неверный формат кода профиля.");
    }

    const decipher = createDecipheriv("aes-256-gcm", getSecretKey(), fromBase64Url(ivPart));
    decipher.setAuthTag(fromBase64Url(tagPart));

    try {
      const decrypted = Buffer.concat([
        decipher.update(fromBase64Url(payloadPart)),
        decipher.final()
      ]);

      return JSON.parse(decrypted.toString("utf8")) as ExportedLocalProfile;
    } catch {
      throw new Error("Не удалось расшифровать код профиля.");
    }
  }
};
