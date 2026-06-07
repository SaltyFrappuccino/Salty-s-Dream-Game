import type { GachaRollResponse } from "@sdg/shared";
import { getSupabaseAdminClient } from "../../db/supabaseAdmin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i.test(value);
}

export function persistGachaRoll(userId: string, bannerId: string, response: GachaRollResponse): void {
  const client = getSupabaseAdminClient();
  if (!client || !isUuid(userId)) {
    return;
  }

  void client.from("gacha_rolls").insert({
    user_id: userId,
    banner_id: bannerId,
    result: response.result
  });
}

