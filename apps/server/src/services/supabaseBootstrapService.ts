import { createStarterDeckCards } from "@sdg/game-core";
import { getSupabaseAdminClient } from "../db/supabaseAdmin";
import { getCardDefinitionRows, getCharacterVersionRows, getGachaBannerRows } from "./bootstrap/bootstrapCatalogRows";
import { getStarterCharacterRows, getStarterShardRows, getStarterWalletRow } from "./bootstrap/bootstrapPlayerRows";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export const supabaseBootstrapService = {
  async syncPlayer(userId: string, displayName: string, username: string): Promise<void> {
    const client = getSupabaseAdminClient();
    if (!client || !isUuid(userId)) {
      return;
    }

    await client.from("character_versions").upsert(getCharacterVersionRows(), { onConflict: "id" });
    await client.from("card_definitions").upsert(getCardDefinitionRows(), { onConflict: "id" });
    await client.from("gacha_banners").upsert(getGachaBannerRows(), { onConflict: "id" });

    await client.from("profiles").upsert({
      id: userId,
      username,
      display_name: displayName,
      updated_at: new Date().toISOString()
    });

    await client
      .from("player_wallets")
      .upsert(getStarterWalletRow(userId), { onConflict: "user_id", ignoreDuplicates: true });

    await client
      .from("player_characters")
      .upsert(getStarterCharacterRows(userId), { onConflict: "user_id,character_version_id", ignoreDuplicates: true });

    await client
      .from("player_character_shards")
      .upsert(getStarterShardRows(userId), { onConflict: "user_id,character_version_id", ignoreDuplicates: true });

    const existingDecks = await client
      .from("player_decks")
      .select("id")
      .eq("user_id", userId)
      .limit(1);

    if (existingDecks.data && existingDecks.data.length > 0) {
      return;
    }

    const insertedDeck = await client
      .from("player_decks")
      .insert({
        user_id: userId,
        name: "РЎС‚Р°СЂС‚РѕРІР°СЏ РєРѕР»РѕРґР°",
        character_1_id: "hinao",
        character_2_id: "shiba",
        character_3_id: "uruha",
        is_active: true
      })
      .select("id")
      .single();

    if (!insertedDeck.data) {
      return;
    }

    await client.from("player_deck_cards").insert(
      createStarterDeckCards().map((card) => ({
        deck_id: insertedDeck.data.id,
        card_id: card.cardId,
        quantity: card.quantity
      }))
    );
  }
};

